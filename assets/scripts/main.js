const hTxt = "Hello!";
const dTxt = "I'm Aryngazy — a passionate frontend developer who loves building clean, modern, and user-friendly web interfaces. I enjoy writing clean code, experimenting with animations, and turning ideas into real projects. I'm always learning new technologies and pushing myself to make every website I build look professional and work flawlessly.";

const gSpan = document.getElementById("about-greeting");
const dEl = document.getElementById("about-description");

let gIdx = 0;
let dIdx = 0;
let tStr = false;

function tG() {
    if (gSpan && gIdx < hTxt.length) {
        gSpan.textContent = hTxt.substring(0, gIdx + 1);
        gIdx++;
        setTimeout(tG, 100);
    } else if (gSpan) {
        gSpan.classList.remove("cursor");
    }
}

function tD() {
    if (dEl && dIdx < dTxt.length) {
        dEl.textContent = dTxt.substring(0, dIdx + 1);
        dIdx++;
        setTimeout(tD, 30);
    } else if (dEl) {
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
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }


    const observerOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.profile__card, .profile__bio').forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });
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