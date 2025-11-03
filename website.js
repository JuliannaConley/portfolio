// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
            
            // Move focus to target section for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus();
        }
    });
});

// Fade in animation on scroll
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initial fade in for hero section
window.addEventListener('load', () => {
    // Fade in hero content immediately
    setTimeout(() => {
        document.querySelectorAll('.hero-content .fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 200);
    
    // Check for other elements
    fadeInOnScroll();
});

// Run fade in check on scroll
window.addEventListener('scroll', fadeInOnScroll);

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 62, 80, 0.98)';
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    } else {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Handle keyboard navigation for better accessibility
document.addEventListener('keydown', (e) => {
    // If user presses Escape key, close mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    }
});

// Add keyboard focus trap for mobile menu when open
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
        navbarToggler.setAttribute('aria-expanded', !isExpanded);
    });
}

// Ensure smooth scroll behavior works across all browsers
if ('scrollBehavior' in document.documentElement.style === false) {
    // Polyfill for browsers that don't support smooth scrolling
    const style = document.createElement('style');
    style.textContent = 'html { scroll-behavior: smooth; }';
    document.head.appendChild(style);
}

// Add animation for work cards on hover (additional interactivity)
const workCards = document.querySelectorAll('.work-card, .project-card');
workCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeftWidth = '8px';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderLeftWidth = '5px';
    });
});

// Handle resume download button click tracking (optional analytics)
const resumeBtn = document.querySelector('.resume-btn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', function() {
        console.log('Resume downloaded');
        // Add analytics tracking here if needed
    });
}

// Lazy load images for better performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add reduced motion support for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
    });
    
    // Override smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'auto' });
            }
        });
    });
}

// Initialize all animations and interactive elements on page load
document.addEventListener('DOMContentLoaded', () => {
    fadeInOnScroll();
    updateActiveNavLink();
});

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        fadeInOnScroll();
        updateActiveNavLink();
    }, 250);
});