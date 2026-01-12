// ============================================
// KEKE AXELLE - Portfolio JavaScript
// Développeuse Full Stack & Conceptrice Électronique
// ============================================

// === CONSTANTES ===
const TYPING_SPEED = 100;
const TYPING_DELAY = 2000;
const TYPING_TEXTS = [
    "Conceptrice de cartes embarquées ⚡",
    "Développeuse Full Stack 💻",
    "Passionnée d'IoT & Automatisation 🚀",
    "Créatrice de solutions innovantes 💡"
];

// === MENU MOBILE ===
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Toggle menu mobile
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Fermer le menu au clic sur un lien
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// === ACTIVE NAVIGATION LINK ===
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksItems.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// === TYPING EFFECT ===
const typingElement = document.querySelector('.typing-text');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingElement) return;
    
    const currentText = TYPING_TEXTS[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % TYPING_TEXTS.length;
            setTimeout(typeEffect, 500);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, TYPING_DELAY);
            return;
        }
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : TYPING_SPEED);
}

// Démarrer l'effet de typing
if (typingElement) {
    typeEffect();
}

// === SCROLL TO TOP BUTTON ===
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// === INTERSECTION OBSERVER POUR ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments qui doivent s'animer
const animateElements = document.querySelectorAll(`
    .about-card,
    .accomplishment-card,
    .skill-category,
    .project-card,
    .timeline-item,
    .contact-card,
    .certification-card,
    .formation-content
`);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// === FILTRES PROJETS ===
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Mettre à jour les boutons actifs
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtrer les projets
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// === FORMULAIRE DE CONTACT ===
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les valeurs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Créer le lien mailto
        const mailtoLink = `mailto:ramoskeke16@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
        
        // Ouvrir le client mail
        window.location.href = mailtoLink;
        
        // Afficher un message de confirmation
        alert('✅ Votre client mail va s\'ouvrir. Merci de votre message !');
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });
}

// === COMPTEUR ANIMÉ POUR LES STATS ===
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observer pour les stats du hero
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// === PARALLAX EFFECT POUR LES CERCLES DU HERO ===
const circles = document.querySelectorAll('.circle');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        circle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// === GESTION DU CV ===
// Vérifier si le PDF existe
const cvIframe = document.querySelector('.cv-iframe');
if (cvIframe) {
    cvIframe.addEventListener('error', () => {
        console.log('Le fichier CV n\'est pas encore disponible');
    });
}

// === ANIMATION DE PROGRESSION POUR LES CERTIFICATIONS ===
const certScores = document.querySelectorAll('.cert-score');

const certObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'bounceIn 0.6s ease';
            certObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

certScores.forEach(score => {
    certObserver.observe(score);
});

// Ajouter l'animation bounce
const style = document.createElement('style');
style.textContent = `
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// === HOVER EFFECT POUR LES PROJECT CARDS ===
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// === TÉLÉCHARGEMENT DU CV ===
const downloadCvBtns = document.querySelectorAll('a[href*="cv_keke_axelle.pdf"]');

downloadCvBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Vérifier si c'est un lien de téléchargement
        if (btn.hasAttribute('download')) {
            // Le navigateur gèrera le téléchargement
            console.log('Téléchargement du CV...');
        }
    });
});

// === EASTER EGG - KONAMI CODE ===
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activé !
        document.body.style.animation = 'rainbow 3s infinite';
        setTimeout(() => {
            alert('🎉 Easter Egg trouvé ! Tu es aussi battante que moi ! 💪✨');
            document.body.style.animation = '';
        }, 100);
    }
});

// Animation rainbow pour l'easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// === PERFORMANCE - LAZY LOADING IMAGES ===
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// === CHARGEMENT INITIAL ===
window.addEventListener('load', () => {
    console.log('🚀 Portfolio de KEKE AXELLE chargé avec succès !');
    console.log('💻 Développeuse Full Stack & Conceptrice Électronique');
    console.log('✨ Passionnée par l\'innovation et l\'excellence technique');
    
    // Animer le logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.animation = 'bounceIn 1s ease';
    }
});

// === GESTION DES ERREURS GLOBALES ===
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.message);
});

// === DÉTECTION DU SYSTÈME D'EXPLOITATION ===
const userAgent = navigator.userAgent.toLowerCase();
const isMobile = /iphone|ipad|android/.test(userAgent);

if (isMobile) {
    // Optimisations pour mobile
    document.body.classList.add('mobile-device');
    
    // Désactiver certaines animations sur mobile pour les performances
    circles.forEach(circle => {
        circle.style.animation = 'none';
    });
}

// === MESSAGE DE BIENVENUE DANS LA CONSOLE ===
console.log('%c💻 Portfolio de KEKE AXELLE 💻', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Développeuse Full Stack & Conceptrice Électronique', 'color: #6C63FF; font-size: 14px;');
console.log('%c✨ Passionnée par l\'innovation technologique et l\'automatisation', 'color: #FF006E; font-size: 12px;');
console.log('%c📧 Contact: ramoskeke16@gmail.com', 'color: #00F5A0; font-size: 12px;');
console.log('%c🔗 GitHub: https://github.com/Rameaux13', 'color: #00F5A0; font-size: 12px;');

// === DARK MODE TOGGLE ===
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Fonction pour appliquer le thème
function applyTheme(theme) {
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        html.removeAttribute('data-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Charger le thème sauvegardé ou détecter la préférence système
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    applyTheme(savedTheme);
} else if (prefersDark) {
    applyTheme('dark');
    localStorage.setItem('theme', 'dark');
}

// Toggle du thème au clic
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        // Animation du bouton
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 200);
    });
}

