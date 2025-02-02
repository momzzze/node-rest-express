const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logError = require("../../utils/logErrors");
const {
    User
} = require("../../models");
const {
    Op
} = require("sequelize");

// Generate JWT Tokens (Access & Refresh)
const generateTokens = (user) => {
    const accessToken = jwt.sign({
            id: user.id,
            email: user.email,
            username: user.username
        },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRY || "30m"
        }
    );

    const refreshToken = jwt.sign({
            id: user.id
        },
        process.env.JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d"
        }
    );

    return {
        accessToken,
        refreshToken
    };
};

// Login User
const loginUser = async (identifier, password) => {
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{
                    email: identifier
                }, {
                    username: identifier
                }]
            }
        });

        if (!user) {
            return {
                success: false,
                message: "Invalid email/username or password"
            };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                success: false,
                message: "Invalid email/username or password"
            };
        }

        // Generate tokens
        const tokens = generateTokens(user);

        return {
            success: true,
            message: "Login successful",
            ...tokens,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
        };
    } catch (error) {
        await logError(error);
        return {
            success: false,
            message: "Internal server error"
        };
    }
};

// Refresh Token
const refreshAccessToken = async (refreshToken) => {
    try {
        if (!refreshToken) {
            return {
                success: false,
                message: "Refresh token required"
            };
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return {
                success: false,
                message: "Invalid refresh token"
            };
        }

        const newAccessToken = jwt.sign({
                id: user.id,
                email: user.email,
                username: user.username
            },
            process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_ACCESS_EXPIRY || "30m"
            }
        );

        // Generate a new refresh token
        const newRefreshToken = jwt.sign({
                id: user.id
            },
            process.env.JWT_REFRESH_SECRET, {
                expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d"
            }
        );

        return {
            success: true,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    } catch (error) {
        await logError(error);
        return {
            success: false,
            message: "Invalid or expired refresh token"
        };
    }
};

module.exports = {
    loginUser,
    refreshAccessToken,
};