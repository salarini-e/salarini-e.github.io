// Controller para APIs
const path = require('path');

// API para obter projetos
exports.getProjects = (req, res) => {
  // Aqui você pode conectar com um banco de dados no futuro
  const projects = [
    {
      id: 1,
      title: 'Monitor de Logs Apache',
      description: 'Aplicação web para monitoramento e visualização de logs do Apache em tempo real, com dashboard interativo e alertas automáticos.',
      technologies: ['Python', 'Flask', 'JavaScript', 'Chart.js'],
      github: 'https://github.com/salarini-e/apache-monitor',
      demo: '#',
      image: '/assets/img/work-alex-nowak.jpg'
    },
    {
      id: 2,
      title: 'Sistema de Gerenciamento',
      description: 'Sistema completo para gerenciamento de projetos e tarefas com interface moderna e responsiva.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Bootstrap'],
      github: 'https://github.com/salarini-e/project-manager',
      demo: '#',
      image: '/assets/img/work-metiew-smith.jpg'
    },
    {
      id: 3,
      title: 'E-commerce Platform',
      description: 'Plataforma de e-commerce com sistema de pagamentos, carrinho de compras e painel administrativo.',
      technologies: ['React', 'Next.js', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com/salarini-e/ecommerce-platform',
      demo: '#',
      image: '/assets/img/work-victory.jpg'
    }
  ];
  
  res.json(projects);
};

// API para obter posts do blog
exports.getBlogPosts = (req, res) => {
  // Aqui você pode conectar com um banco de dados no futuro
  const posts = [
    {
      id: 1,
      title: 'Introdução ao Node.js',
      excerpt: 'Aprenda os conceitos fundamentais do Node.js e como começar a desenvolver aplicações.',
      date: '2025-01-15',
      slug: 'introducao-nodejs',
      categories: ['Node.js', 'JavaScript', 'Backend'],
      image: '/images/blog/nodejs-intro.jpg'
    },
    {
      id: 2,
      title: 'Guia Completo de React',
      excerpt: 'Tudo que você precisa saber sobre React para criar aplicações modernas.',
      date: '2025-01-10',
      slug: 'guia-completo-react',
      categories: ['React', 'JavaScript', 'Frontend'],
      image: '/images/blog/react-guide.jpg'
    },
    {
      id: 3,
      title: 'Melhores Práticas em CSS',
      excerpt: 'Dicas essenciais para escrever CSS mais limpo e organizádo.',
      date: '2025-01-05',
      slug: 'melhores-praticas-css',
      categories: ['CSS', 'Frontend', 'Design'],
      image: '/images/blog/css-practices.jpg'
    },
    {
      id: 4,
      title: 'Introdução ao MongoDB',
      excerpt: 'Como usar MongoDB em seus projetos Node.js de forma eficiente.',
      date: '2025-01-01',
      slug: 'introducao-mongodb',
      categories: ['MongoDB', 'Database', 'Backend'],
      image: '/images/blog/mongodb-intro.jpg'
    }
  ];
  
  res.json(posts);
};

// API para obter post específico do blog
exports.getBlogPost = (req, res) => {
  const { slug } = req.params;
  
  // Aqui você buscaria o post específico no banco de dados
  const post = {
    id: 1,
    title: 'Introdução ao Node.js',
    content: 'Conteúdo completo do artigo aqui...',
    date: '2025-01-15',
    slug: 'introducao-nodejs',
    categories: ['Node.js', 'JavaScript', 'Backend'],
    image: '/images/blog/nodejs-intro.jpg'
  };
  
  if (post && post.slug === slug) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post não encontrado' });
  }
};

// API para contato (processar formulário)
exports.processContact = (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Validação básica
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Por favor, preencha todos os campos obrigatórios.'
    });
  }
  
  // Aqui você implementaria o envio do email ou salvamento no banco
  console.log('Mensagem de contato recebida:', { name, email, subject, message });
  
  // Simular processamento
  setTimeout(() => {
    res.json({
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
    });
  }, 1000);
};
