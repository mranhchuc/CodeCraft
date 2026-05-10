// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ===== TYPING ANIMATION =====
const codeLines = [
    '<span class="cm">// Dự án của bạn</span>',
    '<span class="kw">const</span> project <span class="op">=</span> {',
    '  name<span class="op">:</span> <span class="str">"Ý tưởng của bạn"</span><span class="op">,</span>',
    '  budget<span class="op">:</span> <span class="str">"Chỉ từ 500K"</span><span class="op">,</span>',
    '  tech<span class="op">:</span> [<span class="str">"Web"</span><span class="op">,</span> <span class="str">"App"</span><span class="op">,</span> <span class="str">"AI"</span>]<span class="op">,</span>',
    '  warranty<span class="op">:</span> <span class="kw">true</span><span class="op">,</span>',
    '  quality<span class="op">:</span> <span class="str">"Premium"</span>',
    '}<span class="op">;</span>',
    '',
    '<span class="kw">async function</span> <span class="fn">buildDream</span>() {',
    '  <span class="kw">const</span> result <span class="op">=</span> <span class="kw">await</span> <span class="fn">code</span>(project)<span class="op">;</span>',
    '  <span class="kw">return</span> result<span class="op">;</span> <span class="cm">// 🚀</span>',
    '}',
];

const codeEl = document.getElementById('typingCode');
let lineIdx = 0;
let charIdx = 0;
let currentText = '';

function getPlainText(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

function typeCode() {
    if (lineIdx >= codeLines.length) return;
    const plainLine = getPlainText(codeLines[lineIdx]);
    if (charIdx <= plainLine.length) {
        const displayLines = [];
        for (let i = 0; i < lineIdx; i++) displayLines.push(codeLines[i]);
        const partial = plainLine.substring(0, charIdx);
        displayLines.push(partial + '<span class="cursor">|</span>');
        codeEl.innerHTML = displayLines.join('\n');
        charIdx++;
        setTimeout(typeCode, 30 + Math.random() * 40);
    } else {
        lineIdx++;
        charIdx = 0;
        setTimeout(typeCode, 150);
    }
}

// Add cursor blink style
const style = document.createElement('style');
style.textContent = '.cursor{color:#6366f1;animation:blink 1s infinite}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}';
document.head.appendChild(style);

setTimeout(typeCode, 800);

// ===== COUNTER ANIMATION =====
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, 40);
    });
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card,.process-step,.price-card').forEach(el => {
    observer.observe(el);
});

// Counter observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
