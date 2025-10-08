// Testimonials Slider
class TestimonialsSlider {
    constructor() {
        this.slider = document.getElementById('testimonialsSlider');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dots = document.querySelectorAll('.dot');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        
        if (!this.slider) return;
        
        this.init();
    }
    
    getVisibleCards() {
        return window.innerWidth <= 1024 ? 1 : 2;
    }
    
    getTotalSlides() {
        return this.cards.length;
    }
    
    updateSlider() {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 40;
        const translateX = this.currentSlide * (cardWidth + gap);
        
        this.slider.style.transform = `translateX(-${translateX}px)`;
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update button states
        const visibleCards = this.getVisibleCards();
        this.prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentSlide >= this.getTotalSlides() - visibleCards ? '0.5' : '1';
    }
    
    nextSlide() {
        const visibleCards = this.getVisibleCards();
        if (this.currentSlide < this.getTotalSlides() - visibleCards) {
            this.currentSlide++;
            this.updateSlider();
        }
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSlider();
        }
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            const visibleCards = this.getVisibleCards();
            if (this.currentSlide >= this.getTotalSlides() - visibleCards) {
                this.currentSlide = 0;
            } else {
                this.currentSlide++;
            }
            this.updateSlider();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    init() {
        // Button event listeners
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-slide with pause on hover
        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
        
        // Handle window resize
        window.addEventListener('resize', () => this.updateSlider());
        
        // Initialize slider and auto-slide
        this.updateSlider();
        this.startAutoSlide();
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.submitBtn = document.querySelector('.submit-btn');
        
        if (!this.form) return;
        
        this.init();
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showError(message) {
        alert(message);
    }
    
    showSuccess(message) {
        alert(message);
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const name = this.nameInput.value.trim();
        const email = this.emailInput.value.trim();
        
        // Validate inputs
        if (!name || !email) {
            this.showError('Please fill in all fields.');
            return;
        }
        
        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const originalText = this.submitBtn.textContent;
        this.submitBtn.textContent = 'Sending...';
        this.submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success and reset
        this.showSuccess('Thank you for your message! We\'ll get back to you soon.');
        this.form.reset();
        this.submitBtn.textContent = originalText;
        this.submitBtn.disabled = false;
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
}

// Smooth Scroll Navigation
class SmoothScroll {
    constructor() {
        this.navLinks = document.querySelectorAll('nav a[href^="#"]');
        this.init();
    }
    
    scrollToTarget(targetId) {
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToTarget(targetId);
            });
        });
    }
}

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsSlider();
    new ContactForm();
    new SmoothScroll();
});
