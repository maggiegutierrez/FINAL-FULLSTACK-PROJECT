const router = require('express').Router();
const {
  validateCreateUser,
  validateLogin,
} = require('../middlewares/validator');
const { login, createUser, logout } = require('../controllers/users');

router.post('/login', validateLogin, login);
router.post('/register', validateCreateUser, createUser);
router.post('/logout', logout);

module.exports = router;
