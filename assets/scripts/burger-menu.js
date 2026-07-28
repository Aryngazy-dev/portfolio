document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger-toggle');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('mobileNavOverlay');
    const body = document.body;

    if (!burger || !mobileNav || !overlay) return;

    const links = mobileNav.querySelectorAll('.mobile-nav__link');

    const openMenu = () => {
        burger.classList.add('is-active');
        mobileNav.classList.add('is-active');
        overlay.classList.add('is-active');
        burger.setAttribute('aria-expanded', 'true');
        body.classList.add('menu-open');
    };

    const closeMenu = () => {
        burger.classList.remove('is-active');
        mobileNav.classList.remove('is-active');
        overlay.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
    };

    const toggleMenu = () => {
        if (mobileNav.classList.contains('is-active')) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    burger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    links.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
});