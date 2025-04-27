/**
 * AleaCyber Landing Page JavaScript
 * Main JavaScript file for the landing page functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    function toggleNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', toggleNavbarBackground);
    toggleNavbarBackground(); // Initial check
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
    
    // Counter animation
    const counterElements = document.querySelectorAll('.counter-value');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // Animation duration in milliseconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.round(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTopButton);
    toggleBackToTopButton(); // Initial check
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('is-invalid');
                }
            }
            
            if (isValid) {
                // Form is valid, you would typically send the data to a server here
                // For demo purposes, we'll just show a success message
                const formElements = contactForm.elements;
                for (let i = 0; i < formElements.length; i++) {
                    if (formElements[i].type !== 'submit') {
                        formElements[i].value = '';
                    }
                }
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                contactForm.appendChild(successMessage);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        // Remove validation styling on input
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                return;
            }
            
            // Form is valid, you would typically send the data to a server here
            // For demo purposes, we'll just show a success message
            emailInput.value = '';
            
            // Show success message
            const formGroup = emailInput.closest('.input-group');
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Thank you for subscribing to our newsletter!';
            formGroup.parentNode.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Mobile menu toggle behavior
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Testimonial slider (if using a carousel)
    // If you want to implement a carousel, you can use Bootstrap's carousel or a library like Swiper
    
    // Add active class to nav links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
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
    updateActiveNavLink(); // Initial check
    
    // Preloader (optional)
    // If you want to add a preloader, you can uncomment this code
    
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('preloader-hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        });
    }
    
    
    // Animate services on hover
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon i');
            icon.classList.add('animated', 'bounce');
            
            setTimeout(() => {
                icon.classList.remove('animated', 'bounce');
            }, 1000);
        });
    });
    
    // Parallax effect for hero section (optional)
    function parallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    }
    
    // Uncomment if you want to use the parallax effect
    window.addEventListener('scroll', parallaxEffect);
    
    // Typed.js for animated text (optional)
    // If you want to add animated typing effect, you can use Typed.js
    // You would need to include the Typed.js library and uncomment this code
    
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Protect Your Business',
                'Secure Your Data',
                'Defend Against Threats',
                'Stay One Step Ahead'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }
    
    
    // Animate numbers when in viewport
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Initialize tooltips (if using Bootstrap tooltips)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    if (typeof bootstrap !== 'undefined') {
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Handle form input focus effects
    const formControls = document.querySelectorAll('.form-control, .form-select');
    formControls.forEach(control => {
        control.addEventListener('focus', () => {
            control.parentElement.classList.add('focused');
        });
        
        control.addEventListener('blur', () => {
            control.parentElement.classList.remove('focused');
        });
    });
});