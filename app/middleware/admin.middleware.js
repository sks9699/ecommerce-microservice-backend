const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const adminAuthMiddleware = async(req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
    if (!user) throw new Error('User not found');
    // Hardcoded admin check
    if (decoded.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Only admin allowed.' });
    }

    // Attach user info to request
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};

module.exports = adminAuthMiddleware;
