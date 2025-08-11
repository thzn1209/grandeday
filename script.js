document.addEventListener('DOMContentLoaded', function() {
    // Criar bolhas dinâmicas
    function createBubbles() {
        const bubbleCount = 30;
        const body = document.body;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            
            // Tamanho aleatório entre 10px e 60px
            const size = Math.random() * 50 + 10;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // Posição horizontal aleatória
            bubble.style.left = `${Math.random() * 100}%`;
            
            // Duração da animação entre 10s e 20s
            const duration = Math.random() * 10 + 10;
            bubble.style.animationDuration = `${duration}s`;
            
            // Atraso inicial aleatório
            bubble.style.animationDelay = `${Math.random() * 5}s`;
            
            body.appendChild(bubble);
        }
    }

    createBubbles();

    // Contagem regressiva
    function atualizarContagemRegressiva() {
        const dataCasamento = new Date('October 18, 2025 18:30:00').getTime();
        const agora = new Date().getTime();
        const diferenca = dataCasamento - agora;

        if (diferenca < 0) {
            clearInterval(contagemInterval);
            document.getElementById('contagem-regressiva').innerHTML = '<h2>Hoje é o grande dia!</h2>';
            return;
        }

        // Cálculo dos meses
        const dataAtual = new Date();
        const dataFutura = new Date(dataCasamento);
        
        let meses = (dataFutura.getFullYear() - dataAtual.getFullYear()) * 12;
        meses += dataFutura.getMonth() - dataAtual.getMonth();
        
        if (dataFutura.getDate() < dataAtual.getDate()) {
            meses--;
        }
        
        const dataTemp = new Date(dataAtual);
        dataTemp.setMonth(dataAtual.getMonth() + meses);
        
        if (dataTemp > dataFutura) {
            meses--;
            dataTemp.setMonth(dataAtual.getMonth() + meses);
        }
        
        const diffDias = dataFutura - dataTemp;
        const dias = Math.floor(diffDias / (1000 * 60 * 60 * 24));
        
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        document.getElementById('meses').textContent = meses.toString().padStart(2, '0');
        document.getElementById('dias').textContent = dias.toString().padStart(2, '0');
        document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
        document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
    }

    const contagemInterval = setInterval(atualizarContagemRegressiva, 1000);
    atualizarContagemRegressiva();

    // Carrossel de fotos
    const carrosselContainer = document.querySelector('.carrossel-container');
    const carrosselItems = document.querySelectorAll('.carrossel-item');
    const prevBtn = document.querySelector('.carrossel-controle.prev');
    const nextBtn = document.querySelector('.carrossel-controle.next');
    let currentIndex = 0;
    
    function showSlide(index) {
        carrosselItems.forEach(item => item.classList.remove('active'));
        carrosselItems[index].classList.add('active');
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carrosselItems.length;
        showSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + carrosselItems.length) % carrosselItems.length;
        showSlide(currentIndex);
    }
    
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    
    let carrosselInterval = setInterval(nextSlide, 5000);
    
    const carrossel = document.querySelector('.carrossel');
    if (carrossel) {
        carrossel.addEventListener('mouseenter', () => {
            clearInterval(carrosselInterval);
        });
        
        carrossel.addEventListener('mouseleave', () => {
            carrosselInterval = setInterval(nextSlide, 5000);
        });
    }

    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Menu ativo conforme rolagem
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.secao').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Animação de elementos ao rolar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.secao, .historia-item, .info-item').forEach(element => {
        observer.observe(element);
    });

    // Efeito de digitação no banner
    const frase = document.querySelector('.frase');
    if (frase) {
        const textoOriginal = frase.textContent;
        frase.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < textoOriginal.length) {
                frase.textContent += textoOriginal.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 50);
    }

    // Criar mais ícones dinamicamente
    function createWeddingIcons() {
        const weddingElements = document.querySelector('.wedding-elements');
        const icons = [
            'fas fa-church', 'fas fa-heart', 'fas fa-male', 'fas fa-female',
            'fas fa-ring', 'fas fa-glass-cheers', 'fas fa-camera', 'fas fa-music',
            'fas fa-calendar-alt', 'fas fa-bell', 'fas fa-star', 'fas fa-gem'
        ];
        
        for (let i = 0; i < 20; i++) {
            const icon = document.createElement('div');
            icon.className = `wedding-icon ${icons[i % icons.length].split(' ')[1]}`;
            
            // Posições aleatórias
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = 15 + Math.random() * 15;
            
            icon.style.left = `${left}%`;
            icon.style.top = `${top}%`;
            icon.style.animationDelay = `${delay}s`;
            icon.style.animationDuration = `${duration}s`;
            
            const iconElement = document.createElement('i');
            iconElement.className = icons[i % icons.length];
            icon.appendChild(iconElement);
            
            weddingElements.appendChild(icon);
        }
    }

    createWeddingIcons();

    // Efeito de gradiente animado
    function animateGradient() {
        const elements = document.querySelectorAll('[style*="gradient"]');
        elements.forEach(el => {
            const angle = Math.floor(Math.random() * 360);
            el.style.background = `linear-gradient(${angle}deg, var(--fuchsia), var(--tiffany))`;
        });
    }

    // Animar a cada 5 segundos
    setInterval(animateGradient, 5000);
});
