const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { ForbiddenError } = require('../errors/indexErrors');

const auth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    return next(new ForbiddenError('Authorization required'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new ForbiddenError('Authorization required'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
