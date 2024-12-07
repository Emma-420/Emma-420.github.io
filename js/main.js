document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Skills Animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.progress-line span');
        
        const animateSkills = () => {
            skillBars.forEach(skill => {
                const percentage = skill.dataset.percent;
                skill.style.width = percentage + '%';
            });
        };

        // Intersection Observer for skills animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.querySelector('.skills-visualization');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    // Testimonials Slider
    function initTestimonialsSlider() {
        const slider = document.querySelector('.testimonials-slider');
        const slides = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.querySelector('.prev-testimonial');
        const nextBtn = document.querySelector('.next-testimonial');
        
        if (!slider || !slides.length) return;

        let currentSlide = 0;
        const slideWidth = slides[0].offsetWidth;
        
        // Clone first and last slide
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        
        slider.appendChild(firstClone);
        slider.insertBefore(lastClone, slides[0]);
        
        slider.style.transform = `translateX(-${slideWidth}px)`;
        
        function goToSlide(index) {
            slider.style.transition = 'transform 0.5s ease-in-out';
            slider.style.transform = `translateX(-${slideWidth * (index + 1)}px)`;
            currentSlide = index;
        }
        
        function handleSlideChange() {
            if (currentSlide === slides.length) {
                slider.style.transition = 'none';
                currentSlide = 0;
                slider.style.transform = `translateX(-${slideWidth}px)`;
            }
            if (currentSlide === -1) {
                slider.style.transition = 'none';
                currentSlide = slides.length - 1;
                slider.style.transform = `translateX(-${slideWidth * slides.length}px)`;
            }
        }
        
        nextBtn.addEventListener('click', () => {
            if (currentSlide >= slides.length - 1) return;
            goToSlide(currentSlide + 1);
        });
        
        prevBtn.addEventListener('click', () => {
            if (currentSlide <= 0) return;
            goToSlide(currentSlide - 1);
        });
        
        slider.addEventListener('transitionend', handleSlideChange);
        
        // Auto slide
        setInterval(() => {
            if (currentSlide >= slides.length - 1) return;
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    // Social Share Buttons
    function initSocialShare() {
        const shareButtons = document.querySelectorAll('.share-btn');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const url = window.location.href;
                const platform = button.dataset.platform;
                
                let shareUrl;
                switch(platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=Check out Emanuel's professional portfolio!`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }

    // Newsletter Subscription
    function handleSubscribe(event) {
        event.preventDefault();
        
        const form = document.getElementById('subscribeForm');
        const nameInput = document.getElementById('subscribeName');
        const emailInput = document.getElementById('subscribeEmail');
        const interestInput = document.getElementById('subscribeInterest');
        const modal = document.getElementById('subscribeModal');
        
        // Basic validation
        if (!validateForm(nameInput, emailInput, interestInput)) {
            return false;
        }
        
        // Prepare the data
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            interest: interestInput.value
        };
        
        // Here you would typically send this data to your backend
        // For now, we'll just show the success modal
        console.log('Subscription data:', formData);
        
        // Show success modal
        showModal();
        
        // Reset form
        form.reset();
        
        return false;
    }

    function validateForm(nameInput, emailInput, interestInput) {
        let isValid = true;
        
        // Clear previous errors
        clearErrors();
        
        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        }
        
        // Validate email
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate interest
        if (interestInput.value === '') {
            showError(interestInput, 'Please select your primary interest');
            isValid = false;
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.innerText = message;
        
        formGroup.appendChild(error);
    }

    function clearErrors() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
            const error = group.querySelector('.error-message');
            if (error) {
                error.remove();
            }
        });
    }

    function showModal() {
        const modal = document.getElementById('subscribeModal');
        modal.style.display = 'block';
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal when clicking close button
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);
    }

    function closeModal() {
        const modal = document.getElementById('subscribeModal');
        modal.style.display = 'none';
    }

    // Initialize all features when DOM is loaded
    initSkillBars();
    initTestimonialsSlider();
    initSocialShare();

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Newsletter Subscription form submission
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', handleSubscribe);
    }

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
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the form data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', formData);
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Navbar scroll behavior
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scrolling down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scrolling up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});
