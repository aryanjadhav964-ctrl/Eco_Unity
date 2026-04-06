/**
 * Eco Unity Platform - Main JavaScript Application
 */

const App = {
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderActivities();
        this.renderPhotos();

        // Start simulated real-time notifications
        setTimeout(() => this.simulateNotifications(), 3000);

        // Check for intersection scroll animations
        this.initScrollAnimations();
    },

    cacheDOM() {
        this.navbar = document.getElementById('navbar');
        this.menuToggle = document.getElementById('menuToggle');
        this.navLinks = document.querySelector('.nav-links');

        // Auth Modal
        this.btnLogin = document.getElementById('btnLogin');
        this.btnRegister = document.getElementById('btnRegister');
        this.authModalOverlay = document.getElementById('authModalOverlay');
        this.closeAuthModal = document.getElementById('closeAuthModal');
        this.authTabs = document.querySelectorAll('.auth-tab');
        this.authForms = document.querySelectorAll('.auth-form');

        // Containers
        this.activitiesGrid = document.getElementById('activitiesGrid');
        this.photoGrid = document.getElementById('photoGrid');
        this.toastContainer = document.getElementById('toast-container');
        this.statNumbers = document.querySelectorAll('.stat-number');

        // Forms
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.feedbackForm = document.getElementById('feedbackForm');
    },

    bindEvents() {
        // Scroll Event
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                this.navLinks.classList.toggle('active');
            });
        }

        // Auth Modals
        if (this.btnLogin) {
            this.btnLogin.addEventListener('click', () => this.openAuthModal('login'));
        }
        if (this.btnRegister) {
            this.btnRegister.addEventListener('click', () => this.openAuthModal('register'));
        }
        if (this.closeAuthModal) {
            this.closeAuthModal.addEventListener('click', () => this.closeModal());
        }

        // Close modal on outside click
        if (this.authModalOverlay) {
            this.authModalOverlay.addEventListener('click', (e) => {
                if (e.target === this.authModalOverlay) {
                    this.closeModal();
                }
            });
        }

        // Modal Tabs switching
        this.authTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetType = e.target.dataset.tab;
                this.switchAuthTab(targetType);
            });
        });

        // Forms Prevent Default for simulation
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.closeModal();
                this.showToast('Success!', 'Logged in successfully. Welcome back!', 'success', 'fa-check-circle');
            });
        }
        if (this.registerForm) {
            this.registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.closeModal();
                this.switchAuthTab('login');
                this.showToast('Registration Complete!', 'Please login with your new credentials.', 'success', 'fa-check-circle');
            });
        }
        if (this.feedbackForm) {
            this.feedbackForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.feedbackForm.reset();
                this.showToast('Feedback Received', 'Thank you! Your feedback helps us improve.', 'success', 'fa-heart');
            });
        }
    },

    openAuthModal(tabType) {
        this.authModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.switchAuthTab(tabType);
    },

    closeModal() {
        this.authModalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    },

    switchAuthTab(tabType) {
        // Update Tabs
        this.authTabs.forEach(t => t.classList.remove('active'));
        document.querySelector(`.auth-tab[data-tab="${tabType}"]`).classList.add('active');

        // Update Forms
        this.authForms.forEach(f => f.classList.remove('active-form'));
        document.getElementById(`${tabType}Form`).classList.add('active-form');
    },

    renderActivities() {
        const activities = [
            {
                id: 1,
                title: 'Mega Tree Plantation',
                type: 'Tree Plantation',
                date: 'March 12, 2026',
                time: '08:00 AM',
                location: 'Sanjay Gandhi National Park Periphery',
                img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop',
                desc: 'Join us for our monthly mass planting drive aimed at restoring local green cover. Bring water and enthusiasm!'
            },
            {
                id: 2,
                title: 'E-Waste Recycling Drive',
                type: 'Recycling',
                date: 'April 15, 2026',
                time: '10:00 AM - 4:00 PM',
                location: 'MBMC Ground, Bhayandar West',
                img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop',
                desc: 'Dispose of your old electronics safely. Drop-off centers established across the ward to collect batteries and appliances.'
            },
            {
                id: 3,
                title: 'Beach Cleanliness Marathon',
                type: 'Cleanliness',
                date: 'April 22, 2026',
                time: '07:00 AM',
                location: 'Uttan Beach',
                img: 'https://auslankanews.com.au/wp-content/uploads/2024/03/beach-clean-.png',
                desc: 'A community effort to clear plastic waste from Uttan Beach. Gloves and collection bags will be provided.'
            },
            {
                id: 4,
                title: 'Solar Panel Workshop',
                type: 'Energy Conservation',
                date: 'May 12, 2026',
                time: '11:00 AM',
                location: 'Community Hall, Mira Road',
                img: 'https://cdn.manilastandard.net/wp-content/uploads/2025/02/pdo-solar-panels.jpeg',
                desc: 'Learn about transitioning your society to solar power. Subsidy guidance and installation vendor interaction.'
            },
            {
                id: 5,
                title: 'Zero Waste Workshop',
                type: 'Recycling & Lifestyle',
                date: 'May 20, 2026',
                time: '04:00 PM',
                location: 'Bandra',
                img: 'https://tse1.mm.bing.net/th/id/OIP.e2Awby5RylmPZHaKap9hqgHaE7?pid=Api&P=0&h=180',
                desc: "A Zero Waste Workshop helps you learn how to reduce daily waste, reuse materials, and live a more sustainable lifestyle. This workshop focuses on simple, actionable steps to minimize waste in daily life. Whether you're a beginner or already eco-conscious, this session will help you build better habits."
            },
            {
                id: 6,
                title: 'Mangrove Clean-Up Drive',
                type: 'Cleanliness',
                date: 'June 5, 2026',
                time: '08:00 AM',
                location: 'Sarsole Jetty, Navi Mumbai',
                img: 'https://tse3.mm.bing.net/th/id/OIP.FG5Z4EkunzCJwYU34C0q0gHaFj?pid=Api&P=0&h=180https://www.undp.org/sites/g/files/zskgke326/files/styles/banner_image_desktop/public/migration/gh/UNDP_Ghana_Beach_Clean_Up--1.jpg?h=92229be0&itok=S8sp5fyqhttps://images.unsplash.com/photo-1621451537084-482c73073e0f?w=600&auto=format&fit=crop',
                desc: 'Join our local community initiative to clean the vital mangrove ecosystems along Navi Mumbai’s Sarsole jetty. Equipment provided.'
            }
        ];

        if (!this.activitiesGrid) return;

        this.activitiesGrid.innerHTML = activities.map(act => `
            <div class="activity-card glass-panel">
                <div class="activity-tag">${act.type}</div>
                <div class="activity-img-wrapper">
                    <img src="${act.img}" alt="${act.title}">
                </div>
                <div class="activity-content">
                    <h3>${act.title}</h3>
                    <div class="activity-meta">
                        <span><i class="fa-solid fa-calendar"></i> ${act.date}</span>
                        <span><i class="fa-solid fa-clock"></i> ${act.time}</span>
                    </div>
                    <p>${act.desc}</p>
                    <div class="activity-meta" style="border-top:none; padding-top:0;">
                        <span><i class="fa-solid fa-location-dot"></i> ${act.location}</span>
                    </div>
                    <button class="btn btn-primary w-100" onclick="App.openAuthModal('register')">Register Now</button>
                </div>
            </div>
        `).join('');
    },

    renderPhotos() {
        if (!this.photoGrid) return;
        // Mock images for dashboard grid
        const imgs = [
            'https://tse2.mm.bing.net/th/id/OIP._aedvUhEZs6djeE7Ht9gqgHaEJ?pid=Api&P=0&h=180',
            'https://mymurrysville.com/wp-content/uploads/2018/02/E-Waste-Recycling-CROP.jpg',
            'https://gumlet.assettype.com/freepressjournal/2022-09/e23be97a-4cb5-49ba-b7d6-61f25e2376a8/MangroveCleanup_1.jpeg',
            'https://static.toiimg.com/photo/imgsize-261964,msid-124532215/124532215.jpg',
            'https://gumlet.assettype.com/freepressjournal/2022-07/3680ed18-3ae8-409e-a982-0c58c3c6da35/IMG_20220718_WA0034.jpg'
        ];

        this.photoGrid.innerHTML = imgs.map(img => `
            <div class="photo-item">
                <img src="${img}" alt="Community Impact">
            </div>
        `).join('');
    },

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('stat-number') && !entry.target.dataset.animated) {
                        this.animateCounter(entry.target);
                        entry.target.dataset.animated = 'true';
                    }
                }
            });
        }, { threshold: 0.5 });

        this.statNumbers.forEach(stat => observer.observe(stat));
    },

    animateCounter(element) {
        const target = +element.getAttribute('data-target');
        const duration = 2000;
        const fps = 60;
        const totalFrames = (duration / 1000) * fps;
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3))); // ease out cubic

            element.innerText = currentCount.toLocaleString();

            if (frame === totalFrames) {
                clearInterval(counter);
                element.innerText = target.toLocaleString();
            }
        }, 1000 / fps);
    },

    showToast(title, message, type = 'success', icon = 'fa-bell') {
        const toast = document.createElement('div');
        toast.className = `toast glass-panel ${type}`;
        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;

        this.toastContainer.appendChild(toast);

        // Remove toast after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutX 0.4s ease forwards';
            setTimeout(() => toast.remove(), 400);
        }, 5000);
    },

    simulateNotifications() {
        const notifications = [
            { title: 'New Event Added', msg: 'Beach cleanup drive this Sunday!', type: 'info', icon: 'fa-info-circle' },
            { title: 'Milestone Reached', msg: 'We just crossed 15,000 trees planted.', type: 'success', icon: 'fa-leaf' },
            { title: 'Air Quality Alert', msg: 'AQI is moderately high in Mira Road.', type: 'warning', icon: 'fa-triangle-exclamation' }
        ];

        let index = 0;

        setInterval(() => {
            if (index < notifications.length) {
                const n = notifications[index];
                this.showToast(n.title, n.msg, n.type, n.icon);
                index++;
            }
        }, 15000); // Show a mock notification every 15s
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
