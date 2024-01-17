const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const createToken = (_id) => {
    const jwtKey = process.env.SECRET_KEY;
    return jwt.sign({ _id }, jwtKey, {
        expiresIn: 3 * 24 * 60 * 60
    })
}

const registerUser = async (req, res) => {
    // we will geting name email and the password from the user
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) {
        return res.status(400).json({ error: "User already exists" });
    }
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Please enter a valid email" });
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: "Password must be a strong password..." });
    }

    // if the user does not exist then we will create a new user
    try {
        user = new userModel({
            name,
            email,
            password
        });
        // password hashing
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        await user.save();
        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, name, email, token });

    } catch (error) {
        return res.status(400).json({ error: "Something went wrong" });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        const isValidPassword=await bcrypt.compare(password,user.password);        
        if(!isValidPassword){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, name:user.name, email, token });

    } catch (error) {
        return res.status(400).json({ error: "Something went wrong" })
    }

}

const findUser=async(req,res)=>{
    const userId=req.params.userId;
    try {
        const user=await userModel.findById(userId);
        if(!user){
            return res.status(400).json({error:"User not found"});
        }
        res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ error: "Something went wrong" })
    }
}


const getAllUsers=async(req,res)=>{
    const users=await userModel.find();
    try {
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong" })
    }
}


module.exports = {
    registerUser,
    loginUser,
    findUser,
    getAllUsers
}