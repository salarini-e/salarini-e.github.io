// Configuração da aplicação Express
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

// Middleware de sessão (opcional, para autenticação)
// const session = require('express-session');

// Importar rotas
const routes = require('../routes');
const pageController = require('../controllers/pageController');

const createApp = () => {
  const app = express();

  // Middlewares de segurança e performance
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"]
      }
    }
  }));
  app.use(compression());
  app.use(cors());

  // Middleware de sessão (descomente se precisar de autenticação)
  /*
  app.use(session({
    secret: process.env.SESSION_SECRET || 'seu-secret-aqui',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // true em produção com HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
  }));
  */

  // Configurar EJS como template engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));

  // Servir arquivos estáticos
  app.use(express.static(path.join(__dirname, '../../public')));
  app.use('/assets', express.static(path.join(__dirname, '../../assets')));
  app.use('/novo', express.static(path.join(__dirname, '../../novo')));

  // Middleware para parsing de dados
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Usar rotas
  app.use('/', routes);

  // Middleware para tratamento de erros 404
  app.use(pageController.notFound);

  // Middleware para tratamento de erros gerais
  app.use(pageController.serverError);

  return app;
};

module.exports = createApp;
