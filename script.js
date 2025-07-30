// Pulse HMS Landing Page JavaScript
// Modern, performance-optimized vanilla JavaScript

class PulseLanding {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupModal();
        this.setupFormHandling();
        this.setupPerformanceOptimizations();
    }

    setupEventListeners() {
        // DOM loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Window events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 100));
        
        // Watch demo button
        const watchDemoBtn = document.getElementById('watch-demo-btn');
        if (watchDemoBtn) {
            watchDemoBtn.addEventListener('click', this.openDemoModal.bind(this));
        }

        // Navigation toggle for mobile
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerOffset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    onDOMReady() {
        // Initialize animations
        this.setupScrollAnimations();
        
        // Add initial classes
        document.body.classList.add('loaded');
        
        // Performance optimizations
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Add staggered animation for grid items
                    if (entry.target.classList.contains('use-case-card') || 
                        entry.target.classList.contains('testimonial-card') ||
                        entry.target.classList.contains('stat-card')) {
                        this.staggerAnimation(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        this.observeElements([
            '.step',
            '.use-case-card',
            '.testimonial-card',
            '.team-member',
            '.stat-card',
            '.animate-on-scroll'
        ]);
    }

    observeElements(selectors) {
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                this.scrollObserver.observe(el);
            });
        });
    }

    staggerAnimation(element) {
        const siblings = Array.from(element.parentNode.children);
        const index = siblings.indexOf(element);
        
        setTimeout(() => {
            element.style.animationDelay = `${index * 100}ms`;
        }, 0);
    }

    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add background blur when scrolled
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    setupModal() {
        const modal = document.getElementById('demo-modal');
        const closeBtn = document.getElementById('close-modal');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', this.closeDemoModal.bind(this));
        }

        // Close modal on outside click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeDemoModal();
                }
            });
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeDemoModal();
            }
        });
    }

    openDemoModal() {
        const modal = document.getElementById('demo-modal');
        const video = document.getElementById('demo-video');
        
        if (modal && video) {
            // Loom video embed URL - replace with actual demo video
            const loomVideoId = 'your-loom-video-id'; // Replace with actual Loom video ID
            const videoSrc = `https://www.loom.com/embed/${loomVideoId}`;
            
            video.src = videoSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Analytics tracking
            this.trackEvent('Demo Video', 'Open', 'Hero Button');
        }
    }

    closeDemoModal() {
        const modal = document.getElementById('demo-modal');
        const video = document.getElementById('demo-video');
        
        if (modal && video) {
            modal.classList.remove('active');
            video.src = '';
            document.body.style.overflow = '';
            
            // Analytics tracking
            this.trackEvent('Demo Video', 'Close');
        }
    }

    setupFormHandling() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
            
            // Real-time validation
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', this.validateField.bind(this));
                input.addEventListener('input', this.clearFieldError.bind(this));
            });
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(data);
            
            // Success state
            this.showSuccessMessage('Thank you! We\'ll be in touch within 24 hours to schedule your demo.');
            form.reset();
            
            // Analytics tracking
            this.trackEvent('Contact Form', 'Submit', 'Success');
            
        } catch (error) {
            // Error state
            this.showErrorMessage('Sorry, there was an error sending your message. Please try again.');
            
            // Analytics tracking
            this.trackEvent('Contact Form', 'Submit', 'Error');
            
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField({ target: input })) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(e);

        // Required validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }

        // Show error if invalid
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(e) {
        const field = e.target;
        field.classList.remove('error');
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    async simulateFormSubmission(data) {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% success rate)
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 2000);
        });
    }

    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    max-width: 400px;
                    padding: 16px 20px;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--border-radius);
                    backdrop-filter: blur(20px);
                    box-shadow: var(--shadow-lg);
                    z-index: 1500;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    animation: slideInRight 0.3s ease;
                }
                .notification-success { border-left: 4px solid #10b981; }
                .notification-error { border-left: 4px solid #ef4444; }
                .notification-info { border-left: 4px solid #3b82f6; }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: var(--text-primary);
                }
                .notification-success i { color: #10b981; }
                .notification-error i { color: #ef4444; }
                .notification-info i { color: #3b82f6; }
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    transition: all 0.2s ease;
                }
                .notification-close:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--text-primary);
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        });
    }

    setupPerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Lazy load images
        this.lazyLoadImages();
        
        // Optimize animations
        this.optimizeAnimations();
    }

    preloadCriticalResources() {
        const criticalImages = [
            'https://pixabay.com/get/g39cc61286a8526cf2ddf43556ba5e2592109b25f2a6c2584e78a5f59a1ad627b50d1f1fc45887bd3b71f367492a32fd04c3a7e1dd1a18cdb92d3da364fd34009_1280.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeAnimations() {
        // Reduce motion for users who prefer it
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        }
    }

    handleScroll() {
        // Update scroll-based animations
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    }

    handleResize() {
        // Recalculate layout-dependent features
        this.optimizeAnimations();
    }

    // Utility functions
    throttle(func, limit) {
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

    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    trackEvent(category, action, label = null) {
        // Analytics tracking (replace with your analytics service)
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
        
        // Console log for development
        console.log('Event tracked:', { category, action, label });
    }
}

// Initialize the application
const pulseLanding = new PulseLanding();

// Export for potential external use
window.PulseLanding = PulseLanding;

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add CSS for form validation
const validationStyles = document.createElement('style');
validationStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
    }
    
    .field-error {
        color: #ef4444;
        font-size: 14px;
        margin-top: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    
    .field-error::before {
        content: '⚠';
        font-size: 12px;
    }
    
    /* Mobile navigation styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: var(--primary-bg);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
            border-top: 1px solid var(--glass-border);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu .nav-link {
            font-size: 18px;
            margin-bottom: 30px;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .nav-actions {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            gap: 20px;
        }
    }
`;

document.head.appendChild(validationStyles);
