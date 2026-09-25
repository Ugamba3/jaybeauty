// ===== JayBeauty Website JS =====

document.addEventListener("DOMContentLoaded", () => {
  // Search toggle

  const searchBtn = document.querySelector(".search-btn");
  const searchOverlay = document.querySelector(".search-overlay");
  const searchContainer = document.querySelector(".search-container");

  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.toggle("show");
    searchContainer.classList.toggle("show");
  });

  // Cart toggle
  const closeCart = document.querySelector(".close-btn");
  const cartBtn = document.querySelector(".cart-btn");
  const cart = document.querySelector(".cart");
  if (cartBtn && cart) {
    cartBtn.addEventListener("click", () => {
      searchOverlay.classList.remove("show");
      nav.classList.remove("open");
      cart.classList.add("open");
    });
  }
  if (closeCart && cart) {
    closeCart.addEventListener("click", () => {
      cart.classList.remove("open");
    });
  }

  // Mobile menu toggle
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      searchOverlay.classList.remove("show");
      nav.classList.toggle("open");
    });
  }

  // Countdown timer (Deal of the Week)
  const countdownEls = {
    days: document.querySelector('.countdown-item[data-unit="days"] .num'),
    hours: document.querySelector('.countdown-item[data-unit="hours"] .num'),
    minutes: document.querySelector(
      '.countdown-item[data-unit="minutes"] .num',
    ),
    seconds: document.querySelector(
      '.countdown-item[data-unit="seconds"] .num',
    ),
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

      if (countdownEls.days)
        countdownEls.days.textContent = String(d).padStart(2, "0");
      if (countdownEls.hours)
        countdownEls.hours.textContent = String(h).padStart(2, "0");
      if (countdownEls.minutes)
        countdownEls.minutes.textContent = String(m).padStart(2, "0");
      if (countdownEls.seconds)
        countdownEls.seconds.textContent = String(s).padStart(2, "0");
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Add to cart buttons (simple demo)
  document
    .querySelectorAll(".add-cart, .product-actions .add-cart")
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const cart = document.querySelector(".cart-count");
        if (cart) {
          let count = parseFloat(cart.textContent.replace(/[^0-9.]/g, "")) || 0;
          // Simple increment demo
          cart.textContent = `$${(count + 21).toFixed(2)}`;
        }
        // Visual feedback
        btn.style.transform = "scale(0.9)";
        setTimeout(() => (btn.style.transform = ""), 150);
      });

      console.log('added')
    });

  // Product tabs
  document.querySelectorAll(".tabs a, .tabs button").forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = tab.closest(".tabs");
      parent
        .querySelectorAll("a, button")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  

  const newArrivalItems = [
    {
      id: "01",
      badge: null,
      category: "Cheek & Contour",
      name: "Baobab seed · Loofah bag gift set",
      price: 80,
      oldPrice: null,
      rating: 5,
    },
    {
      id: "02",
      badge: "-30%",
      category: "Eyes",
      name: "Litchi · african clay burner",
      price: 21,
      oldPrice: 29,
      rating: 4,
    },
    {
      id: "03",
      badge: null,
      category: "Cheek & Contour",
      name: "Velvet Melon High Intensity",
      price: 34,
      oldPrice: null,
      rating: 5,
    },
    {
      id: "04",
      badge: "NEW",
      category: "Lips",
      name: "Luxe jewel lipstick",
      price: 49,
      oldPrice: null,
      rating: 4,
    },
    {
      id: "05",
      badge: null,
      category: "Palettes",
      name: "Leather shopper bag",
      price: 49,
      oldPrice: null,
      rating: 5,
    },
  ];

  const new_arrival_grid = document.getElementById("product-grid");

  // Use .forEach for side-effects (DOM manipulation) instead of .map
  newArrivalItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    // Dynamic rating stars calculation
    const starsHTML = "★".repeat(item.rating) + "☆".repeat(5 - item.rating);

    // Dynamic badge HTML class based on type
    const badgeClass = item.badge === "NEW" ? "badge-new" : "badge-sale";
    const badgeHTML = item.badge
      ? `<span class="badge ${badgeClass}">${item.badge}</span>`
      : "";

    // Dynamic old price display
    const oldPriceHTML = item.oldPrice
      ? `<span class="old">$${item.oldPrice.toFixed(2)}</span>`
      : "";

    // Action buttons reused across standard cards
    const actionButtonsHTML = `
    <div class="product-actions">
      <button class="add-cart">Add to Cart</button>
      <button><i class="far fa-eye"></i></button>
      <button><i class="far fa-heart"></i></button>
    </div>
  `;

    // 1. Featured card (first element in array)
    if (index === 0) {
      card.style.gridRow = "span 2";
      card.innerHTML = `
      <div class="product-image" style="aspect-ratio: auto; height: 83%; min-height: 420px;">
        <img src="media/new-arrival-${item.id}.jpg" alt="${item.name}" style="object-fit: cover; padding: 0;">
      </div>
      <div class="product-info">
        <p class="product-category">${item.category}</p>
        <a href="#" class="product-name">${item.name}</a>
        <div class="product-rating">${starsHTML}</div>
        <p class="product-price">$${item.price.toFixed(2)}</p>
      </div>
    `;
    } else {
      // 2. Standard cards (with or without badges/old prices)
      card.innerHTML = `
      <div class="product-image">
        ${badgeHTML}
        <img src="media/new-arrival-${item.id}.jpg" alt="${item.name}">
        ${actionButtonsHTML}
      </div>
      <div class="product-info">
        <p class="product-category">${item.category}</p>
        <a href="#" class="product-name">${item.name}</a>
        <div class="product-rating">${starsHTML}</div>
        <p class="product-price">$${item.price.toFixed(2)} ${oldPriceHTML}</p>
      </div>
    `;
    }

    new_arrival_grid.appendChild(card);
  });

  // View toggle (grid / list)
  const viewBtns = document.querySelectorAll(".view-toggle button");
  const productContainer = document.querySelector(".shop-products");
  if (viewBtns.length && productContainer) {
    viewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        viewBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        if (btn.dataset.view === "list") {
          productContainer.classList.add("list-view");
        } else {
          productContainer.classList.remove("list-view");
        }
      });
    });
  }

  // shop-toolbar
  const option = document.querySelectorAll(".shop-toolbar select option");
  const itemCard = document.querySelectorAll(
    ".product-card .product-info .product-price",
  );

  option.forEach((option) => {
    option.addEventListener('click', () => {
      const card = document.querySelectorAll(".product-card .badge");
      card.forEach((card) => {
        if (option.textContent == "Newest") {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    })
  });

  // Testimonial avatars
  const avatars = document.querySelectorAll(".testimonial-avatar");
  const quoteEl = document.querySelector(".testimonial-content .quote");
  const authorEl = document.querySelector(".testimonial-content .author");
  const locationEl = document.querySelector(".testimonial-content .location");
  const testimonials = [
    {
      quote:
        "I love my lash tint! I don't have extremely blonde lashes, but I do like that they can be even darker than they are. It makes my eyes stand out more and I love the way it looks! Now, I just need to add on a bit of mascara for length and I am set.",
      author: "Alexander Ball",
      location: "New York",
    },
    {
      quote:
        "The spa treatments here are absolutely transformative. My skin has never felt better. Highly recommend the body treatment package!",
      author: "Sarah Mitchell",
      location: "Los Angeles",
    },
    {
      quote:
        "Professional makeup artists who really know their craft. I looked stunning for my wedding day. Thank you JayBeauty!",
      author: "Emma Chen",
      location: "London",
    },
  ];

  if (avatars.length) {
    avatars.forEach((av, i) => {
      av.addEventListener("click", () => {
        avatars.forEach((a) => a.classList.remove("active"));
        av.classList.add("active");
        const t = testimonials[i % testimonials.length];
        if (quoteEl) quoteEl.textContent = t.quote;
        if (authorEl) authorEl.textContent = t.author;
        if (locationEl) locationEl.textContent = t.location;
      });
    });
  }

  const shopItems = [
    {
      image:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
      badge: "30",
      category: "Eyes",
      name: "The expert mascara",
      rating: "★★★★☆",
      price: 21.0,
      oldPrice: 29.0,
    },
    {
      image: "media/Leather-shopper-bag.jpg",
      badge: "",
      category: "Palettes",
      name: "Leather shopper bag",
      rating: "★★★★★",
      price: 49.0,
      oldPrice: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
      badge: "",
      category: "Cheek & Contour",
      name: "Velvet Melon High Intensity",
      rating: "★★★★☆",
      price: 34.0,
      oldPrice: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
      badge: "NEW",
      category: "Lips",
      name: "Luxe jewel lipstick",
      rating: "★★★★★",
      price: 49.0,
      oldPrice: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
      badge: "NEW",
      category: "Lips",
      name: "Luxe jewel lipstick",
      rating: "★★★★☆",
      price: 49.0,
      oldPrice: "",
    },
    {
      image: "media/The-expert-mascara.jpg",
      badge: "30",
      category: "Eyes",
      name: "The expert mascara",
      rating: "★★★★★",
      price: 21.0,
      oldPrice: 29.0,
    },
    {
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
      badge: "",
      category: "Lips",
      name: "Beigey Nude weightless lipstick",
      rating: "★★★★☆",
      price: 28.0,
      oldPrice: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
      badge: "",
      category: "Cheek & Contour",
      name: "Luxe jewel lipstick",
      rating: "★★★★★",
      price: 49.0,
      oldPrice: "",
    },
  ];

  const root = document.getElementById("root");

  shopItems.map((item) => {
    const card = document.createElement("div");

    card.classList.add("product-card");

    if (item.oldPrice == "" || item.badge == "") {
      card.innerHTML = `
        <div class="product-image">
          <img src="${item.image}" alt="The expert mascara">
          <div class="product-actions">
            <button class="add-cart">Add to Cart</button>
            <button><i class="far fa-eye"></i></button>
            <button><i class="far fa-heart"></i></button>
          </div>
        </div>
        <div class="product-info">
          <p class="product-category">${item.category}</p>
          <a href="#" class="product-name">${item.name}</a>
          <div class="product-rating">★★★★☆</div>
          <p class="product-price">$${item.price}.00</p>
        </div>
      `;
    } else if (item.oldPrice == "") {
      card.innerHTML = `
        <div class="product-image">
          <span class="badge badge-sale">-${item.badge}%</span>
          <img src="${item.image}" alt="The expert mascara">
          <div class="product-actions">
            <button class="add-cart">Add to Cart</button>
            <button><i class="far fa-eye"></i></button>
            <button><i class="far fa-heart"></i></button>
          </div>
        </div>
        <div class="product-info">
          <p class="product-category">${item.category}</p>
          <a href="#" class="product-name">${item.name}</a>
          <div class="product-rating">★★★★☆</div>
          <p class="product-price">$${item.price}.00</p>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="product-image">
          <span class="badge badge-sale">-${item.badge}%</span>
          <img src="${item.image}" alt="The expert mascara">
          <div class="product-actions">
            <button class="add-cart">Add to Cart</button>
            <button><i class="far fa-eye"></i></button>
            <button><i class="far fa-heart"></i></button>
          </div>
        </div>
        <div class="product-info">
          <p class="product-category">${item.category}</p>
          <a href="#" class="product-name">${item.name}</a>
          <div class="product-rating">★★★★☆</div>
          <p class="product-price">$${item.price}.00 <span class="old">$${item.oldPrice}.00</span></p>
        </div>
      `;
    }

    root.appendChild(card);
  });

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
