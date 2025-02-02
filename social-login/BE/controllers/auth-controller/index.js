const logError = require("../../utils/logErrors");
const authService = require("../../services/auth-service");

const loginUser = async (req, res) => {
    try {
        const {
            identifier,
            password
        } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: "Email/Username and password are required"
            });
        }

        const result = await authService.loginUser(identifier, password);
        res.status(result.success ? 200 : 401).json(result);
    } catch (error) {
        await logError(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const {
            refreshToken
        } = req.body;
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh token is required"
            });
        }

        const result = await authService.refreshAccessToken(refreshToken);
        res.status(result.success ? 200 : 403).json(result);
    } catch (error) {
        await logError(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    loginUser,
    refreshToken,
};