const express = require('express');
const router = express.Router();
const { getPost, createPost, updatePost, deletePost, getPage } = require('../controllers/PostController')
const entity = '/post';
const {upload} = require('../controllers/uploadController')

router.get(`${entity}/all` , getPage);
router.get(`${entity}/:id`, getPost);
router.post(`${entity}`,upload, createPost);
router.put(`${entity}`, updatePost);
router.delete(`${entity}/:id`, deletePost);

module.exports = router;
