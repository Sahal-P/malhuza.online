
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env; // Replace with your secret key from .env

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    req.user = decoded;
    next(); // Move on to the next middleware or route handler
  });
};

module.exports = authMiddleware;
