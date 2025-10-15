// ============================================
// EXECUTIVE VIRTUAL ASSISTANT WEBSITE
// JavaScript Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVIGATION SCROLL EFFECT
    // ============================================
    const navigation = document.querySelector('.navigation');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleNavigationScroll = () => {
        if (lastScrollY > 100) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(handleNavigationScroll);
            ticking = true;
        }
    }, { passive: true });

    // ============================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ============================================
    const navLinks = document.querySelectorAll('.nav-link, .hero-cta, .footer-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = navigation.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ============================================
    // METRICS COUNTER ANIMATION
    // ============================================
    const metricNumbers = document.querySelectorAll('.metric-number');
    let metricsAnimated = false;

    const animateCounter = (element, target) => {
        const duration = 2000; // 2 seconds
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !metricsAnimated) {
                metricsAnimated = true;
                metricNumbers.forEach(metric => {
                    const target = parseInt(metric.getAttribute('data-target'));
                    animateCounter(metric, target);
                });
            }
        });
    }, observerOptions);

    const metricsSection = document.querySelector('.metrics');
    if (metricsSection) {
        metricsObserver.observe(metricsSection);
    }

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Honeypot spam check
            if (document.getElementById('website').value !== '') {
                console.log('Spam detected');
                return false;
            }
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                package: document.getElementById('package').value,
                message: document.getElementById('message').value
            };
            
            const submitBtn = this.querySelector('.form-submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Replace [your-form-id] with actual Formspree ID after signup at formspree.io
                const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully. I\'ll respond within 24 hours.');
                    this.reset();
                    
                    // Scroll to top
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please email info@jitumevas.com directly.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ============================================
    // SECTION FADE-IN ANIMATION ON SCROLL
    // ============================================
    const fadeInObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, fadeInObserverOptions);
    
    // Apply fade-in to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(section);
    });

    // ============================================
    // CARD HOVER EFFECTS
    // ============================================
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .package-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ============================================
    // PACKAGE BUTTONS
    // ============================================
    const packageButtons = document.querySelectorAll('.package-cta');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageCard = this.closest('.package-card');
            const packageTitle = packageCard.querySelector('.package-title').textContent;
            
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const navHeight = navigation.offsetHeight;
                const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Pre-fill package selection
                setTimeout(() => {
                    const packageSelect = document.getElementById('package');
                    if (packageSelect) {
                        const packageValue = packageTitle.toLowerCase().includes('essential') ? 'essential' :
                                            packageTitle.toLowerCase().includes('partnership') ? 'executive' :
                                            'enterprise';
                        packageSelect.value = packageValue;
                    }
                }, 500);
            }
        });
    });

    // ============================================
    // ACCESSIBILITY IMPROVEMENTS
    // ============================================
    
    // Add keyboard navigation for FAQ
    faqQuestions.forEach(question => {
        question.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Focus management for forms
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transition = 'all 0.3s ease';
        });
    });

    // ============================================
    // PREFERS REDUCED MOTION
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('*').forEach(element => {
            element.style.transition = 'none';
            element.style.animation = 'none';
        });
        
        // Show all sections immediately
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'none';
        });
    }

    // ============================================
    // TOOL BADGES INTERACTION
    // ============================================
    const toolBadges = document.querySelectorAll('.tool-badge');
    
    toolBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            // Optional: Add click functionality for tool badges
            console.log('Tool clicked:', this.textContent);
        });
    });

    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    
    // Lazy load images if any are added later
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // PAGE LOADER
    // ============================================
    window.addEventListener('load', () => {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => loader.remove(), 500);
        }
    });

    // ============================================
    // MOBILE OPTIMIZATION: Touch Event Improvements
    // ============================================
    
    // Detect if user is on mobile/touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Improve touch response for interactive elements
        const touchElements = document.querySelectorAll('.service-card, .testimonial-card, .package-card, .tool-badge');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });
    }
    
    // ============================================
    // MOBILE OPTIMIZATION: Connection-Aware Loading
    // ============================================
    
    // Check for slow connections and adjust accordingly
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
            // Disable animations on slow connections
            document.body.classList.add('reduced-motion');
            console.log('Slow connection detected - animations reduced');
        }
    }
    
    // ============================================
    // MOBILE OPTIMIZATION: Viewport Height Fix for Mobile Browsers
    // ============================================
    
    // Fix for mobile browsers where 100vh includes address bar
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', debounce(setViewportHeight, 250));
    window.addEventListener('orientationchange', setViewportHeight);

    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%c👋 Welcome to EVA Website!', 'font-size: 20px; color: #e63946; font-weight: bold;');
    console.log('%cLooking for a Virtual Assistant? Let\'s connect!', 'font-size: 14px; color: #1a2747;');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
