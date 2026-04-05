/* ===========================
   장원준 포트폴리오 – script.js
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ── Mobile menu toggle ──
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ── Scroll animations (Intersection Observer) ──
    const animatedElements = document.querySelectorAll('.fade-up-element');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => observer.observe(el));

    // ── Counter animation ──
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                if (target === 0) return;
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        const duration = 2000;
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString();
            }
        }
        requestAnimationFrame(update);
    }

    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ══════════════════════════════════════
    // ── i18n: Korean ↔ English Toggle ──
    // ══════════════════════════════════════
    const translations = {
        en: {
            'logo.text': 'Wonjun Jang',
            'logo.sub': 'Business Support Professional',
            'nav.about': 'About',
            'nav.career': 'Career',
            'nav.strengths': 'Strengths',
            'nav.skills': 'Skills',
            'nav.activities': 'Activities',
            'nav.contact': 'Contact',
            'hero.badge': 'CNU Public Admin · 2+ Years Finance · Business Support · Data-Driven Problem Solver',
            'hero.title': 'Improving organizational efficiency through<br><strong>data-driven problem solving</strong><br>and collaboration.',
            'hero.subtitle': 'With over 2 years of experience in finance and public institutions,<br>I bring expertise in customer management, asset management, and operational support.',
            'hero.cta1': 'About Me',
            'hero.cta2': 'Contact',
            'about.title': 'Business Support Professional,<br><span>Wonjun Jang</span>',
            'about.name': 'Wonjun Jang',
            'about.role': 'CNU Public Administration · Business Support',
            'about.lead': '"With over 2 years of experience in finance and public institutions, I have performed customer management, asset management, and business operations support. I detected a voice phishing attempt early, preventing approximately 21 million won in customer asset damage, and received a commendation from the Daejeon Jungbu Police Station."',
            'about.body1': 'After graduating from Chungbuk Provincial College (GPA 4.08/4.5), I transferred to Chungnam National University and earned a Bachelor\'s degree in Public Administration (GPA 3.74/4.5). Through continuous academic effort and diverse field experience, I have built expertise in administration and business support.',
            'about.body2': 'At Daejeon Happiness Credit Union, I performed financial office work for 1 year and 8 months including customer service, financial product consulting/sales, and fund management. At the Korea Communications Agency, I supported business operations, education program planning, and asset management.',
            'about.stat1': 'Yrs Experience',
            'about.stat2': '0K Won Saved',
            'about.stat3': '% Satisfaction',
            'footer.brand': 'Wonjun Jang',
            'footer.brandDesc': 'A business support professional who improves<br>organizational efficiency through data-driven problem solving.',
            'footer.links': 'Quick Links',
            'footer.email': 'Email: p_oka@naver.com',
            'footer.phone': 'Phone: 010-2320-2193',
            'footer.location': 'Location: Seo-gu, Daejeon',
            'contact.location': 'Seo-gu, Daejeon, South Korea',
            'cta.title': 'I\'m ready to<br>contribute to your team',
            'cta.desc': 'Whether in business support, administration, or customer management,<br>I will contribute with dedication and passion.',
            'cta.email': 'Send Email',
            'cta.phone': 'Call: 010-2320-2193',
            'strengths.title': 'My <span>Core Strengths</span>',
            'strengths.desc': 'Proven competencies from finance and public institution experience.',
            'activities.title': 'Activities & <span>Awards</span>',
            'activities.desc': 'Building practical capabilities through diverse social experiences and internships.',
            'career.title': 'Career <span>History</span>',
            'career.desc': '2 years and 2 months of experience in finance and public institutions',
            'skills.title': '<span>Skills & Certifications</span>',
            'value.personal': 'Who I Am',
            'value.p1': 'A person who <strong>analyzes and solves problems</strong> based on data',
            'value.p2': '<strong>Careful observer</strong> who detects risks proactively',
            'value.p3': 'A person who <strong>improves work efficiency</strong> by introducing new systems',
            'value.p4': 'A person who <strong>collaborates smoothly</strong> with diverse stakeholders',
            'value.company': 'What You Can Expect',
            'value.c1': '<strong>Business support skills</strong> proven in finance and public institutions',
            'value.c2': '<strong>Trust and responsibility</strong> evidenced by police commendation',
            'value.c3': '<strong>Tangible results</strong> through operational process improvement',
            'value.c4': '<strong>Rapid growth potential</strong> through continuous self-development',
            'nav.gallery': 'Gallery',
            'gallery.title': 'Awards & <span>Gallery</span>',
            'gallery.desc': 'View key awards, commendations, and certificates at a glance. Click to enlarge.',
            'qr.title': 'KakaoTalk <span>Open Chat</span>',
            'qr.desc': 'Scan the QR code or click it to connect via KakaoTalk Open Chat.',
        }
    };

    // Store Korean originals
    const koTexts = {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
        koTexts[el.getAttribute('data-i18n')] = el.textContent;
    });
    const koHtmls = {};
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        koHtmls[el.getAttribute('data-i18n-html')] = el.innerHTML;
    });

    let currentLang = 'ko';

    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;

        if (lang === 'en') {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations.en[key]) el.textContent = translations.en[key];
            });
            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                const key = el.getAttribute('data-i18n-html');
                if (translations.en[key]) el.innerHTML = translations.en[key];
            });
        } else {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (koTexts[key]) el.textContent = koTexts[key];
            });
            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                const key = el.getAttribute('data-i18n-html');
                if (koHtmls[key]) el.innerHTML = koHtmls[key];
            });
        }

        const btn = document.getElementById('langToggle');
        if (btn) {
            btn.textContent = lang === 'ko' ? 'EN' : 'KO';
            btn.setAttribute('aria-label', lang === 'ko' ? 'Switch to English' : '한국어로 전환');
        }
    }

    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLanguage(currentLang === 'ko' ? 'en' : 'ko');
        });
    }

    // ══════════════════════════════════════
    // ── Theme: Dark / Light Toggle ──
    // ══════════════════════════════════════
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ══════════════════════════════════════
    // ── Back to Top Button ──
    // ══════════════════════════════════════
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ══════════════════════════════════════
    // ── Active Nav Link Highlighting ──
    // ══════════════════════════════════════
    const allSections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightActiveNav() {
        let current = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightActiveNav);

    // ══════════════════════════════════════
    // ── Staggered Badge Animation ──
    // ══════════════════════════════════════
    const clientGrids = document.querySelectorAll('.client-grid');
    const badgeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const badges = entry.target.querySelectorAll('.client-badge');
                badges.forEach((badge, i) => {
                    setTimeout(() => {
                        badge.classList.add('badge-visible');
                    }, i * 60);
                });
                badgeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    clientGrids.forEach(grid => badgeObserver.observe(grid));

    // ══════════════════════════════════════
    // ── Gallery Lightbox ──
    // ══════════════════════════════════════
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentGalleryIndex = 0;

    function openLightbox(index) {
        currentGalleryIndex = index;
        const item = galleryItems[index];
        const img = item.querySelector('img');
        const label = item.querySelector('.gallery-label');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = label ? label.textContent : '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentGalleryIndex = (currentGalleryIndex + direction + galleryItems.length) % galleryItems.length;
        openLightbox(currentGalleryIndex);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if (lightbox) {
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        });
    }

    // ══════════════════════════════════════
    // ── Hero Parallax (subtle) ──
    // ══════════════════════════════════════
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    function heroParallax() {
        const scrollY = window.scrollY;
        const heroH = window.innerHeight;
        if (scrollY < heroH && heroContent) {
            const ratio = scrollY / heroH;
            heroContent.style.transform = 'translateY(' + (scrollY * 0.2) + 'px)';
            heroContent.style.opacity = 1 - ratio * 0.7;
        }
        if (scrollIndicator) {
            scrollIndicator.style.opacity = 1 - (window.scrollY / 200);
        }
    }
    window.addEventListener('scroll', heroParallax);
});
