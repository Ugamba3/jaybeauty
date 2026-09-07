// ===== ELIAH Website JS =====

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Countdown timer (Deal of the Week)
  const countdownEls = {
    days: document.querySelector('.countdown-item[data-unit="days"] .num'),
    hours: document.querySelector('.countdown-item[data-unit="hours"] .num'),
    minutes: document.querySelector('.countdown-item[data-unit="minutes"] .num'),
    seconds: document.querySelector('.countdown-item[data-unit="seconds"] .num')
  };

  if (countdownEls.days) {
    // Set end date ~4 days from now for demo
    const end = new Date();
    end.setDate(end.getDate() + 3);
    end.setHours(end.getHours() + 18);
    end.setMinutes(end.getMinutes() + 39);
    end.setSeconds(end.getSeconds() + 26);

    function updateCountdown() {
      const now = new Date();
      let diff = Math.max(0, end - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= d * 1000 * 60 * 60 * 24;
      const h = Math.floor(diff / (1000 * 60 * 60));
      diff -= h * 1000 * 60 * 60;
      const m = Math.floor(diff / (1000 * 60));
      diff -= m * 1000 * 60;
      const s = Math.floor(diff / 1000);

      if (countdownEls.days) countdownEls.days.textContent = String(d).padStart(2, '0');
      if (countdownEls.hours) countdownEls.hours.textContent = String(h).padStart(2, '0');
      if (countdownEls.minutes) countdownEls.minutes.textContent = String(m).padStart(2, '0');
      if (countdownEls.seconds) countdownEls.seconds.textContent = String(s).padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Add to cart buttons (simple demo)
  document.querySelectorAll('.add-cart, .product-actions button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const cart = document.querySelector('.cart-count');
      if (cart) {
        let count = parseFloat(cart.textContent.replace(/[^0-9.]/g, '')) || 0;
        // Simple increment demo
        cart.textContent = `$${(count + 21).toFixed(2)}`;
      }
      // Visual feedback
      btn.style.transform = 'scale(0.9)';
      setTimeout(() => btn.style.transform = '', 150);
    });
  });

  // Product tabs
  document.querySelectorAll('.tabs a, .tabs button').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = tab.closest('.tabs');
      parent.querySelectorAll('a, button').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // View toggle (grid / list)
  const viewBtns = document.querySelectorAll('.view-toggle button');
  const productContainer = document.querySelector('.shop-products');
  if (viewBtns.length && productContainer) {
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (btn.dataset.view === 'list') {
          productContainer.classList.add('list-view');
        } else {
          productContainer.classList.remove('list-view');
        }
      });
    });
  }

  // Testimonial avatars
  const avatars = document.querySelectorAll('.testimonial-avatar');
  const quoteEl = document.querySelector('.testimonial-content .quote');
  const authorEl = document.querySelector('.testimonial-content .author');
  const locationEl = document.querySelector('.testimonial-content .location');
  const testimonials = [
    {
      quote: "I love my lash tint! I don't have extremely blonde lashes, but I do like that they can be even darker than they are. It makes my eyes stand out more and I love the way it looks! Now, I just need to add on a bit of mascara for length and I am set.",
      author: "Alexander Ball",
      location: "New York"
    },
    {
      quote: "The spa treatments here are absolutely transformative. My skin has never felt better. Highly recommend the body treatment package!",
      author: "Sarah Mitchell",
      location: "Los Angeles"
    },
    {
      quote: "Professional makeup artists who really know their craft. I looked stunning for my wedding day. Thank you Eliah!",
      author: "Emma Chen",
      location: "London"
    }
  ];

  if (avatars.length) {
    avatars.forEach((av, i) => {
      av.addEventListener('click', () => {
        avatars.forEach(a => a.classList.remove('active'));
        av.classList.add('active');
        const t = testimonials[i % testimonials.length];
        if (quoteEl) quoteEl.textContent = t.quote;
        if (authorEl) authorEl.textContent = t.author;
        if (locationEl) locationEl.textContent = t.location;
      });
    });
  }

  // Smooth scroll for anchor links
  // document.querySelectorAll('a[href^="#"]').forEach(a => {
  //   a.addEventListener('click', e => {
  //     const target = document.querySelector(a.getAttribute('href'));
  //     if (target) {
  //       e.preventDefault();
  //       target.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   });
  // });
});
