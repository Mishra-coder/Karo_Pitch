document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Simple Implementation)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // For a complete mobile menu, we'd toggle a class to show/hide these
            // Since this is a demo, we will just alert or toggle a simple active state
            const isHidden = window.getComputedStyle(navLinks).display === 'none';
            if (isHidden) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 5, 5, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.backdropFilter = 'blur(10px)';

                navActions.style.display = 'flex';
                navActions.style.flexDirection = 'column';
                navActions.style.position = 'absolute';
                navActions.style.top = 'calc(100% + ' + navLinks.offsetHeight + 'px)';
                navActions.style.left = '0';
                navActions.style.width = '100%';
                navActions.style.background = 'rgba(5, 5, 5, 0.95)';
                navActions.style.padding = '20px';
            } else {
                navLinks.style.display = 'none';
                navActions.style.display = 'none';
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only apply to simple hash links
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();

                // Hide mobile menu if open
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                    navActions.style.display = 'none';
                }

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for Scroll Animations (Fade In)
    const fadeElements = document.querySelectorAll('.about-card, .step-card, .category-item, .startup-card');

    // Initial hidden state
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });
});
