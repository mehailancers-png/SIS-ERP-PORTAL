/**
 * SIS ERP Portal v1.0 - Core Script (script.js)
 * School: Seervi International School, Jaitaran, Beawar, Rajasthan
 * Architecture: Vanilla JavaScript (Production-Ready)
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. DOM ELEMENTS REGISTRY
    // ==========================================
    const elements = {
        header: document.getElementById('mainHeader'),
        sidebar: document.getElementById('navSidebar'),
        sidebarToggle: document.getElementById('sidebarToggle'),
        sidebarClose: document.getElementById('sidebarClose'),
        sidebarOverlay: document.getElementById('sidebarOverlay'),
        backToTop: document.getElementById('backToTop'),
        rippleButtons: document.querySelectorAll('.ripple'),
        revealElements: document.querySelectorAll('.scroll-reveal')
    };

    // ==========================================
    // 2. HEADER SCROLL ARCHITECTURE
    // ==========================================
    const initHeaderScroll = () => {
        if (!elements.header) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                elements.header.classList.add('header-solid');
            } else {
                elements.header.classList.remove('header-solid');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check on load
    };

    // ==========================================
    // 3. RESPONSIVE SIDEBAR ENGINE (OVERLAY & ESC)
    // ==========================================
    const initSidebarEngine = () => {
        if (!elements.sidebar || !elements.sidebarToggle) return;

        const openSidebar = () => {
            elements.sidebar.classList.add('sidebar-open');
            if (elements.sidebarOverlay) elements.sidebarOverlay.classList.add('overlay-active');
            elements.sidebar.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closeSidebar = () => {
            elements.sidebar.classList.remove('sidebar-open');
            if (elements.sidebarOverlay) elements.sidebarOverlay.classList.remove('overlay-active');
            elements.sidebar.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        // Event Listeners
        elements.sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            openSidebar();
        });

        if (elements.sidebarClose) elements.sidebarClose.addEventListener('click', closeSidebar);
        if (elements.sidebarOverlay) elements.sidebarOverlay.addEventListener('click', closeSidebar);

        // Escape Key Binding
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.sidebar.classList.contains('sidebar-open')) {
                closeSidebar();
            }
        });
    };

    // ==========================================
    // 4. ACTIVE MENU STATE ENGINE
    // ==========================================
    const initActiveMenuState = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPath) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    // ==========================================
    // 5. BACK TO TOP CONTROL UTILITY
    // ==========================================
    const initBackToTop = () => {
        if (!elements.backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                elements.backToTop.classList.add('back-to-top-visible');
            } else {
                elements.backToTop.classList.remove('back-to-top-visible');
            }
        }, { passive: true });

        elements.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // ==========================================
    // 6. PERFORMANCE RIPPLE EFFECT EMULATOR
    // ==========================================
    const initRippleEffects = () => {
        elements.rippleButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple-effect');

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    };

    // ==========================================
    // 7. HIGH-PERFORMANCE SCROLL ANIMATIONS
    // ==========================================
    const initScrollAnimations = () => {
        if ('IntersectionObserver' in window && elements.revealElements.length > 0) {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target); // Optimize performance by unobserving
                    }
                });
            }, observerOptions);

            elements.revealElements.forEach(element => revealObserver.observe(element));
        } else {
            // Fallback strategy for older structural legacy platforms
            elements.revealElements.forEach(element => element.classList.add('revealed'));
        }
    };

    // ==========================================
    // 8. INITIALIZE PIPELINES
    // ==========================================
    initHeaderScroll();
    initSidebarEngine();
    initActiveMenuState();
    initBackToTop();
    initRippleEffects();
    initScrollAnimations();
});

