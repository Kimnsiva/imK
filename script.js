document.addEventListener('DOMContentLoaded', () => {

  // Timeline hover glow effect
  const timelineContents = document.querySelectorAll('.timeline-content');
  
  timelineContents.forEach(content => {
    // Create glow element
    const glow = document.createElement('div');
    glow.classList.add('glow');
    content.appendChild(glow);

    content.addEventListener('mousemove', (e) => {
      const rect = content.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = x + 'px';
      glow.style.top = y + 'px';
    });
  });

  // Initialize Swiper Carousel
  if (typeof Swiper !== 'undefined') {
    new Swiper(".certSwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if(href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});

// Experience Modals Logic
function openExpModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeExpModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModals = document.querySelectorAll('.modal-overlay.active');
    activeModals.forEach(modal => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});

// Drag-to-scroll for projects showcase
const showcase = document.getElementById('projectsShowcase');
if (showcase) {
  let isDown = false;
  let startX;
  let scrollLeft;
  let moved = false;

  showcase.addEventListener('mousedown', (e) => {
    isDown = true;
    moved = false;
    showcase.classList.add('active');
    startX = e.pageX - showcase.offsetLeft;
    scrollLeft = showcase.scrollLeft;
  });

  showcase.addEventListener('mouseleave', () => { isDown = false; });
  showcase.addEventListener('mouseup', () => { isDown = false; });
  showcase.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    moved = true;
    const x = e.pageX - showcase.offsetLeft;
    const walk = (x - startX) * 1.5;
    showcase.scrollLeft = scrollLeft - walk;
  });

  // Prevent click from firing if user was dragging
  showcase.querySelectorAll('.showcase-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (moved) e.stopImmediatePropagation();
    }, true);
  });
}

// Project Modal functions
function openProjectModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeProjectModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close project modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});
