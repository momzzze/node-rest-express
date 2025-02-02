const bcrypt = require("bcryptjs");
const {
    User
} = require("../../models");
const logError = require("../../utils/logErrors");

const createUserByProvidedData = async (data) => {
    try {
        const newUser = await User.create(data);
        return {
            success: true,
            message: "User created successfully",
            data: newUser
        }
    } catch (error) {
        await logError(error);
        return {
            success: false,
            message: "Internal server error"
        }
    }
}

const editUserByProvidedData = async (data) => {
    try {
        const {
            id,
            username,
            email,
            password
        } = data;


        const user = await User.findByPk(id);
        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        const updatedFields = {};
        if (username) {
            updatedFields.username = username;
        }
        if (email) {
            updatedFields.email = email;
        }
        if (password) updatedFields.password = await bcrypt.hash(password, 10);

        await user.update(updatedFields);
        return {
            success: true,
            message: "User updated successfully",
            data: user
        }

    } catch (error) {
        await logError(error);
        return {
            success: false,
            message: "Internal server error"
        }
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }
        return {
            success: true,
            data: user
        }
    } catch (error) {
        await logError(error);
        return {
            success: false,
            message: "Internal server error"
        }
    }
}

module.exports = {
    createUserByProvidedData,
    editUserByProvidedData,
    getUserById,
};