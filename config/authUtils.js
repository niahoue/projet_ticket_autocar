const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'JWT_SECRET';

const generateToken = (userData) => {
  return jwt.sign(userData, SECRET_KEY);
};

const decodeToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  generateToken,
  decodeToken,
  hashPassword,
  comparePasswords
};