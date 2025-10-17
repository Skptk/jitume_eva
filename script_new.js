// ============================================
// EXECUTIVE VIRTUAL ASSISTANT WEBSITE
// JavaScript Functionality
// ============================================

// Test if script is loading
console.log('Script loading started...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Script executing...');

    // ============================================
    // MOBILE NAVIGATION & SCROLL BEHAVIOR
    // ============================================
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    let lastScrollY = 0;
    let ticking = false;

    // Mobile Navigation Toggle
    const toggleMobileNav = () => {
        const isActive = hamburgerBtn.classList.contains('active');

        if (isActive) {
            // Close mobile nav
            hamburgerBtn.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            mobileNavOverlay.setAttribute('aria-hidden', 'true');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        } else {
            // Open mobile nav
            hamburgerBtn.classList.add('active');
            mobileNavOverlay.classList.add('active');
            mobileNavOverlay.setAttribute('aria-hidden', 'false');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    };

    // Close mobile nav
    const closeMobileNav = () => {
        hamburgerBtn.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        mobileNavOverlay.setAttribute('aria-hidden', 'true');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    // Event Listeners
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMobileNav);
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileNav);
    }

    // Close mobile nav when clicking overlay backdrop
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) {
                closeMobileNav();
            }
        });
    }

    // Close mobile nav when clicking nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                closeMobileNav();
                // Also trigger smooth scroll after closing menu
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        // Anchor exists on current page, scroll to it
                        const navHeight = document.querySelector('.navigation').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        // Anchor doesn't exist on current page, redirect to home page with hash
                        const currentPath = window.location.pathname;
                        const isOnSubpage = currentPath !== '/' && !currentPath.endsWith('index.html');

                        if (isOnSubpage) {
                            // Redirect to home page with the hash
                            window.location.href = `index.html${href}`;
                        }
                    }
                }
            }, 150); // Small delay for visual feedback
        });
    });

    // Navigation Scroll Behavior
    const handleNavigationScroll = () => {
        const currentScrollY = window.scrollY;
        const navigation = document.querySelector('.navigation');

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide nav
            navigation.classList.add('hidden');
        } else {
            // Scrolling up - show nav
            navigation.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleNavigationScroll);
            ticking = true;
        }
    }, { passive: true });

    // Close mobile nav on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
            closeMobileNav();
        }
    });

    // Prevent scroll when mobile nav is open
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
    }

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
                    // Anchor exists on current page, scroll to it
                    const navigation = document.querySelector('.navigation');
                    const navHeight = navigation ? navigation.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Anchor doesn't exist on current page, redirect to home page with hash
                    const currentPath = window.location.pathname;
                    const isOnSubpage = currentPath !== '/' && !currentPath.endsWith('index.html');

                    if (isOnSubpage) {
                        // Redirect to home page with the hash
                        window.location.href = `index.html${href}`;
                    }
                }
            }
        });
    });

    // ============================================
    // FAQ ACCORDION - CLEAN REBUILD
    // ============================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    console.log('Found FAQ questions:', faqQuestions.length);

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            console.log('FAQ question clicked');
            const faqItem = this.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');

            if (!faqItem || !answer) {
                console.error('FAQ elements not found!');
                return;
            }

            // Toggle the active state
            faqItem.classList.toggle('active');

            // Update aria-expanded
            const isExpanded = faqItem.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');

            console.log('FAQ item active:', isExpanded);
        });
    });

    // ============================================
    // METRICS COUNTER ANIMATION
    // ============================================
    const metricNumbers = document.querySelectorAll('.metric-number');
    let metricsAnimated = false;

    console.log('Found metric numbers:', metricNumbers.length);

    const animateCounter = (element, target) => {
        console.log('Animating counter for target:', target);
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log('Metrics section intersection:', entry.isIntersecting);
            if (entry.isIntersecting && !metricsAnimated) {
                console.log('Starting metrics animation');
                metricsAnimated = true;
                metricNumbers.forEach(metric => {
                    const target = parseInt(metric.getAttribute('data-target'));
                    if (target) {
                        animateCounter(metric, target);
                    }
                });
            }
        });
    }, observerOptions);

    const metricsSection = document.querySelector('.metrics');
    if (metricsSection) {
        console.log('Metrics section found, observing...');
        metricsObserver.observe(metricsSection);
    } else {
        console.log('Metrics section not found!');
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
                alert('Sorry, there was an error sending your message. Please email nairobistonks@gmail.com directly.');
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

    // Apply fade-in to sections only if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            // Skip the metrics section for now - it needs to be visible for counter animation
            if (section.classList.contains('metrics')) {
                return;
            }
            // Set initial state for animation
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeInObserver.observe(section);
        });
    } else {
        // Fallback: Ensure sections are visible if IntersectionObserver is not supported
        console.log('IntersectionObserver not supported - showing sections immediately');
    }

    // Ensure metrics section is visible for counter animation
    if (metricsSection) {
        metricsSection.style.opacity = '1';
        metricsSection.style.transform = 'none';
    }

    // ============================================
    // TOOLS CAROUSEL FUNCTIONALITY
    // ============================================
    const toolsTrack = document.getElementById('toolsTrack');

    if (toolsTrack) {
        const toolItems = toolsTrack.querySelectorAll('.tool-item');
        const itemWidth = 152; // 120px min-width + 32px gap (2rem)
        const visibleItems = Math.floor(toolsTrack.parentElement.offsetWidth / itemWidth);
        const totalItems = toolItems.length;
        let currentIndex = 0;
        let autoScrollInterval;
        let isHovering = false;

        function updateCarousel() {
            const maxIndex = Math.max(0, totalItems - visibleItems);
            currentIndex = Math.min(currentIndex, maxIndex);

            const translateX = -currentIndex * itemWidth;
            toolsTrack.style.transform = `translateX(${translateX}px)`;
        }

        // Detect if user is on mobile/touch device for performance optimization
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        function startAutoScroll() {
            // Slower speed on mobile for better performance and battery life
            const baseSpeed = isTouchDevice ? 1500 : 1000; // 1.5s on mobile, 1s on desktop
            const speed = isHovering ? Math.max(300, baseSpeed - 500) : baseSpeed; // Faster when hovering but not too fast on mobile
            autoScrollInterval = setInterval(() => {
                const maxIndex = Math.max(0, totalItems - visibleItems);
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateCarousel();
            }, speed);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        // Speed up on hover instead of pausing
        toolsTrack.parentElement.addEventListener('mouseenter', () => {
            isHovering = true;
            stopAutoScroll();
            startAutoScroll();
        });

        toolsTrack.parentElement.addEventListener('mouseleave', () => {
            isHovering = false;
            stopAutoScroll();
            startAutoScroll();
        });

        // Start auto-scroll
        startAutoScroll();

        // Update on window resize
        window.addEventListener('resize', updateCarousel);

        // Initial setup
        updateCarousel();
    }

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
                const navigation = document.querySelector('.navigation');
                const navHeight = navigation ? navigation.offsetHeight : 0;
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
            } else {
                // Contact section doesn't exist on current page, redirect to home page
                const currentPath = window.location.pathname;
                const isOnSubpage = currentPath !== '/' && !currentPath.endsWith('index.html');

                if (isOnSubpage) {
                    // Redirect to home page with contact hash
                    window.location.href = 'index.html#contact';
                }
            }
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

        // Show all sections immediately (don't rely on IntersectionObserver for visibility)
        if ('IntersectionObserver' in window) {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.opacity = '1';
                section.style.transform = 'none';
            });
        }
    }

    // ============================================
    // TOOL BADGES INTERACTION
    // ============================================
    const toolBadges = document.querySelectorAll('.tool-badge');

    toolBadges.forEach(badge => {
        badge.addEventListener('click', function() {
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
});
