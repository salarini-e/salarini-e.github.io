// Controllers principais do site
const path = require('path');

// Controller para página inicial
exports.home = (req, res) => {
  res.render('index', {
    title: 'Salarini-e - Home',
    page: 'home'
  });
};

// Controller para portfólio
exports.portfolio = (req, res) => {
  res.render('portfolio', {
    title: 'Salarini-e - Projetos',
    page: 'portfolio'
  });
};

// Controller para contato
exports.contato = (req, res) => {
  res.render('contato', {
    title: 'Salarini-e - Contato',
    page: 'contato'
  });
};

// Controller para quem sou eu
exports.quemSouEu = (req, res) => {
  res.render('quem-sou-eu', {
    title: 'Salarini-e - Quem sou eu',
    page: 'about'
  });
};

// Controller para blog
exports.blog = (req, res) => {
  res.render('blog', {
    title: 'Salarini-e - Blog',
    page: 'blog'
  });
};

// Controller para política de privacidade
exports.politicaPrivacidade = (req, res) => {
  res.render('politica-de-privacidade', {
    title: 'Política de Privacidade - Salarini-e',
    page: 'privacy'
  });
};

// Controller para login
exports.login = (req, res) => {
  res.render('login', {
    title: 'Login - Salarini-e',
    page: 'login'
  });
};

// Controller para processar login
exports.processLogin = (req, res) => {
  const { email, password, rememberMe } = req.body;
  
  // Aqui você implementaria a lógica de autenticação
  // Por exemplo: verificar no banco de dados, validar credenciais, etc.
  
  // Exemplo básico (substitua pela lógica real)
  if (email === 'admin@salarini.dev' && password === 'sua_senha_segura') {
    // Login bem-sucedido
    req.session.user = { email: email };
    res.json({ success: true, message: 'Login realizado com sucesso!' });
  } else {
    // Login falhou
    res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
  }
};

// Controller para logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro ao fazer logout.' });
    }
    res.json({ success: true, message: 'Logout realizado com sucesso!' });
  });
};

// Controller para página 404
exports.notFound = (req, res) => {
  res.status(404).render('404', {
    title: 'Página não encontrada - Salarini-e',
    page: '404'
  });
};

// Controller para erro 500
exports.serverError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', {
    title: 'Erro interno - Salarini-e',
    page: 'error'
  });
};
