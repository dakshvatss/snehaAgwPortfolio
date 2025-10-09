// Service Cards Expandable Functionality
class ServiceExpander {
    constructor() {
        this.menuItems = document.querySelectorAll('[data-expandable]');
        this.init();
    }
    
    init() {
        this.menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetId = item.getAttribute('data-expandable');
                const targetContent = document.getElementById(targetId);
                
                if (targetContent) {
                    const isExpanded = targetContent.classList.contains('expanded');
                    
                    targetContent.classList.toggle('expanded');
                    item.classList.toggle('expanded');
                }
            });
        });
    }
}

// Testimonials Navigation
class TestimonialsNavigation {
    constructor() {
        this.container = document.getElementById('testimonialsCards');
        this.prevBtn = document.getElementById('testimonialPrevBtn');
        this.nextBtn = document.getElementById('testimonialNextBtn');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.currentIndex = 0;
        this.autoScrollInterval = null;
        
        if (!this.container || this.cards.length === 0) return;
        
        this.init();
    }
    
    init() {
        this.updateVisibility();
        this.updateButtons();
        
        this.prevBtn?.addEventListener('click', () => {
            this.stopAutoScroll();
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.scrollToCard();
            }
            this.startAutoScroll();
        });
        
        this.nextBtn?.addEventListener('click', () => {
            this.stopAutoScroll();
            if (this.currentIndex < this.cards.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
            this.scrollToCard();
            this.startAutoScroll();
        });
        
        window.addEventListener('resize', () => {
            this.updateVisibility();
            this.updateButtons();
        });
        
        this.startAutoScroll();
    }
    
    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            if (this.currentIndex < this.cards.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
            this.scrollToCard();
        }, 4000);
    }
    
    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
    }
    
    scrollToCard() {
        this.updateVisibility();
        this.updateButtons();
    }
    
    updateVisibility() {
        const isDesktop = window.innerWidth > 768;
        
        if (isDesktop) {
            this.cards.forEach(card => {
                card.style.display = 'flex';
            });
        } else {
            this.cards.forEach((card, index) => {
                card.style.display = index === this.currentIndex ? 'flex' : 'none';
            });
        }
    }
    
    updateButtons() {
        const isDesktop = window.innerWidth > 768;
        
        if (this.prevBtn) {
            if (isDesktop && this.cards.length <= 2) {
                this.prevBtn.style.display = 'none';
            } else {
                this.prevBtn.style.display = 'flex';
                this.prevBtn.disabled = this.currentIndex === 0;
            }
        }
        
        if (this.nextBtn) {
            if (isDesktop && this.cards.length <= 2) {
                this.nextBtn.style.display = 'none';
            } else {
                this.nextBtn.style.display = 'flex';
                this.nextBtn.disabled = false;
            }
        }
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
    new ServiceExpander();
    new TestimonialsNavigation();
    new ContactForm();
    new SmoothScroll();
});
