const prisma = require('../../db/prisma');
const {
  hashPassword,
  generateToken,
  comparePassword,
} = require('../../services/AuthService');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Bad request',
      error: 'Invalid credentials',
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: email }],
      },
    });
    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized',
        error: 'Invalid credentials',
      });
    }
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        message: 'Unauthorized',
        error: 'Invalid credentials',
      });
    }

    const token = generateToken(user);
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
const registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({
      message: 'Bad request',
      error: 'Invalid credentials',
    });
  }
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        message: 'Conflict',
        error: 'User already exists',
      });
    }
    const hashed = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashed,
        username,
      },
    });
    const token = generateToken(newUser);
    res.status(201).json({
      message: 'User created successfully',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
