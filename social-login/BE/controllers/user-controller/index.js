const bcrypt = require("bcryptjs");
const logError = require("../../utils/logErrors");
const userService = require("../../services/user-service");

const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            confirmPassword,
        } = req.body;

        if (!username || !email || !password, !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userService.createUserByProvidedData({
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json(result);
    } catch (error) {
        await logError(error);
        res.status(500).json(result);
    }
};

const editUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;
        const {
            id
        } = req.params;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "At least one field must be provided for update",
            });
        }

        const result = await userService.editUserByProvidedData({
            id,
            username,
            email,
            password,
        })
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        await logError(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

const getUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        const result = await userService.getUserById(req.params.id);
        if (!result.success) {
            return res.status(404).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        await logError(error);
        res.status(500).json(result);

    }
};

module.exports = {
    createUser,
    editUser,
    getUser,
};