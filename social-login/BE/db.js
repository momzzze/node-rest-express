const {
    sequelize
} = require("./models");

sequelize.authenticate()
    .then(() => console.log("✅ Database connected successfully"))
    .catch((err) => console.error("❌ Database connection error:", err));

module.exports = sequelize;