// Theme (dark / light) toggle and persistence
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('dark-toggle');
  const mobileToggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('nav');

  function applyTheme(theme){
    if(theme==='dark') root.setAttribute('data-theme','dark');
    else root.removeAttribute('data-theme');
    localStorage.setItem('theme',theme);
  }

  const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);

  toggle.addEventListener('click', ()=>{
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Mobile nav
  mobileToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('nav-open');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click', ()=>{
    document.body.classList.remove('nav-open');
  }));

  // Smooth scroll with offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(!href || href==='#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        const headerOffset = document.querySelector('.site-header').offsetHeight + 8;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({top: offsetPosition, behavior: 'smooth'});
      }
    });
  });

  // Simple testimonials carousel
  const slides = document.querySelectorAll('#testimonial-slider .slide');
  let current = 0;
  if(slides.length>1){
    setInterval(()=>{
      slides[current].classList.remove('active');
      current = (current+1) % slides.length;
      slides[current].classList.add('active');
    },4000);
  }

  // Contact form handling (demo only)
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-msg');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const phone = data.get('phone') || '';
    const messageText = data.get('message') || '';
    msg.textContent = 'جاري إعداد رسالة واتساب...';
    const whatsappNumber = '201070626890';
    const message = `اسم: ${name}\nالبريد: ${email}\nالهاتف: ${phone}\nالرسالة: ${messageText}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    msg.textContent = 'تم فتح WhatsApp — اكمل الإرسال من التطبيق.';
    setTimeout(()=>msg.textContent='',5000);
  });
})();
