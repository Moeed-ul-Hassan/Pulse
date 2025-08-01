// Smooth scrolling for navigation links
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

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Enhanced scroll animations with staggered effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        animateCounter(counter, target);
                    }, index * 200);
                });
            }
            
            // Animate workflow steps
            if (entry.target.classList.contains('how-we-work')) {
                const steps = entry.target.querySelectorAll('.workflow-step');
                const connectors = entry.target.querySelectorAll('.workflow-connector');
                
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('animate');
                    }, index * 300);
                });
                
                connectors.forEach((connector, index) => {
                    setTimeout(() => {
                        connector.classList.add('animate');
                    }, index * 300 + 150);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .stats, .cta-section, .how-we-work, .testimonial-card');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});

// Enhanced parallax effect with multiple layers
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    const gridOverlay = document.querySelector('.grid-overlay');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        const xPos = (scrolled * 0.1 * (index + 1));
        orb.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${scrolled * 0.01}deg)`;
    });
    
    if (gridOverlay) {
        gridOverlay.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Floating animation for elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.feature-card, .testimonial-card');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('floating');
    });
}

// Add floating animation CSS
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .floating {
        animation: floating 6s ease-in-out infinite;
    }
    
    .feature-card:hover,
    .testimonial-card:hover {
        animation-play-state: paused;
    }
    
    /* Enhanced hover effects */
    .feature-card:hover .feature-icon {
        animation: iconBounce 0.6s ease;
    }
    
    @keyframes iconBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    /* Text reveal animation */
    .text-reveal {
        overflow: hidden;
    }
    
    .text-reveal span {
        display: inline-block;
        transform: translateY(100%);
        transition: transform 0.6s ease;
    }
    
    .text-reveal.visible span {
        transform: translateY(0);
    }
    
    /* Gradient text animation */
    .gradient-text {
        background-size: 200% 200%;
        animation: gradientShift 3s ease infinite;
    }
    
    @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    
    /* Button hover effects */
    .primary-button, .cta-button, .cta-button-large {
        position: relative;
        overflow: hidden;
    }
    
    .primary-button::before,
    .cta-button::before,
    .cta-button-large::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .primary-button:hover::before,
    .cta-button:hover::before,
    .cta-button-large:hover::before {
        left: 100%;
    }
    
    /* Card tilt effect */
    .feature-card,
    .testimonial-card,
    .workflow-step {
        transform-style: preserve-3d;
        perspective: 1000px;
    }
    
    .feature-card:hover,
    .testimonial-card:hover,
    .workflow-step:hover {
        transform: rotateX(5deg) rotateY(5deg) translateZ(10px);
    }
    
    /* Loading animation for stats */
    .stat-number {
        position: relative;
    }
    
    .stat-number::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--gradient-1);
        opacity: 0.1;
        animation: statLoading 2s ease-out;
    }
    
    @keyframes statLoading {
        0% { width: 0%; }
        100% { width: 100%; }
    }
`;

document.head.appendChild(floatingStyle);

// Initialize floating animations
document.addEventListener('DOMContentLoaded', () => {
    addFloatingAnimation();
    
    // Add text reveal animation to titles
    const titles = document.querySelectorAll('.hero-title, .section-title');
    titles.forEach(title => {
        title.classList.add('text-reveal');
        const words = title.textContent.split(' ');
        title.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Typing animation for AI interface
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Simulate AI typing in the interface
const aiMessage = document.querySelector('.ai-message .message-text');
if (aiMessage) {
    const originalText = aiMessage.textContent;
    aiMessage.textContent = '';
    
    setTimeout(() => {
        typeWriter(aiMessage, originalText, 30);
    }, 1000);
}

// Hover effects for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Gradient animation for buttons
document.querySelectorAll('.primary-button, .cta-button, .cta-button-large').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.background = 'var(--gradient-2)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.background = 'var(--gradient-1)';
    });
});

// Smooth reveal animation for hero section
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            heroVisual.style.transition = 'all 1s ease-out';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateX(0)';
        }, 600);
    }
});

