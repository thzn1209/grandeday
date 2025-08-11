document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // CONTROLE DO BANNER FIXO
    // =============================================
    const fixedBanner = document.querySelector('.fixed-banner');
    const mainBanner = document.querySelector('.main-banner');
    
    function handleScroll() {
        // Mostrar banner fixo quando o usuário rolar para baixo do banner principal
        if (window.scrollY > mainBanner.offsetHeight - 100) {
            fixedBanner.classList.add('visible');
        } else {
            fixedBanner.classList.remove('visible');
        }
    }
    
    // =============================================
    // NAVEGAÇÃO SUAVE E MENU ATIVO
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Ajuste para altura do banner fixo
                    behavior: 'smooth'
                });
                
                // Adiciona classe ativa ao menu
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    // =============================================
// CONFIGURAÇÃO DOS CONVIDADOS E ACOMPANHANTES
// =============================================
const listaConvidados = {
    "Ana Silva": ["João Silva (marido)", "Pedro Silva (filho)", "Luiza Silva (filha)"],
    "Carlos Oliveira": ["Marta Oliveira (esposa)"],
    "Mariana Santos": ["Ricardo Santos (marido)", "Clara Santos (filha)"],
    // Adicione todos os convidados e seus acompanhantes aqui
};

// =============================================
// GERAR LISTA DE ACOMPANHANTES DINAMICAMENTE
// =============================================
document.getElementById('convidado-principal').addEventListener('change', function() {
    const convidadoSelecionado = this.value;
    const agregadosContainer = document.getElementById('agregados-container');
    const listaAgregados = document.getElementById('lista-agregados');
    
    if (convidadoSelecionado && listaConvidados[convidadoSelecionado]) {
        // Limpa a lista anterior
        listaAgregados.innerHTML = '';
        
        // Adiciona os novos checkboxes
        listaConvidados[convidadoSelecionado].forEach(agregado => {
            const divCheckbox = document.createElement('div');
            divCheckbox.className = 'checkbox-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = agregado.replace(/\s+/g, '-').toLowerCase();
            checkbox.name = 'agregados';
            checkbox.value = agregado;
            
            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = agregado;
            
            divCheckbox.appendChild(checkbox);
            divCheckbox.appendChild(label);
            listaAgregados.appendChild(divCheckbox);
        });
        
        agregadosContainer.style.display = 'block';
    } else {
        agregadosContainer.style.display = 'none';
    }
});

    // =============================================
    // CARROSSEL DE FOTOS
    // =============================================
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
    
    // Event listeners para os botões
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Auto-play (opcional)
    let carrosselInterval = setInterval(nextSlide, 5000);
    
    // Pausar auto-play quando o mouse estiver sobre o carrossel
    const carrossel = document.querySelector('.carrossel');
    if (carrossel) {
        carrossel.addEventListener('mouseenter', () => {
            clearInterval(carrosselInterval);
        });
        
        carrossel.addEventListener('mouseleave', () => {
            carrosselInterval = setInterval(nextSlide, 5000);
        });
    }
 // =============================================
// MODAL DE PAGAMENTO (VERSÃO CORRIGIDA)
// =============================================
const modal = document.getElementById('modal-pagamento');
const btnPresentear = document.querySelectorAll('.btn-presentear');
const closeModal = document.querySelector('.close-modal');
const copiarChave = document.getElementById('copiar-chave');
const linkPagamento = document.getElementById('link-pagamento');

// Abrir modal ao clicar em "Presentear"
btnPresentear.forEach(btn => {
    btn.addEventListener('click', function() {
        const presente = this.getAttribute('data-presente');
        const valor = this.getAttribute('data-valor');
        const link = this.getAttribute('data-link');
        
        // Atualizar modal
        document.getElementById('modal-titulo').textContent = `Presentear com ${presente} - R$ ${valor}`;
        
        // Configurar link de pagamento
        linkPagamento.href = link;
        linkPagamento.onclick = function(e) {
            e.preventDefault(); // Previne o comportamento padrão
            window.open(link, '_blank'); // Abre em nova aba
            modal.style.display = 'none'; // Fecha o modal
            document.body.style.overflow = 'auto'; // Restaura scroll
        };
        
        // Mostrar modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Fechar modal
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fechar modal ao clicar fora
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Copiar chave PIX
copiarChave.addEventListener('click', function() {
    const chavePix = 'yasmin.thiago@casamento.com';
    navigator.clipboard.writeText(chavePix).then(() => {
        this.textContent = 'Copiado!';
        setTimeout(() => {
            this.textContent = 'Copiar Chave';
        }, 2000);
    });
});
    
    // =============================================
    // ANIMAÇÃO DE ELEMENTOS AO ROLAR
    // =============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.secao').forEach(section => {
        observer.observe(section);
    });
    
    // =============================================
    // MENU ATIVO CONFORME ROLAGEM
    // =============================================
    window.addEventListener('scroll', function() {
        // Controle do banner fixo
        handleScroll();
        
        // Controle do menu ativo
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.secao').forEach(section => {
            const sectionTop = section.offsetTop - 160; // Ajuste para banner fixo
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
    
    // =============================================
    // RESPONSIVIDADE - TROCA DE IMAGEM DE FUNDO
    // =============================================
    function handleResponsiveImages() {
        const banner = document.querySelector('.main-banner');
        if (banner) {
            if (window.innerWidth <= 768) {
                banner.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('img/fotobuffet-mobile.jpg')";
            } else {
                banner.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('img/fotobuffet-desktop.jpg')";
            }
        }
    }
    
    window.addEventListener('resize', handleResponsiveImages);
    handleResponsiveImages(); // Executar ao carregar
});

  
// =============================================
// CONTAGEM REGRESSIVA COM MESES
// =============================================
function atualizarContagemRegressiva() {
    const dataCasamento = new Date('October 18, 2025 18:30:00').getTime();
    const agora = new Date().getTime();
    const diferenca = dataCasamento - agora;

    // Se a contagem regressiva terminar
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
    
    // Ajuste se o dia do mês ainda não chegou
    if (dataFutura.getDate() < dataAtual.getDate()) {
        meses--;
    }
    
    // Para calcular os dias restantes, criamos uma data temporária
    const dataTemp = new Date(dataAtual);
    dataTemp.setMonth(dataAtual.getMonth() + meses);
    
    // Se ultrapassamos a data do casamento, ajustamos
    if (dataTemp > dataFutura) {
        meses--;
        dataTemp.setMonth(dataAtual.getMonth() + meses);
    }
    
    // Calculamos os dias restantes após os meses completos
    const diffDias = dataFutura - dataTemp;
    const dias = Math.floor(diffDias / (1000 * 60 * 60 * 24));
    
    // Horas, minutos e segundos permanecem os mesmos
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Exibir os resultados
    document.getElementById('meses').textContent = meses.toString().padStart(2, '0');
    document.getElementById('dias').textContent = dias.toString().padStart(2, '0');
    document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
    document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
    document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
}

// Atualizar a contagem regressiva a cada segundo
const contagemInterval = setInterval(atualizarContagemRegressiva, 1000);

// Executar imediatamente para evitar atraso inicial
atualizarContagemRegressiva();

function doPost(e) {
    try {
      // ... código existente ...
    } catch (error) {
      return ContentService.createTextOutput(
        JSON.stringify({status: "error", message: error.message})
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }