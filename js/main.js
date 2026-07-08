/* ============================================================
   AL GHAITH ADVERTISING — MAIN JAVASCRIPT
   ============================================================ */

'use strict';

/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
    }, 1900);
});

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('mainNav');
function handleNavScroll() {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', highlightNav, { passive: true });

/* ===== SMOOTH SCROLL + CLOSE MOBILE MENU ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        // Close Bootstrap mobile nav
        const bsCollapse = document.getElementById('navbarNav');
        if (bsCollapse && bsCollapse.classList.contains('show')) {
            const toggler = document.querySelector('.navbar-toggler');
            if (toggler) toggler.click();
        }
    });
});

/* ===== AOS INIT ===== */
AOS.init({
    duration: 750,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic',
});

/* ===== STATS COUNTER ANIMATION ===== */
function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    }
    requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) statsObserver.observe(statsSection);

/* ===== PORTFOLIO GALLERY ===== */
const allImages = [
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.28.49 PM.jpeg",       cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.28.49 PM (1).jpeg",   cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.28.49 PM (2).jpeg",   cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.17 PM.jpeg",       cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.22 PM.jpeg",       cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.31 PM.jpeg",       cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.42 PM.jpeg",       cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.45 PM.jpeg",       cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.47 PM.jpeg",       cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.50 PM.jpeg",       cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.50 PM (1).jpeg",   cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.50 PM (2).jpeg",   cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.51 PM.jpeg",       cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.51 PM (1).jpeg",   cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.51 PM (2).jpeg",   cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.52 PM.jpeg",       cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.52 PM (1).jpeg",   cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.53 PM.jpeg",       cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.53 PM (1).jpeg",   cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.57 PM.jpeg",       cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.35.59 PM.jpeg",       cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.36.02 PM.jpeg",       cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.36.09 PM.jpeg",       cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.36.12 PM.jpeg",       cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.36.14 PM.jpeg",       cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.36.16 PM.jpeg",       cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.36.19 PM.jpeg",       cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 3.36.20 PM.jpeg",       cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.26 PM.jpeg",       cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.27 PM.jpeg",       cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.27 PM (1).jpeg",   cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.27 PM (2).jpeg",   cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.27 PM (3).jpeg",   cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.37 PM.jpeg",       cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.37 PM (1).jpeg",   cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.38 PM.jpeg",       cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.38 PM (1).jpeg",   cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.39 PM.jpeg",       cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.39 PM (1).jpeg",   cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.42 PM.jpeg",       cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.47 PM.jpeg",       cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.47 PM (1).jpeg",   cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.48 PM.jpeg",       cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.48 PM (1).jpeg",   cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.48 PM (2).jpeg",   cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.49 PM.jpeg",       cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.49 PM (1).jpeg",   cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.49 PM (2).jpeg",   cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.50 PM.jpeg",       cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.50 PM (1).jpeg",   cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.50 PM (2).jpeg",   cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.51 PM.jpeg",       cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.51 PM (1).jpeg",   cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.52 PM.jpeg",       cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.52 PM (1).jpeg",   cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.52 PM (2).jpeg",   cat: "exhibition" },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.53 PM.jpeg",       cat: "frosted"    },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.53 PM (1).jpeg",   cat: "branding"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.53 PM (2).jpeg",   cat: "printing"   },
    { src: "Photos and videos/WhatsApp Image 2026-06-30 at 4.31.54 PM.jpeg",       cat: "exhibition" },
];

let visibleCount  = 12;
let currentFilter = 'all';
let lightbox      = null;

function getFiltered() {
    return currentFilter === 'all'
        ? allImages
        : allImages.filter(img => img.cat === currentFilter);
}

function renderGallery() {
    const grid = document.getElementById('portfolioGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!grid) return;

    grid.innerHTML = '';
    const filtered = getFiltered();
    const toShow   = filtered.slice(0, visibleCount);

    toShow.forEach(img => {
        const a = document.createElement('a');
        a.href      = img.src;
        a.className = 'portfolio-item glightbox';
        a.setAttribute('data-gallery', 'portfolio');
        a.setAttribute('data-type', 'image');
        a.innerHTML = `
            <img src="${img.src}" alt="Al Ghaith Advertising Work" loading="lazy">
            <div class="portfolio-overlay"><i class="fas fa-expand"></i></div>
        `;
        grid.appendChild(a);
    });

    // Re-init lightbox
    if (lightbox) lightbox.destroy();
    lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        openEffect: 'fade',
        closeEffect: 'fade',
    });

    // Load more visibility
    if (loadMoreBtn) {
        loadMoreBtn.style.display = filtered.length > visibleCount ? 'inline-flex' : 'none';
    }
}

/* Filter buttons */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        visibleCount  = 12;
        renderGallery();
    });
});

/* Load more */
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        visibleCount += 8;
        renderGallery();
        // scroll to newly loaded items
        setTimeout(() => {
            const items = document.querySelectorAll('.portfolio-item');
            if (items.length > 0) {
                items[items.length - 8]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    });
}

renderGallery();

/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 450) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        const inputs = contactForm.querySelectorAll('[required]');
        let valid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#CC0000';
                valid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        if (!valid) return;

        // Success state
        const original = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> Message Sent Successfully!';
        submitBtn.style.background = '#25D366';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = original;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3500);
    });

    // Remove red border on input
    contactForm.querySelectorAll('[required]').forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
}

/* ===== FOOTER YEAR ===== */
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();
