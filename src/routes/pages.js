// Rotas principais do site
const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// Rota para página inicial
router.get('/', pageController.home);

// Rota para portfólio
router.get('/portfolio', pageController.portfolio);

// Rota para contato
router.get('/contato', pageController.contato);

// Rota para quem sou eu
router.get('/quem-sou-eu', pageController.quemSouEu);

// Rota para blog
router.get('/blog', pageController.blog);

// Rota para política de privacidade
router.get('/politica-de-privacidade', pageController.politicaPrivacidade);

// Rotas de autenticação
router.get('/login', pageController.login);
router.post('/login', pageController.processLogin);
router.post('/logout', pageController.logout);

module.exports = router;
