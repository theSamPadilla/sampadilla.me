document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const headerContent = document.querySelector('.header-content');
    const heroContent = document.querySelector('.hero-content');
    const heroSection = document.querySelector('.hero');
    const portrait = document.getElementById('portrait');
    const name = document.getElementById('name');
    const mainNav = document.getElementById('main-nav');
    const burgerMenu = document.querySelector('.burger-menu');
    const navList = document.querySelector('#main-nav ul');
    
    const isThemesPage = document.body.classList.contains('themes-page');
    let isFixed = false;
    let lastScrollPosition = 0;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        if (isThemesPage) {
            // Themes page scroll behavior
            if (scrollPosition > 50) {
                header.classList.add('header-fixed');
                if (scrollPosition > lastScrollPosition) {
                    header.classList.add('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }
            } else {
                header.classList.remove('header-fixed');
                header.classList.remove('header-hidden');
            }
        } else {
            // Main page scroll behavior
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
        }

        lastScrollPosition = scrollPosition;
    });

    // Burger menu functionality
    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            navList.classList.toggle('show');
        });
    }
});

function adjustScrollPosition() {
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        setTimeout(() => {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 0);
      }
    }
  }

// Call the function when the page loads
window.addEventListener('load', adjustScrollPosition);

// Also call the function when the hash changes (for single-page navigation)
window.addEventListener('hashchange', adjustScrollPosition);

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          // Update URL without triggering a page reload
          history.pushState(null, null, targetId);
        }
      } else {
        // For external links (like themes.html)
        window.location.href = targetId;
      }
    });
  });