// Détecter les changements de préférence système
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// === TUTORIAL INTERACTIF ===
const tutorialSteps = [
    {
        icon: 'fa-hand',
        title: 'Bienvenue sur mon Portfolio!',
        description: 'Salut! Moi c\'est Keke Axelle, développeuse Full Stack passionnée. Laisse-moi te faire découvrir mon univers en quelques étapes!',
        target: null
    },
    {
        icon: 'fa-user-circle',
        title: 'Découvre mon parcours',
        description: 'Ici tu trouveras tout sur moi : mon double ADN électronique + développement, mes valeurs et ce qui me passionne vraiment!',
        target: '#apropos'
    },
    {
        icon: 'fa-trophy',
        title: 'Mes accomplissements',
        description: 'WorldSkills, CDC-CI Capital x HEC Paris, et mes certifications... Je suis fière de partager mes réussites avec toi!',
        target: '#accomplissements'
    },
    {
        icon: 'fa-rocket',
        title: 'Mes projets innovants',
        description: 'Du web au desktop, de l\'électronique à l\'IoT... Découvre mes créations et mes solutions complètes!',
        target: '#projets'
    },
    {
        icon: 'fa-moon',
        title: 'Astuce : Mode sombre',
        description: 'Pssst... Tu vois le bouton en bas à droite? Clique dessus pour activer le mode sombre. Ton portfolio, ton style!',
        target: '#themeToggle'
    }
];

let currentTutorialStep = 0;

const tutorialOverlay = document.getElementById('tutorialOverlay');
const tutorialCard = document.getElementById('tutorialCard');
const tutorialSpotlight = document.getElementById('tutorialSpotlight');
const tutorialIcon = document.getElementById('tutorialIcon');
const tutorialTitle = document.getElementById('tutorialTitle');
const tutorialDescription = document.getElementById('tutorialDescription');
const currentStepEl = document.getElementById('currentStep');
const totalStepsEl = document.getElementById('totalSteps');
const tutorialPrevBtn = document.getElementById('tutorialPrev');
const tutorialNextBtn = document.getElementById('tutorialNext');
const tutorialSkipBtn = document.getElementById('tutorialSkip');

// Initialiser le tutoriel
function initTutorial() {
    // Vérifier si l'utilisateur a déjà vu le tutoriel
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');

    if (!hasSeenTutorial) {
        // Attendre 1 seconde après le chargement de la page
        setTimeout(() => {
            startTutorial();
        }, 1000);
    }
}

function startTutorial() {
    currentTutorialStep = 0;
    totalStepsEl.textContent = tutorialSteps.length;
    tutorialOverlay.classList.add('active');
    updateTutorialStep();
}

function updateTutorialStep() {
    const step = tutorialSteps[currentTutorialStep];

    // Mettre à jour le contenu
    tutorialIcon.innerHTML = `<i class="fas ${step.icon}"></i>`;
    tutorialTitle.textContent = step.title;
    tutorialDescription.textContent = step.description;
    currentStepEl.textContent = currentTutorialStep + 1;

    // Mettre à jour les boutons
    tutorialPrevBtn.disabled = currentTutorialStep === 0;

    if (currentTutorialStep === tutorialSteps.length - 1) {
        tutorialNextBtn.innerHTML = 'C\'est parti! <i class="fas fa-check"></i>';
    } else {
        tutorialNextBtn.innerHTML = 'Suivant <i class="fas fa-arrow-right"></i>';
    }

    // Gérer le spotlight
    if (step.target) {
        const targetElement = document.querySelector(step.target);
        if (targetElement) {
            highlightElement(targetElement);
        }
    } else {
        tutorialSpotlight.style.display = 'none';
    }
}

function highlightElement(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    tutorialSpotlight.style.display = 'block';
    tutorialSpotlight.style.top = (rect.top + scrollTop - 10) + 'px';
    tutorialSpotlight.style.left = (rect.left + scrollLeft - 10) + 'px';
    tutorialSpotlight.style.width = (rect.width + 20) + 'px';
    tutorialSpotlight.style.height = (rect.height + 20) + 'px';

    // Scroll vers l'élément
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function nextTutorialStep() {
    if (currentTutorialStep < tutorialSteps.length - 1) {
        currentTutorialStep++;
        updateTutorialStep();
    } else {
        endTutorial();
    }
}

function prevTutorialStep() {
    if (currentTutorialStep > 0) {
        currentTutorialStep--;
        updateTutorialStep();
    }
}

function endTutorial() {
    tutorialOverlay.classList.remove('active');
    localStorage.setItem('hasSeenTutorial', 'true');

    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event listeners pour le tutoriel
if (tutorialNextBtn) {
    tutorialNextBtn.addEventListener('click', nextTutorialStep);
}

if (tutorialPrevBtn) {
    tutorialPrevBtn.addEventListener('click', prevTutorialStep);
}

if (tutorialSkipBtn) {
    tutorialSkipBtn.addEventListener('click', endTutorial);
}

// Fermer le tutoriel si on clique sur l'overlay (en dehors de la carte)
if (tutorialOverlay) {
    tutorialOverlay.addEventListener('click', (e) => {
        if (e.target === tutorialOverlay) {
            endTutorial();
        }
    });
}

// Démarrer le tutoriel au chargement de la page
window.addEventListener('load', () => {
    initTutorial();
});

// === FIN DU SCRIPT ===