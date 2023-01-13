const express = require('express');
const router = express.Router();
const entity = '/tipousuario';
const { verifyToken } = require('../jwt/JWTUtils');
const { getTipoUsuarios } = require('../controllers/TipoUsuarioController');

router.get(`${entity}/all`,verifyToken , getTipoUsuarios);

module.exports = router;