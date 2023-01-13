const express = require('express');
const router = express.Router();
const { getPost, createPost, updatePost, deletePost, getPage } = require('../controllers/PostController')
const entity = '/post';

router.get(`${entity}/all` , getPage);
router.get(`${entity}/:id`, getPost);
router.post(`${entity}`, createPost);
router.put(`${entity}`, updatePost);
router.delete(`${entity}/:id`, deletePost);

module.exports = router;
