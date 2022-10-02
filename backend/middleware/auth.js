const jwt = require('jsonwebtoken');

exports.authenticatedUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({
      succes: false,
      message: 'Unauthorized',
    });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, 'KaianNUywgNu26735@!');
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      succes: false,
      message: 'Unauthorized',
    });
  }
  // next();
};
