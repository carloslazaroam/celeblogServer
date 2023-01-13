const express = require('express');
const { getTipoCategorias } = require('../controllers/TipoCategoriaController');
const router = express.Router();
const entity = '/tipocategoria';

router.get(`${entity}/all` , getTipoCategorias);

module.exports = router;