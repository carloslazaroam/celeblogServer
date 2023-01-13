const express = require('express');
const { getComentario, createComentario, updateComentario, deleteComentario, getPageComentario } = require('../controllers/ComentarioController');
const { getPage } = require('../controllers/UsuarioController');
const router = express.Router();
const entity = '/comentario';

router.get(`${entity}/all` , getPageComentario);
router.get(`${entity}/:id`,  getComentario);
router.post(`${entity}`, createComentario);
router.put(`${entity}`, updateComentario);
router.delete(`${entity}/:id`, deleteComentario);

module.exports = router;