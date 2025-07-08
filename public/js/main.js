// Arquivo JavaScript principal
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuração do preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Esconder preloader após carregamento
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('fade-out');
                
                // Ativar animações dos conteúdos após o preloader começar a sumir
                setTimeout(() => {
                    // Função para ativar animação de um elemento
                    function activateAnimation(selector) {
                        const element = document.querySelector(selector);
                        if (element) {
                            element.classList.remove('custom-hidden');
                            element.classList.add('custom-visible');
                        }
                    }
                    
                    // Ativar animação do main
                    activateAnimation('main');
                    
                    setTimeout(() => {
                        activateAnimation('.col-lg-4');
                    }, 100);
                    
                    setTimeout(() => {
                        activateAnimation('.col-lg-8');
                    }, 200);
                    
                }, 100);
                
                // Remove o preloader do DOM após a animação
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1500); // Mostra por 1.5 segundos
        });
    }

    // Partículas do preloader
    const preloaderCanvas = document.getElementById('preloader-canvas');
    if (preloaderCanvas) {
        const ctx = preloaderCanvas.getContext('2d');
        let particlesArray = [];
        
        // Configurar canvas
        function resizePreloaderCanvas() {
            preloaderCanvas.width = 200;
            preloaderCanvas.height = 100;
        }
        
        // Classe das partículas
        class PreloaderParticle {
            constructor() {
                this.x = Math.random() * preloaderCanvas.width;
                this.y = Math.random() * preloaderCanvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
                this.color = `hsl(${45 + Math.random() * 15}, 100%, ${70 + Math.random() * 20}%)`;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Rebater nas bordas
                if (this.x <= 0 || this.x >= preloaderCanvas.width) {
                    this.speedX *= -1;
                }
                if (this.y <= 0 || this.y >= preloaderCanvas.height) {
                    this.speedY *= -1;
                }
                
                // Manter dentro dos limites
                this.x = Math.max(0, Math.min(preloaderCanvas.width, this.x));
                this.y = Math.max(0, Math.min(preloaderCanvas.height, this.y));
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                
                // Adicionar brilho
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
        
        // Inicializar partículas
        function initPreloaderParticles() {
            particlesArray = [];
            for (let i = 0; i < 15; i++) {
                particlesArray.push(new PreloaderParticle());
            }
        }
        
        // Conectar partículas próximas
        function connectPreloaderParticles() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a + 1; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 80) {
                        const opacity = 1 - (distance / 80);
                        ctx.strokeStyle = `rgba(252, 212, 87, ${opacity * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Animar partículas
        function animatePreloaderParticles() {
            if (!document.getElementById('preloader')) return; // Para quando o preloader for removido
            
            ctx.clearRect(0, 0, preloaderCanvas.width, preloaderCanvas.height);
            
            for (let particle of particlesArray) {
                particle.update();
                particle.draw();
            }
            
            connectPreloaderParticles();
            requestAnimationFrame(animatePreloaderParticles);
        }
        
        // Inicializar
        resizePreloaderCanvas();
        initPreloaderParticles();
        animatePreloaderParticles();
    }

    // Controle do menu modal
    const openBtn = document.getElementById('openMenuModal');
    const closeBtn = document.getElementById('closeMenuModal');
    const modal = document.getElementById('menuModal');

    if (openBtn && closeBtn && modal) {
        function activateMenuPill() {
            openBtn.classList.add('active');
        }
        
        function deactivateMenuPill() {
            openBtn.classList.remove('active');
        }

        function openModal(e) {
            e.preventDefault();
            e.stopPropagation();
            modal.classList.add('show');
            activateMenuPill();
            
            const content = modal.querySelector('.custom-modal-content');
            if (content) {
                content.style.transform = 'translateY(-60vh) scale(0.95)';
                content.style.opacity = '0';
                setTimeout(() => {
                    content.style.transform = 'translateY(0) scale(1)';
                    content.style.opacity = '1';
                }, 10);
            }
        }

        function closeModal() {
            modal.classList.remove('show');
            deactivateMenuPill();
        }

        // Event listeners
        openBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        
        // Fechar modal clicando fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Fechar modal com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape") {
                closeModal();
            }
        });
    }

    // Partículas de fundo
    const canvas = document.getElementById("canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let mouse = {
            x: undefined,
            y: undefined,
            radius: (window.innerHeight/110) * (window.innerWidth/110)
        };
        let particlesArray = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            mouse.radius = (canvas.height/110) * (canvas.width/110);
        }
        
        function init(){
            particlesArray = [];
            let nParticles = 35; // <-- Reduzido de 60 para 35 partículas
            for(let i=0; i < nParticles; i++){
                let size = (Math.random()*5) + 1;
                let x = (Math.random() * ((window.innerWidth - size * 2 )-(size * 2)) + size * 2);
                let y = (Math.random() * ((window.innerHeight - size * 2 )-(size * 2)) + size * 2);

                // Velocidade das partículas: mais suave e controlada
                let directionX = (Math.random()*1.8)-0.75 // Velocidade reduzida: -0.4 a 0.4
                let directionY = (Math.random()*1.8)-0.75; // Velocidade reduzida: -0.4 a 0.4
                let color = '#fcd457';

                particlesArray.push(new Particle(x,y,directionX,directionY,size,color));
            }
        }
        
        class Particle{
            constructor(x, y, directionX, directionY, size, color){
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            draw(){
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = '#fcd457';
                ctx.fill();
            }
            update(){
                if(this.x > canvas.width || this.x < 0){
                    this.directionX = -this.directionX;
                }
                if(this.y > canvas.height || this.y < 0){
                    this.directionY = -this.directionY;
                }
                
                // Campo de força do sistema de órbitas
                const orbitCenter = {
                    x: canvas.width * 0.75, // Posição aproximada da foto no layout
                    y: canvas.height * 0.5
                };
                const forceRadius = 280; // Raio do campo de força aumentado
                
                let dx = orbitCenter.x - this.x;
                let dy = orbitCenter.y - this.y;
                let distanceToOrbit = Math.sqrt(dx*dx + dy*dy);
                
                // Se a partícula está muito perto do sistema de órbitas
                if(distanceToOrbit < forceRadius) {
                    let forceStrength = (forceRadius - distanceToOrbit) / forceRadius;
                    let pushX = (this.x - orbitCenter.x) / distanceToOrbit * forceStrength * 3; // Intensidade reduzida para mais suavidade
                    let pushY = (this.y - orbitCenter.y) / distanceToOrbit * forceStrength * 3; // Intensidade reduzida para mais suavidade
                    
                    this.x += pushX;
                    this.y += pushY;
                    
                    // Adiciona um leve efeito de "vibração" quando é repelida (mais suave)
                    this.directionX += (Math.random() - 0.5) * 0.3 * forceStrength; // Vibração mais suave
                    this.directionY += (Math.random() - 0.5) * 0.3 * forceStrength; // Vibração mais suave
                }
                
                // Interação com mouse (original)
                let dxMouse = mouse.x - this.x;
                let dyMouse = mouse.y - this.y;
                let distanceToMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
                if(distanceToMouse < mouse.radius + this.size){
                    if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                        this.x += 10;
                    }
                    if(mouse.x > this.x && this.x > this.size * 10){
                        this.x -= 10;
                    }
                    if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                        this.y += 10;
                    }
                    if(mouse.y > this.y && this.y > this.size * 10){
                        this.y -= 10;
                    }
                }
                
                // Controle de velocidade máxima para movimento mais suave
                const maxSpeed = 0.6; // Velocidade máxima permitida
                const currentSpeed = Math.sqrt(this.directionX * this.directionX + this.directionY * this.directionY);
                if (currentSpeed > maxSpeed) {
                    this.directionX = (this.directionX / currentSpeed) * maxSpeed;
                    this.directionY = (this.directionY / currentSpeed) * maxSpeed;
                }
                
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }
        
        function animate(){
            requestAnimationFrame(animate);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            for(let i=0; i<particlesArray.length; i++){
                particlesArray[i].update();
            }
            connect();
        }
        
        function connect(){
            let opacityValue = 1;
            for(let a=0; a<particlesArray.length; a++){
                for(let b = a; b<particlesArray.length;b++){
                    let distance = ((particlesArray[a].x - particlesArray[b].x)* (particlesArray[a].x-particlesArray[b].x))+((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y-particlesArray[b].y));
                    if(distance < (canvas.width/7) * (canvas.height/7)){
                        opacityValue = 1 - (distance/30000);
                        ctx.strokeStyle='rgba(252,212,87,' + opacityValue + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        window.addEventListener('resize',function(){
            resizeCanvas();
            init();
        });
        window.addEventListener('mousemove', function(event){
            mouse.x = event.x;
            mouse.y = event.y;
        });
        window.addEventListener('mouseout', function(){
            mouse.x = undefined;
            mouse.y = undefined;
        });
        
        // Inicialização correta do canvas e partículas
        resizeCanvas();
        init();
        animate();
    }

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Função para carregar projetos dinamicamente
    function loadProjects() {
        fetch('/api/projects')
            .then(response => response.json())
            .then(projects => {
                const projectsGrid = document.getElementById('projects-grid');
                if (projectsGrid && projects.length > 0) {
                    projectsGrid.innerHTML = '';
                    projects.forEach(project => {
                        const projectCard = createProjectCard(project);
                        projectsGrid.appendChild(projectCard);
                    });
                }
            })
            .catch(error => {
                console.log('Erro ao carregar projetos:', error);
            });
    }

    // Função para criar card de projeto
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 mb-4';
        card.innerHTML = `
            <div class="project-card animate-on-scroll">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" class="img-fluid">
                </div>
                <div class="project-content">
                    <h5 class="project-title">${project.title}</h5>
                    <p class="project-description">${project.description}</p>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-actions">
                        <a href="${project.github}" class="btn btn-outline-primary btn-sm" target="_blank">
                            <i class="fab fa-github me-1"></i>GitHub
                        </a>
                        <a href="${project.demo}" class="btn btn-primary btn-sm">
                            <i class="fas fa-external-link-alt me-1"></i>Demo
                        </a>
                    </div>
                </div>
            </div>
        `;
        return card;
    }

    // Carregar projetos se estiver na página de portfolio
    if (document.getElementById('projects-grid')) {
        loadProjects();
    }

    // Gerenciar estado compacto do botão flutuante
    const floatingMenuPill = document.getElementById('openMenuModal');
    if (floatingMenuPill) {
        // Iniciar em estado compacto em dispositivos móveis
        if (window.innerWidth <= 768) {
            floatingMenuPill.classList.add('compact');
        }
        
        // Expandir ao hover
        floatingMenuPill.addEventListener('mouseenter', function() {
            this.classList.remove('compact');
        });
        
        // Voltar ao compacto após um tempo sem hover
        let compactTimer;
        floatingMenuPill.addEventListener('mouseleave', function() {
            if (window.innerWidth <= 768) {
                compactTimer = setTimeout(() => {
                    this.classList.add('compact');
                }, 2000); // Volta ao compacto após 2 segundos
            }
        });
        
        // Limpar timer se voltar ao hover
        floatingMenuPill.addEventListener('mouseenter', function() {
            if (compactTimer) {
                clearTimeout(compactTimer);
            }
        });
        
        // Ajustar ao redimensionar a janela
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                floatingMenuPill.classList.add('compact');
            } else {
                floatingMenuPill.classList.remove('compact');
            }
        });
    }

    // Observador de interseção para ativar animações quando os elementos aparecem na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Remove a classe hidden
                element.classList.remove('custom-hidden');
                element.classList.add('custom-visible');
                
                // Para de observar o elemento após a animação
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observar todos os elementos animados após o preloader
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.custom-animated');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }, 2000); // Aguarda o preloader terminar

    // Fallback: Se após 5 segundos ainda houver elementos ocultos, mostrá-los
    setTimeout(() => {
        const hiddenElements = document.querySelectorAll('.custom-hidden');
        hiddenElements.forEach(element => {
            element.classList.remove('custom-hidden');
            element.classList.add('custom-visible');
        });
    }, 5000);

});

// Função para alternar tema (futuro)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    // Salvar preferência no localStorage
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Carregar tema salvo
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Inicializar tema
loadTheme();
