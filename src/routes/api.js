// Rotas da API
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// API para projetos
router.get('/projects', apiController.getProjects);

// API para blog
router.get('/blog-posts', apiController.getBlogPosts);
router.get('/blog-posts/:slug', apiController.getBlogPost);

// API para contato
router.post('/contact', apiController.processContact);

module.exports = router;
