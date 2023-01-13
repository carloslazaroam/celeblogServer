const express = require('express');
const router = express.Router();
const { verifyToken } = require('../jwt/JWTUtils');
const { login, checkToken, forgotPassword, resetPassword } = require('../controllers/AuthController')

const auth = '/auth';

router.post(`${auth}/login`, login);
router.post(`${auth}/forgot-password`, forgotPassword);
router.post(`${auth}/reset-password`, verifyToken, resetPassword);
router.get(`${auth}/checktoken`, verifyToken, checkToken);

module.exports = router