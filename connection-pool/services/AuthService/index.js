const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (plain) => bcrypt.hash(plain, 12);
const comparePassword = async (plain, hash) => bcrypt.compare(plain, hash);

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};
