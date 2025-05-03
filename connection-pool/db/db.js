const pg = require('pg');

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});
const connectToDB = async () => {
    try {
        await pool.query('SELECT 1');
        console.log('✅ Connected to Database!');
    } catch (err) {
        console.error('❌ Failed to connect to PostgreSQL:', err);
        process.exit(1);
    }
};

module.exports = {
    connectToDB,
    pool
}