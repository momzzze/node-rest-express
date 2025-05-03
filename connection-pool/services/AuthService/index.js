const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (plain) => bcrypt.hash(plain, 12);
const comparePassword = async (plain, hash) => bcrypt.compare(plain, hash);

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

const findUserByEmailOrUsername = async (identifier) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });
  return user;
};

const userExists = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

const createUser = async ({ email, username, password }) => {
  const hashed = await bcrypt.hash(password, 12);
  return await prisma.user.create({
    data: {
      email,
      username,
      password: hashed,
    },
  });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  findUserByEmailOrUsername,
  userExists,
  createUser,
};
