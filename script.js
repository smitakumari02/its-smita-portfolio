// smooth scroll and nav highlight
    const links = document.querySelectorAll('.nav-link');
    for(const l of links){
      l.addEventListener('click', e=>{
        e.preventDefault();
        document.querySelector(l.getAttribute('href')).scrollIntoView({behavior:'smooth',block:'start'});
        links.forEach(x=>x.classList.remove('active'));
        l.classList.add('active');
      })
    }

    // reveal on scroll
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          ent.target.classList.add('in-view');
          // animate skill bars if any
          const bar = ent.target.querySelectorAll('.bar > i');
          bar.forEach(b=>{
            const p = b.dataset.percent || 60;
            setTimeout(()=> b.style.width = p + '%', 200);
          })
        }
      })
    },{threshold:0.12});

    document.querySelectorAll('.fade-up').forEach(el=>io.observe(el));

    // project filters
    document.querySelectorAll('[data-filter]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const f = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(pc=>{
          if(f==='all' || pc.dataset.type===f) pc.style.display = '';
          else pc.style.display = 'none';
        })
      })
    });

    // keyboard accessibility: close modal on Esc
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') modal.classList.remove('open'); });

    // mark nav on scroll
    const sections = document.querySelectorAll('main, section');
    window.addEventListener('scroll', ()=>{
      let fromTop = window.scrollY + 100;
      document.querySelectorAll('.nav-link').forEach(link=>{
        const sec = document.querySelector(link.getAttribute('href'));
        if(sec && sec.offsetTop <= fromTop && sec.offsetTop + sec.offsetHeight > fromTop){
          document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));
          link.classList.add('active');
        }
      })
    });

    // small progressive enhancement: prefers-reduced-motion
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      document.querySelectorAll('.fade-up').forEach(el=>el.style.transition='none');
    }




// Close menu when a link is clicked (mobile UX)
document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      nav.classList.remove('open');
      document.body.classList.remove('nav-open');
      hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });
});

// hamburger menu toggle

hamburger.addEventListener('click', () => {
  nav.classList.toggle('show');
});


// Form validation


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('contactForm');
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const subjectField = document.getElementById('subject');
  const messageField = document.getElementById('message');
  const errorDiv = document.getElementById('formerror');

  // Validation functions
  function validateName() {
    const name = nameField.value.trim();
    if (!/^[a-zA-Z\s]{4,}$/.test(name)) {
      showError("Please enter a valid name (letters only, min 4 characters).", nameField);
      return false;
    }
    nameField.style.color = "black";
    return true;
  }

  function validateEmail() {
    const email = emailField.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showError("Please enter a valid email address.", emailField);
      return false;
    }
    emailField.style.color = "black";
    return true;
  }

  function validateSubject() {
    const subject = subjectField.value.trim();
    if (subject.length > 100) {
      showError("Subject should be less than 100 characters.", subjectField);
      return false;
    }
    subjectField.style.color = "black";
    return true;
  }

  function validateMessage() {
    const message = messageField.value.trim();
    if (message.length < 10) {
      showError("Message should be at least 10 characters long.", messageField);
      return false;
    }
    messageField.style.color = "black";
    return true;
  }

  // Show error
  function showError(msg, field) {
    errorDiv.textContent = msg;
    field.style.color = "red";
    setTimeout(() => {
      errorDiv.textContent = "";
      field.style.color = "black";
    }, 3000);
  }

  // Attach onchange validation
  nameField.addEventListener("change", validateName);
  emailField.addEventListener("change", validateEmail);
  subjectField.addEventListener("change", validateSubject);
  messageField.addEventListener("change", validateMessage);

});


    /* Top button */
    document.getElementById('topBtn').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));