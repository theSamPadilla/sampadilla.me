document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const headerContent = document.querySelector('.header-content');
    const heroContent = document.querySelector('.hero-content');
    const heroSection = document.querySelector('.hero');
    const portrait = document.getElementById('portrait');
    const name = document.getElementById('name');
    const mainNav = document.getElementById('main-nav');
    let isFixed = false;
    let lastScrollPosition = 0;

    //Burger menu vars
    const burgerMenu = document.querySelector('.burger-menu');
    const navList = document.querySelector('#main-nav ul');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        if (scrollPosition > 50 && !isFixed) {
            header.classList.add('header-fixed');
            headerContent.innerHTML = `
                <img src="${portrait.src}" alt="${portrait.alt}" class="portrait">
                <h1>${name.textContent}</h1>
            `;
            mainNav.classList.add('show-sidebar');
            isFixed = true;
        } else if (scrollPosition <= 50 && isFixed) {
            header.classList.remove('header-fixed');
            headerContent.innerHTML = '';
            mainNav.classList.remove('show-sidebar');
            isFixed = false;
        }

        // Fade out hero content as user scrolls down
        if (scrollPosition > 0) {
            const opacity = Math.max(1 - scrollPosition / heroBottom, 0);
            heroContent.style.opacity = opacity;
            heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        } else {
            heroContent.style.opacity = 1;
            heroContent.style.transform = 'translateY(0)';
        }

        // Hide sidebar when scrolling up
        if (scrollPosition < lastScrollPosition && isFixed) {
            mainNav.classList.remove('show-sidebar');
        } else if (scrollPosition > lastScrollPosition && isFixed) {
            mainNav.classList.add('show-sidebar');
        }

        lastScrollPosition = scrollPosition;
    });

    // Burger menu functionality
    burgerMenu.addEventListener('click', () => {
        navList.classList.toggle('show');
    });
});