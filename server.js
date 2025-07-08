const express = require('express');
const path = require('path');
require('dotenv').config();

// Importar configuração da aplicação
const createApp = require('./src/app/app');

const app = createApp();
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
  console.log(`🌟 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
