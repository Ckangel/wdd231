// scripts/modules/hamburger.js
function handleHamburgerMenu() {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerButton && mainNav) {
        hamburgerButton.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            hamburgerButton.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('open');
                    hamburgerButton.classList.remove('open');
                }
            });
        });
    }
}

export { handleHamburgerMenu };