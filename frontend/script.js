// ==========================================
// CAROUSEL FUNCTIONALITY
// ==========================================

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
const slideInterval = 4000; // 4 seconds per slide

// ==========================================
// REVEAL ANIMATIONS ON SCROLL
// ==========================================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.reveal').forEach(section => {
    revealObserver.observe(section);
});

// Function to show specific slide
function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index;
}

// Function to go to next slide
function nextSlide() {
    let next = (currentSlide + 1) % totalSlides;
    showSlide(next);
}

// Auto-advance carousel
let autoSlide = setInterval(nextSlide, slideInterval);

// Dot click handlers
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        // Reset auto-advance timer
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, slideInterval);
    });
});

// Pause carousel on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, slideInterval);
});

// ==========================================
// NAVIGATION SCROLL EFFECT
// ==========================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ==========================================

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#inicio') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        // Update active nav link
        updateActiveNavLink(targetId);
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Highlight nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            mensaje: document.getElementById('mensaje').value
        };

        // Create mailto link (temporary solution until backend is set up)
        const mailtoLink = `mailto:info@contenedoresbenja.com?subject=Consulta de ${formData.nombre}&body=Nombre: ${formData.nombre}%0D%0AEmail: ${formData.email}%0D%0ATeléfono: ${formData.telefono}%0D%0A%0D%0AMensaje:%0D%0A${formData.mensaje}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message (you can customize this)
        alert('¡Gracias por tu consulta! Se abrirá tu cliente de correo para enviar el mensaje.');

        // Reset form
        contactForm.reset();
    });
}

// ==========================================
// PRELOAD IMAGES
// ==========================================

function preloadImages() {
    const images = [
        'truck_real.jpg',
        'container_1.png',
        'container_2.png'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize on page load
window.addEventListener('load', () => {
    preloadImages();

    // Add entrance animation to hero content
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';

    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease-out';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 100);
});

// ==========================================
// CHATBOT FUNCTIONALITY
// ==========================================

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatIcon = document.querySelector('.chat-icon');
const closeIcon = document.querySelector('.close-icon');
const chatbotBody = document.getElementById('chatbotBody');
const chatOptions = document.getElementById('chatOptions'); // Changed selector
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');

// Chat State
let chatState = {
    step: 'MENU', // MENU, DETAILS, EMAIL, DONE
    service: '',
    details: '',
    email: ''
};

// Toggle Chatbot
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    const isActive = chatbotWindow.classList.contains('active');

    if (isActive) {
        chatIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        // Focus input if text is allowed
        if (!chatInput.disabled) chatInput.focus();
    } else {
        chatIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
});

// Close Chatbot
chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    chatIcon.style.display = 'block';
    closeIcon.style.display = 'none';
});

// Helper: Scroll to bottom
function scrollToBottom() {
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// Helper: Add Message
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chatbot-message');
    msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.innerHTML = `<p>${text}</p>`;

    // Insert before options if options are visible, else append
    if (chatOptions.style.display !== 'none' && chatOptions.parentElement === chatbotBody) {
        chatbotBody.insertBefore(msgDiv, chatOptions);
    } else {
        chatbotBody.appendChild(msgDiv);
    }

    scrollToBottom();
}

// Helper: Enable/Disable Input
function setInputState(enabled) {
    chatInput.disabled = !enabled;
    chatSendBtn.disabled = !enabled;
    if (enabled) {
        chatInput.focus();
    }
}

// Handle Option Clicks
document.querySelectorAll('.chat-option').forEach(option => {
    option.addEventListener('click', function () {
        const optionText = this.innerText.trim();
        const optionType = this.getAttribute('data-option');

        // User Selection
        addMessage(optionText, 'user');
        chatOptions.style.display = 'none';

        chatState.service = optionText;
        chatState.step = 'DETAILS';

        // Bot Response + Ask for Details
        setTimeout(() => {
            let question = "";
            switch (optionType) {
                case 'bateas':
                    question = "Perfecto. Disponemos de varios tamaños. ¿Para qué tipo de residuos la necesitas y en qué zona?";
                    break;
                case 'aridos':
                    question = "Entendido. ¿Qué tipo de material (arena, piedra, tierra) y cantidad aproximada necesitas?";
                    break;
                case 'maquinaria':
                    question = "Excelente. ¿Para qué tipo de trabajo necesitas la máquina (limpieza, movimiento de suelo, carga)?";
                    break;
                case 'consultas':
                    question = "¿En qué podemos ayudarte? Cuéntanos tu duda puntualmente.";
                    break;
                default:
                    question = "¿Podrías darnos más detalles de lo que necesitas?";
            }

            addMessage(question, 'bot');
            setInputState(true); // Enable input for user details
        }, 600);
    });
});

// Handle User Input Submission
function handleUserSubmit() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';
    setInputState(false); // Disable while bot thinks

    // Logic based on state
    setTimeout(() => {
        if (chatState.step === 'DETAILS') {
            chatState.details = text;
            chatState.step = 'EMAIL';
            addMessage("¡Gracias! Por favor, déjanos tu correo electrónico o email para enviarte la información completa y contactarte.", 'bot');
            setInputState(true);
        } else if (chatState.step === 'EMAIL') {
            chatState.email = text;
            chatState.step = 'DONE';

            // Simulate sending data
            console.log("Sending Lead Data:", chatState);

            addMessage(`¡Perfecto! Hemos registrado tu solicitud para <b>${chatState.service}</b>.`, 'bot');

            setTimeout(() => {
                addMessage("Un asesor te contactará a la brevedad a " + chatState.email + ". ¡Gracias por elegirnos!", 'bot');

                // Reset after a while or leave it
                setTimeout(() => {
                    addMessage("¿Deseas realizar otra consulta?", 'bot');
                    chatOptions.style.display = 'flex';
                    chatbotBody.appendChild(chatOptions); // Move options to bottom
                    scrollToBottom();
                    chatState.step = 'MENU';
                }, 3000);
            }, 1000);
        }
    }, 800);
}

chatSendBtn.addEventListener('click', handleUserSubmit);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserSubmit();
    }
});