// Particle effect for background
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(99, 102, 241, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.animation = 'particleFloat 8s linear infinite';
    
    document.querySelector('.background-animation').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(10, 10, 10, 0.95);
        backdrop-filter: blur(20px);
        padding: 2rem;
        border-top: 1px solid var(--border);
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Enhanced cursor trail with particles
let mouseX = 0;
let mouseY = 0;
let cursorTrail = [];
let particleCount = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create enhanced cursor trail
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.width = '6px';
    trail.style.height = '6px';
    trail.style.background = `hsl(${particleCount * 30}, 70%, 60%)`;
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.left = mouseX + 'px';
    trail.style.top = mouseY + 'px';
    trail.style.zIndex = '9999';
    trail.style.transition = 'all 0.3s ease';
    trail.style.boxShadow = '0 0 10px currentColor';
    
    document.body.appendChild(trail);
    
    cursorTrail.push(trail);
    particleCount++;
    
    // Remove old trail elements
    if (cursorTrail.length > 15) {
        const oldTrail = cursorTrail.shift();
        oldTrail.style.opacity = '0';
        oldTrail.style.transform = 'scale(0) rotate(180deg)';
        setTimeout(() => oldTrail.remove(), 300);
    }
    
    // Animate trail
    setTimeout(() => {
        trail.style.opacity = '0.7';
        trail.style.transform = 'scale(0.8)';
    }, 50);
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Parallax and other scroll-based animations
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Animate hero elements on load
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Trigger special effect
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Create explosion effect
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createParticle();
            }, i * 100);
        }
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Add rainbow animation CSS
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Payment Modal Functions
function openPaymentModal(plan, price) {
    const modal = document.getElementById('paymentModal');
    const planName = document.getElementById('selectedPlan');
    const planPrice = document.getElementById('selectedPrice');
    
    // Update modal content based on selected plan
    const planNames = {
        'starter': 'Starter Plan',
        'professional': 'Professional Plan',
        'enterprise': 'Enterprise Plan'
    };
    
    planName.textContent = planNames[plan];
    planPrice.textContent = `$${price}/month`;
    
    // Store selected plan data
    modal.setAttribute('data-plan', plan);
    modal.setAttribute('data-price', price);
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Track conversion
    trackConversion('pricing_plan_selected', { plan, price });
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('paymentModal');
    if (e.target === modal) {
        closePaymentModal();
    }
});

// Payment form handling
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePayment);
    }
    
    // Initialize payment form validation
    initializePaymentValidation();
});

function handlePayment(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const modal = document.getElementById('paymentModal');
    const plan = modal.getAttribute('data-plan');
    const price = modal.getAttribute('data-price');
    
    // Validate form
    if (!validatePaymentForm(data)) {
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('.payment-submit');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;
    
    // Process payment (using free services)
    processPayment(data, plan, price)
        .then(response => {
            showNotification('Payment successful! Welcome to Pulse HMS. Check your email for login details.', 'success');
            closePaymentModal();
            trackConversion('payment_successful', { plan, price });
        })
        .catch(error => {
            showNotification('Payment failed. Please try again or contact support.', 'error');
            console.error('Payment error:', error);
        })
        .finally(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
}

function validatePaymentForm(data) {
    const errors = [];
    
    if (!data.cardName.trim()) {
        errors.push('Cardholder name is required');
    }
    
    if (!validateCardNumber(data.cardNumber)) {
        errors.push('Please enter a valid card number');
    }
    
    if (!validateExpiryDate(data.expiryDate)) {
        errors.push('Please enter a valid expiry date (MM/YY)');
    }
    
    if (!validateCVV(data.cvv)) {
        errors.push('Please enter a valid CVV');
    }
    
    if (!validateEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join(', '), 'error');
        return false;
    }
    
    return true;
}

function validateCardNumber(number) {
    // Remove spaces and check if it's a valid card number
    const cleanNumber = number.replace(/\s/g, '');
    return /^\d{13,19}$/.test(cleanNumber);
}

function validateExpiryDate(date) {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(date)) return false;
    
    const [month, year] = date.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
}

