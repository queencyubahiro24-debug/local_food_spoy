/* script.js for LumaLens project */

/* ---------- Dark mode toggle ---------- */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  // initialize from localStorage
  const saved = localStorage.getItem('luma-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  themeToggle.textContent = saved === 'dark' ? '☀️ Light' : '🌙 Dark';

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', current);
    localStorage.setItem('luma-theme', current);
    themeToggle.textContent = current === 'dark' ? '☀️ Light' : '🌙 Dark';
  });
}

/* ---------- Simple image carousel (used on homepage) ---------- */
class Carousel {
  constructor(containerId, interval = 4000) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.slides = Array.from(this.container.querySelectorAll('.slide'));
    this.index = 0;
    this.interval = interval;
    this.show(this.index);
    this.play();
    // controls
    const prev = this.container.querySelector('.prev');
    const next = this.container.querySelector('.next');
    if (prev) prev.addEventListener('click', () => this.prev());
    if (next) next.addEventListener('click', () => this.next());
  }
  show(i){
    this.slides.forEach((s, idx) => {
      s.style.display = idx === i ? 'block' : 'none';
    });
  }
  next(){
    this.index = (this.index + 1) % this.slides.length;
    this.show(this.index);
  }
  prev(){
    this.index = (this.index - 1 + this.slides.length) % this.slides.length;
    this.show(this.index);
  }
  play(){
    this.timer = setInterval(()=> this.next(), this.interval);
    this.container.addEventListener('mouseenter', ()=> clearInterval(this.timer));
    this.container.addEventListener('mouseleave', ()=> this.play());
  }
}
document.addEventListener('DOMContentLoaded', ()=>{
  new Carousel('hero-carousel', 3500);
});

/* ---------- Contact form validation ---------- */
const contactForm = document.getElementById('contact-form');
if (contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();
    if (!name || !email || !message){
      alert('Please fill name, email and message before submitting.');
      return;
    }
    // simple email check
    if (!/^\S+@\S+\.\S+$/.test(email)){
      alert('Please enter a valid email address.');
      return;
    }
    // success - show a friendly confirmation (in real project you'd send to server)
    alert('Thanks ' + name + '! Your message has been recorded. We will contact you soon.');
    contactForm.reset();
  });
}

/* ---------- Product filter / search (Products page) ---------- */
const searchEl = document.getElementById('product-search');
if (searchEl){
  searchEl.addEventListener('input', (ev)=>{
    const q = ev.target.value.toLowerCase();
    const items = document.querySelectorAll('.product-card');
    items.forEach(card=>{
      const title = card.querySelector('.product-title').textContent.toLowerCase();
      const desc = card.querySelector('.product-desc').textContent.toLowerCase();
      card.style.display = title.includes(q) || desc.includes(q) ? 'block' : 'none';
    });
  });
}
