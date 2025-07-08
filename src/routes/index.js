// Arquivo principal de rotas
const express = require('express');
const router = express.Router();

// Importar rotas
const pageRoutes = require('./pages');
const apiRoutes = require('./api');

// Usar rotas
router.use('/', pageRoutes);
router.use('/api', apiRoutes);

module.exports = router;
