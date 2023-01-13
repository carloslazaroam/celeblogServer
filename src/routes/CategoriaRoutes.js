const express = require('express');
const router = express.Router();
const { getCategoria, createCategoria, updateCategoria, deleteCategoria, getPageCategoria } = require('../controllers/CategoriaController')
const entity = '/categoria';

router.get(`${entity}/all` , getPageCategoria);
router.get(`${entity}/:id`,  getCategoria);
router.post(`${entity}`, createCategoria);
router.put(`${entity}`, updateCategoria);
router.delete(`${entity}/:id`, deleteCategoria);

module.exports = router;
