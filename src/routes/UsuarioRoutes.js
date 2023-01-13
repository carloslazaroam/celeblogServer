const express = require('express');
const router = express.Router();
const { createUser, getUser, updateUser, deleteUser, getPage, generateUser } = require('../controllers/UsuarioController');
const { verifyToken } = require('../jwt/JWTUtils');
const entity = '/usuario';
const {upload} = require('../controllers/uploadController')


router.get(`${entity}/all` , getPage);
router.post(`${entity}`,upload, createUser);
router.get(`${entity}/:id`,verifyToken, getUser);
router.delete(`${entity}/:id`, deleteUser);
router.put(`${entity}`, updateUser);
router.post(`${entity}/generate/1`, generateUser)

module.exports = router;