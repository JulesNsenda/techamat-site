// Load header and footer (unchanged)
fetch('/header.html')
    .then(response => response.text())
    .then(data => {
        const header = document.getElementById('header');
        header.innerHTML = data;
        header.classList.add('loaded');
        initializeNav();
    })
    .catch(error => console.error('Error loading header:', error));

fetch('/footer.html')
    .then(response => response.text())
    .then(data => {
        const footer = document.querySelector('footer');
        footer.innerHTML = data;
        footer.classList.add('loaded');
    })
    .catch(error => console.error('Error loading footer:', error));

// Navigation initialization with cross-page handling
function initializeNav() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');
    menuBtn.addEventListener('click', () => navUl.classList.toggle('active'));

    document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href'); // e.g., "/#contact"
            const [path, hash] = href.split('#'); // ["/", "contact"]
            const currentPath = window.location.pathname;

            if (currentPath === '/' || currentPath === '/index.html') {
                // Same page, just scroll
                document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Navigate to index.html then scroll
                window.location.href = `/${hash ? '#' + hash : ''}`;
            }
            if (navUl.classList.contains('active')) navUl.classList.remove('active');
        });
    });
}

// Scroll effects and observer (unchanged)
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 300);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.animate').forEach(el => observer.observe(el));