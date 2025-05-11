const {
  hashPassword,
  generateToken,
  comparePassword,
  findUserByEmailOrUsername,
  userExists,
  createUser,
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
    const user = await findUserByEmailOrUsername(email);
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({
        message: 'Unauthorized',
        error: 'Invalid credentials',
      });
    }
    const token = generateToken(user);
    res.status(200).json({ message: 'Login successful', token });
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
    const exists = await userExists(email);
    if (exists) {
      return res
        .status(409)
        .json({ message: 'Conflict', error: 'User already exists' });
    }
    const user = await createUser({ email, password, username });
    const token = generateToken(user);
    res.status(201).json({ message: 'User created successfully', token });
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
