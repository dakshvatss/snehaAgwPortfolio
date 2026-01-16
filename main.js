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
                    targetContent.classList.toggle('expanded');
                    item.classList.toggle('expanded');
                }
            });
        });
    }
}

// Project Accordion Functionality
class ProjectAccordion {
    constructor() {
        this.projectItems = document.querySelectorAll('.project-item');
        this.currentExpanded = null;
        
        if (this.projectItems.length === 0) return;
        
        this.init();
    }
    
    init() {
        this.projectItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.toggleProject(item, index);
            });
        });
    }
    
    toggleProject(item, index) {
        const isExpanding = !item.classList.contains('expanded');
        
        // Close any currently expanded project
        if (this.currentExpanded && this.currentExpanded !== item) {
            this.currentExpanded.classList.remove('expanded');
        }
        
        if (isExpanding) {
            item.classList.add('expanded');
            this.currentExpanded = item;
        } else {
            item.classList.remove('expanded');
            this.currentExpanded = null;
        }
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
        // Show initial cards immediately
        this.showCard(this.currentIndex);
        this.updateButtons();
        
        this.prevBtn?.addEventListener('click', () => {
            this.stopAutoScroll();
            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else {
                this.currentIndex = this.cards.length - 1;
            }
            this.showCard(this.currentIndex);
            this.updateButtons();
            this.startAutoScroll();
        });
        
        this.nextBtn?.addEventListener('click', () => {
            this.stopAutoScroll();
            if (this.currentIndex < this.cards.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
            this.showCard(this.currentIndex);
            this.updateButtons();
            this.startAutoScroll();
        });
        
        window.addEventListener('resize', () => {
            this.showCard(this.currentIndex);
            this.updateButtons();
        });
        
        this.startAutoScroll();
    }
    
    showCard(index) {
        const isDesktop = window.innerWidth > 768;
        
        // Remove active class from all cards
        this.cards.forEach(card => card.classList.remove('active'));
        
        if (isDesktop) {
            // Show two cards on desktop
            if (index < this.cards.length - 1) {
                this.cards[index].classList.add('active');
                this.cards[index + 1].classList.add('active');
            } else {
                // If at last card, show last two
                this.cards[index - 1].classList.add('active');
                this.cards[index].classList.add('active');
            }
        } else {
            // Show one card on mobile
            this.cards[index].classList.add('active');
        }
    }
    
    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            if (this.currentIndex < this.cards.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
            this.showCard(this.currentIndex);
            this.updateButtons();
        }, 5000);
    }
    
    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
    }
    
    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = false;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = false;
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
        this.navLinks = document.querySelectorAll('nav a[href^="#"], .nav-button[href^="#"]');
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
    new ProjectAccordion();
    new TestimonialsNavigation();
    new ContactForm();
    new SmoothScroll();
});