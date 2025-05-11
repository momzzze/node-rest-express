const pg = require('pg');

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
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
  pool,
};
