// Load header
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        const header = document.getElementById('header');
        header.innerHTML = data;
        header.classList.add('loaded'); 
        initializeNav(); 
    })
    .catch(error => console.error('Error loading header:', error));

// Load footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        const footer = document.querySelector('footer');
        footer.innerHTML = data;
        footer.classList.add('loaded');
    })
    .catch(error => console.error('Error loading footer:', error));

// Navigation initialization
function initializeNav() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');
    menuBtn.addEventListener('click', () => navUl.classList.toggle('active'));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
            if (navUl.classList.contains('active')) navUl.classList.remove('active');
        });
    });
}

// Scroll effects
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 300);
});

// Animation observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.animate').forEach(el => observer.observe(el));