function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function initializePaymentValidation() {
    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            value = value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }
    
    // Expiry date formatting
    const expiryDate = document.getElementById('expiryDate');
    if (expiryDate) {
        expiryDate.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // CVV formatting
    const cvv = document.getElementById('cvv');
    if (cvv) {
        cvv.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

// Free Payment Processing (using multiple free services)
async function processPayment(data, plan, price) {
    // Option 1: PayPal (free to integrate)
    try {
        return await processPayPalPayment(data, plan, price);
    } catch (error) {
        console.log('PayPal failed, trying alternative...');
    }
    
    // Option 2: Stripe (free for first $1000)
    try {
        return await processStripePayment(data, plan, price);
    } catch (error) {
        console.log('Stripe failed, trying alternative...');
    }
    
    // Option 3: Manual processing (for demo/development)
    return await processManualPayment(data, plan, price);
}

async function processPayPalPayment(data, plan, price) {
    // PayPal integration (free)
    const paypalData = {
        amount: price,
        currency: 'USD',
        plan: plan,
        customer: {
            name: data.cardName,
            email: data.email
        }
    };
    
    // Simulate PayPal API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                transactionId: 'PP_' + Date.now(),
                method: 'PayPal'
            });
        }, 2000);
    });
}

async function processStripePayment(data, plan, price) {
    // Stripe integration (free for first $1000)
    const stripeData = {
        amount: price * 100, // Stripe uses cents
        currency: 'usd',
        plan: plan,
        customer: {
            name: data.cardName,
            email: data.email
        }
    };
    
    // Simulate Stripe API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                transactionId: 'ST_' + Date.now(),
                method: 'Stripe'
            });
        }, 2000);
    });
}

async function processManualPayment(data, plan, price) {
    // Manual processing for demo/development
    const paymentData = {
        plan: plan,
        price: price,
        customer: {
            name: data.cardName,
            email: data.email
        },
        timestamp: new Date().toISOString()
    };
    
    // Send to your backend or email
    await sendPaymentNotification(paymentData);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                transactionId: 'MN_' + Date.now(),
                method: 'Manual'
            });
        }, 1500);
    });
}

async function sendPaymentNotification(paymentData) {
    // Send payment notification via email or webhook
    const notificationData = {
        to: 'hello@leafbloom.online', // Your email
        subject: 'New Pulse HMS Subscription',
        body: `
            New subscription received:
            Plan: ${paymentData.plan}
            Price: $${paymentData.price}/month
            Customer: ${paymentData.customer.name}
            Email: ${paymentData.customer.email}
            Time: ${paymentData.timestamp}
        `
    };
    
    // You can use free services like:
    // - EmailJS (free tier)
    // - Formspree (free tier)
    // - Netlify Forms (free tier)
    // - Webhook.site (free)
    
    console.log('Payment notification:', notificationData);
    
    // For now, just log the data
    // In production, integrate with your preferred free service
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// FAQ Accordion functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
        
        // Smooth scroll to the opened FAQ
        setTimeout(() => {
            faqItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);
    }
}

// Add keyboard navigation for FAQ
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(this);
            }
        });
        
        // Add ARIA attributes for accessibility
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
    });
});

// Update ARIA attributes when FAQ is toggled
function updateFAQAccessibility(faqItem, isActive) {
    const question = faqItem.querySelector('.faq-question');
    const answer = faqItem.querySelector('.faq-answer');
    
    question.setAttribute('aria-expanded', isActive);
    answer.setAttribute('aria-hidden', !isActive);
}

// Enhanced FAQ animations
function animateFAQOnScroll() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    faqItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        faqObserver.observe(item);
    });
}

// Initialize FAQ animations
document.addEventListener('DOMContentLoaded', function() {
    animateFAQOnScroll();
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
    
    // Reset form
    e.target.reset();
    
    // Track conversion (you can add analytics here)
    trackConversion('contact_form_submit', data);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

function trackConversion(event, data = {}) {
    // Add your analytics tracking here
    console.log('Conversion tracked:', event, data);
    
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', event, {
            'event_category': 'engagement',
            'event_label': data.projectType || 'general'
        });
    }
}

// Smooth scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Portfolio link tracking
function trackPortfolioClick() {
    trackConversion('portfolio_click');
}

// Add click tracking to portfolio links
document.addEventListener('DOMContentLoaded', function() {
    const portfolioLinks = document.querySelectorAll('a[href*="leafbloom.online"]');
    portfolioLinks.forEach(link => {
        link.addEventListener('click', trackPortfolioClick);
    });
});
