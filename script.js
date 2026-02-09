/* ========================================
   JAVASCRIPT - INTERATIVIDADE DO SITE
   ======================================== */

// ========================================
// MENU MOBILE (HAMBURGER)
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========================================
// TIMELINE - ABRIR/FECHAR DETALHES
// ========================================

function toggleStage(button) {
    const details = button.closest('.timeline-header').nextElementSibling;
    
    if (details && details.classList.contains('stage-details')) {
        details.classList.toggle('active');
        
        // Animar o ícone do botão
        const icon = button.querySelector('i');
        if (details.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    }
}

// Abrir primeira etapa por padrão
document.addEventListener('DOMContentLoaded', () => {
    const firstToggleBtn = document.querySelector('.timeline-item:first-child .toggle-btn');
    if (firstToggleBtn) {
        firstToggleBtn.click();
    }
});

// ========================================
// CONSULTA DE RASTREABILIDADE
// ========================================

function searchBatch() {
    const input = document.getElementById('batchInput').value.trim().toUpperCase();
    const resultDiv = document.getElementById('queryResult');
    
    // Simular busca - aceita o lote exemplo e variações
    if (input === 'MN-GALA-180226' || input === 'MN-GALA') {
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (input === '') {
        alert('Por favor, digite um código de lote');
    } else {
        alert(`Lote "${input}" não encontrado. Tente: MN-GALA-180226`);
    }
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        searchBatch();
    }
}

function closeQueryResult() {
    document.getElementById('queryResult').style.display = 'none';
    document.getElementById('batchInput').value = '';
}

// ========================================
// ANIMAÇÕES DE SCROLL
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos que devem animar ao scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatableElements = document.querySelectorAll('.feature-item, .timeline-content, .result-content, .detail-group');
    animatableElements.forEach(el => {
        observer.observe(el);
    });
});

// ========================================
// EFEITOS DE HOVER EM CARDS
// ========================================

const cards = document.querySelectorAll('.timeline-content, .feature-item, .product-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ========================================
// SMOOTH SCROLL CUSTOMIZADO
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ========================================
// VALIDAÇÃO DE INPUT EM TEMPO REAL
// ========================================

const batchInput = document.getElementById('batchInput');
if (batchInput) {
    batchInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });
}

// ========================================
// FEEDBACK VISUAL PARA BUSCA
// ========================================

function searchBatch() {
    const input = document.getElementById('batchInput').value.trim().toUpperCase();
    const resultDiv = document.getElementById('queryResult');
    
    // Adicionar classe de carregamento
    resultDiv.style.opacity = '0.5';
    
    // Simular busca com timeout
    setTimeout(() => {
        resultDiv.style.opacity = '1';
        
        // Validar lote
        if (input === 'MN-GALA-180226' || input === 'MN-GALA') {
            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Adicionar animação de sucesso
            const header = resultDiv.querySelector('.result-header');
            header.style.animation = 'none';
            setTimeout(() => {
                header.style.animation = 'slideDown 0.3s ease-out';
            }, 10);
        } else if (input === '') {
            alert('Por favor, digite um código de lote');
        } else {
            alert(`Lote "${input}" não encontrado.\n\nTente: MN-GALA-180226`);
        }
    }, 500);
}

// ========================================
// ANALYTICS SIMULADO
// ========================================

function trackEvent(eventName, eventData) {
    console.log(`[Analytics] ${eventName}:`, eventData);
}

// Rastrear cliques em botões
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn')) {
        trackEvent('button_click', {
            text: e.target.textContent,
            time: new Date().toISOString()
        });
    }
    
    if (e.target.closest('.toggle-btn')) {
        trackEvent('timeline_toggle', {
            section: e.target.closest('.timeline-content')?.querySelector('h3')?.textContent,
            time: new Date().toISOString()
        });
    }
});

// Rastrear pesquisas
const originalSearchBatch = searchBatch;
searchBatch = function() {
    const input = document.getElementById('batchInput').value;
    trackEvent('batch_search', {
        batch: input,
        time: new Date().toISOString()
    });
    originalSearchBatch.call(this);
};

// ========================================
// MODO ESCURO (OPCIONAL - DESENVOLVIDO PARA FUTURO)
// ========================================

function initDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.setAttribute('data-theme', 'dark');
    }
}

// ========================================
// PERFORMANCE - LAZY LOADING DE IMAGENS
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Site Maça Nobre - Rastreabilidade Agrícola carregado com sucesso!');
    initDarkMode();
});

// ========================================
// UTILIDADES
// ========================================

// Copiar elemento para clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copiado para área de transferência:', text);
    });
}

// Formatar data
function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('pt-BR', options);
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl + / para focar no campo de busca
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        document.getElementById('batchInput').focus();
    }
    
    // Escape para fechar resultado
    if (e.key === 'Escape') {
        closeQueryResult();
    }
});
