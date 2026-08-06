const gSpan = document.getElementById("about-greeting");
const dEl = document.getElementById("about-description");

let gIdx = 0;
let dIdx = 0;
let tStr = false;

function tG() {
    const hTxt = window.gLngTxt("about.greet", window.curLang || "en");
    if (gSpan && gIdx < hTxt.length) {
        gSpan.textContent = hTxt.substring(0, gIdx + 1);
        gIdx++;
        setTimeout(tG, 100);
    } else if (gSpan) {
        gSpan.classList.remove("cursor");
        gSpan.dataset.typed = "1";
    }
}

function tD() {
    const dTxt = window.gLngTxt("about.desc", window.curLang || "en");
    if (dEl && dIdx < dTxt.length) {
        dEl.textContent = dTxt.substring(0, dIdx + 1);
        dIdx++;
        setTimeout(tD, 30);
    } else if (dEl) {
        dEl.dataset.typed = "1";
        setTimeout(() => dEl.classList.remove("cursor"), 2000);
    }
}

const aObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !tStr) {
            tStr = true;
            dEl.classList.add("cursor");
            tD();
            aObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const sObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.soft-skill__fill');
            fills.forEach((fill, idx) => {
                fill.style.transitionDelay = `${idx * 0.2}s`;
                fill.style.width = fill.getAttribute('data-target') + '%';
            });
            sObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    if (gSpan) {
        gSpan.classList.add("cursor");
        tG();
    }
    if (dEl) aObs.observe(dEl);
    
    const sSect = document.querySelector('.soft__skills');
    if (sSect) sObs.observe(sSect);

    const track = document.getElementById('works-track');
    const fill = document.getElementById('progress-fill');
    const next = document.getElementById('slide-next');
    const prev = document.getElementById('slide-prev');
    const activeNum = document.getElementById('active-num');
    
    if (track && next && prev) {
        const getStep = () => {
            const firstCard = track.querySelector('.work-card');
            return firstCard ? firstCard.clientWidth + parseFloat(window.getComputedStyle(track).gap) : window.innerWidth * 0.4;
        };

        next.onclick = () => track.scrollLeft += getStep();
        prev.onclick = () => track.scrollLeft -= getStep();

        track.addEventListener('scroll', () => {
            const max = track.scrollWidth - track.clientWidth;
            const percent = max > 0 ? (track.scrollLeft / max) * 100 : 0;
            if (fill) fill.style.width = percent + '%';

            const current = Math.round((track.scrollLeft / getStep()) + 1);
            if (activeNum && current > 0) activeNum.textContent = '0' + current;
        });
    }


    const themeBtn = document.getElementById('theme-switch');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            try {
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            } catch (error) {
                document.body.dataset.theme = isDark ? 'dark' : 'light';
            }
            themeBtn.setAttribute('aria-pressed', String(isDark));
        });
    }

    let savedTheme = '';
    try {
        savedTheme = localStorage.getItem('theme') || '';
    } catch (error) {
        savedTheme = document.body.dataset.theme || '';
    }

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    if (themeBtn) {
        themeBtn.setAttribute('aria-pressed', String(document.body.classList.contains('dark-mode')));
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = new FormData(contactForm);
            const name = data.get('name') || '';
            const email = data.get('email') || '';
            const message = data.get('message') || '';
            const subject = `Portfolio enquiry from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
            window.location.href = `mailto:maratulyaryngazy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }


    const observerOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.profile__card, .profile__bio, .about__content, .skills__header, .skill-card, .soft__skills, .works__header, .work-card, .contact__info, .contact__form'
    ).forEach((el, idx) => {
        el.classList.add('reveal-hidden');
        el.style.transitionDelay = `${(idx % 6) * 0.08}s`;
        revealObserver.observe(el);
    });

    const navLinks = document.querySelectorAll('[data-nav-link]');
    const sections = document.querySelectorAll('main.main > div[id], main.main > section[id]');

    if (navLinks.length && sections.length) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
                    });
                }
            });
        }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

        sections.forEach(section => navObserver.observe(section));
    }
});


window.addEventListener('scroll', () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    const scrollBar = document.getElementById("scrollBar");
    if (scrollBar) scrollBar.style.width = scrolled + "%";

    const header = document.querySelector('.header');
    if (header) {
        if (winScroll > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }
});
