/**
 * MỘC SƠN ECO RESORT & RETREAT - MAIN JAVASCRIPT
 * Tương tác người dùng: Navigation, Hero Slider, Render Dữ liệu,
 * Bộ lọc phòng & tour, Form đặt phòng/tour có kiểm tra hợp lệ,
 * Testimonial Carousel, Toast Notifications.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Khởi tạo các module
  initHeaderAndNav();
  initHeroSlider();
  renderAmenities();
  renderRooms("all");
  renderActivities();
  initRoomFilter();
  initTestimonialSlider();
  initBookingSystem();
  initNewsletter();
  initBackToTop();
  setupDefaultDates();
});

/* ==========================================================================
   1. HEADER & NAVIGATION & SMOOTH SCROLL
   ========================================================================== */
function initHeaderAndNav() {
  const header = document.querySelector(".site-header");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const backdrop = document.querySelector(".mobile-backdrop");

  // Scroll effect for header
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    updateActiveNav();
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // Mobile menu toggle
  function toggleMobileMenu() {
    mobileToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    backdrop.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove("active");
    navMenu.classList.remove("active");
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", toggleMobileMenu);
  }
  if (backdrop) {
    backdrop.addEventListener("click", closeMobileMenu);
  }

  // Smooth scroll and close mobile menu on nav click
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          closeMobileMenu();
          const headerHeight = header.offsetHeight;
          const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight + 5;
          window.scrollTo({
            top: targetPos,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // Active navigation link on scroll
  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll("section[id]");

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. HERO BANNER SLIDER / CAROUSEL
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const prevBtn = document.querySelector(".hero-prev");
  const nextBtn = document.querySelector(".hero-next");
  let currentIndex = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    let next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 5500);
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoplay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      resetAutoplay();
    });
  });

  startAutoplay();
}

/* ==========================================================================
   3. RENDER AMENITIES (TIỆN ÍCH & DỊCH VỤ)
   ========================================================================== */
function renderAmenities() {
  const container = document.getElementById("amenities-grid");
  if (!container || !window.RESORT_DATA) return;

  const amenities = window.RESORT_DATA.amenities;
  container.innerHTML = amenities.map(item => `
    <div class="amenity-card">
      <div class="amenity-icon-wrap">
        <i class="fa-solid ${item.icon}"></i>
      </div>
      <div class="amenity-subtitle">${item.subtitle}</div>
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    </div>
  `).join("");
}

/* ==========================================================================
   4. RENDER ROOMS & FILTER (PHÒNG LƯU TRÚ & BẢNG GIÁ)
   ========================================================================== */
function renderRooms(filterCategory = "all") {
  const container = document.getElementById("rooms-grid");
  if (!container || !window.RESORT_DATA) return;

  let rooms = window.RESORT_DATA.rooms;
  if (filterCategory !== "all") {
    rooms = rooms.filter(room => room.category === filterCategory);
  }

  container.innerHTML = rooms.map(room => `
    <div class="room-card" data-category="${room.category}">
      <div class="room-media">
        <img src="${room.image}" alt="${room.name}" loading="lazy">
        <span class="room-badge">${room.tag}</span>
        <div class="room-price-tag">
          <span class="room-price-val">${room.priceFormatted}</span>
          <span class="room-price-unit">/${room.unit}</span>
        </div>
      </div>
      <div class="room-body">
        <div class="room-category">${room.categoryName}</div>
        <h3 class="room-title">${room.name}</h3>
        <div class="room-specs">
          <div class="spec-item"><i class="fa-solid fa-maximize"></i> ${room.area}</div>
          <div class="spec-item"><i class="fa-solid fa-user-group"></i> ${room.capacity}</div>
          <div class="spec-item"><i class="fa-solid fa-bed"></i> ${room.bed}</div>
          <div class="spec-item"><i class="fa-solid fa-mountain-sun"></i> ${room.view}</div>
        </div>
        <p class="room-desc">${room.description}</p>
        <div class="room-amenities-tags">
          ${room.amenities.slice(0, 3).map(a => `<span class="amenity-tag">${a}</span>`).join("")}
          ${room.amenities.length > 3 ? `<span class="amenity-tag">+${room.amenities.length - 3} tiện ích</span>` : ""}
        </div>
        <div class="room-actions">
          <button class="btn btn-outline-primary btn-sm btn-quick-view" data-id="${room.id}">
            <i class="fa-solid fa-eye"></i> Chi tiết
          </button>
          <button class="btn btn-primary btn-sm btn-book-room" data-id="${room.id}" data-name="${room.name}" data-price="${room.price}">
            <i class="fa-solid fa-calendar-check"></i> Đặt phòng
          </button>
        </div>
      </div>
    </div>
  `).join("");

  // Attach click listeners for card buttons
  container.querySelectorAll(".btn-book-room").forEach(btn => {
    btn.addEventListener("click", () => {
      const roomId = btn.getAttribute("data-id");
      openBookingModal("room", roomId);
    });
  });

  container.querySelectorAll(".btn-quick-view").forEach(btn => {
    btn.addEventListener("click", () => {
      const roomId = btn.getAttribute("data-id");
      openRoomDetailsModal(roomId);
    });
  });
}

function initRoomFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      renderRooms(category);
    });
  });
}

/* ==========================================================================
   5. RENDER ACTIVITIES & TOURS (TOUR & HOẠT ĐỘNG)
   ========================================================================== */
function renderActivities() {
  const container = document.getElementById("activities-grid");
  if (!container || !window.RESORT_DATA) return;

  const tours = window.RESORT_DATA.tours;
  container.innerHTML = tours.map(tour => `
    <div class="activity-card">
      <div class="activity-img">
        <img src="${tour.image}" alt="${tour.title}" loading="lazy">
        <span class="activity-tag">${tour.tag}</span>
      </div>
      <div class="activity-info">
        <div>
          <div class="activity-meta">
            <span><i class="fa-regular fa-clock"></i> ${tour.duration}</span>
            <span><i class="fa-regular fa-sun"></i> ${tour.time}</span>
          </div>
          <h3 class="activity-title">${tour.title}</h3>
          <p class="activity-highlight">${tour.highlight}</p>
          <ul class="activity-included">
            ${tour.included.map(inc => `<li><i class="fa-solid fa-check"></i> ${inc}</li>`).join("")}
          </ul>
        </div>
        <div class="activity-footer">
          <div class="activity-price">${tour.priceFormatted} <span>/${tour.unit}</span></div>
          <button class="btn btn-primary btn-sm btn-book-tour" data-id="${tour.id}" data-name="${tour.title}" data-price="${tour.price}">
            <i class="fa-solid fa-ticket"></i> Đặt tour
          </button>
        </div>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".btn-book-tour").forEach(btn => {
    btn.addEventListener("click", () => {
      const tourId = btn.getAttribute("data-id");
      openBookingModal("tour", tourId);
    });
  });
}

/* ==========================================================================
   6. TESTIMONIALS SLIDER
   ========================================================================== */
function initTestimonialSlider() {
  const track = document.getElementById("testimonial-track");
  const dotsContainer = document.getElementById("test-dots");
  const prevBtn = document.querySelector(".test-prev");
  const nextBtn = document.querySelector(".test-next");
  if (!track || !window.RESORT_DATA) return;

  const testimonials = window.RESORT_DATA.testimonials;

  track.innerHTML = testimonials.map(item => `
    <div class="testimonial-slide">
      <div class="testimonial-card">
        <span class="quote-icon"><i class="fa-solid fa-quote-right"></i></span>
        <div class="stars">
          ${Array(item.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
        </div>
        <p class="testimonial-quote">“${item.comment}”</p>
        <div class="testimonial-author">
          <img src="${item.avatar}" alt="${item.name}" class="author-avatar" loading="lazy">
          <div class="author-info">
            <h4>${item.name}</h4>
            <p>${item.role} • <span>${item.date}</span></p>
            <span class="stayed-room-pill"><i class="fa-solid fa-bed"></i> ${item.stayedRoom}</span>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  let currentIndex = 0;
  const totalSlides = testimonials.length;

  dotsContainer.innerHTML = testimonials.map((_, i) => `
    <div class="test-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
  `).join("");

  const dots = dotsContainer.querySelectorAll(".test-dot");

  function updateSlider(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    track.style.transition = "transform 0.45s ease";
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      let next = (currentIndex + 1) % totalSlides;
      updateSlider(next);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      let prev = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider(prev);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index"), 10);
      updateSlider(idx);
    });
  });

  // Autoplay testimonial
  setInterval(() => {
    let next = (currentIndex + 1) % totalSlides;
    updateSlider(next);
  }, 6500);
}

/* ==========================================================================
   7. BOOKING SYSTEM & FORM VALIDATION
   ========================================================================== */
function setupDefaultDates() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayStr = formatDate(today);
  const tomorrowStr = formatDate(tomorrow);

  // Quick booking inputs
  const quickCheckin = document.getElementById("quick-checkin");
  const quickCheckout = document.getElementById("quick-checkout");
  if (quickCheckin) {
    quickCheckin.min = todayStr;
    quickCheckin.value = todayStr;
  }
  if (quickCheckout) {
    quickCheckout.min = tomorrowStr;
    quickCheckout.value = tomorrowStr;
  }

  // Modal inputs
  const modalCheckin = document.getElementById("modal-checkin");
  const modalCheckout = document.getElementById("modal-checkout");
  if (modalCheckin) {
    modalCheckin.min = todayStr;
    modalCheckin.value = todayStr;
  }
  if (modalCheckout) {
    modalCheckout.min = tomorrowStr;
    modalCheckout.value = tomorrowStr;
  }
}

function initBookingSystem() {
  const modal = document.getElementById("booking-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const quickBookingForm = document.getElementById("quick-booking-form");
  const bookingForm = document.getElementById("main-booking-form");
  const tabRoomBtn = document.getElementById("tab-room-btn");
  const tabTourBtn = document.getElementById("tab-tour-btn");
  const roomSelect = document.getElementById("modal-room-select");
  const tourSelect = document.getElementById("modal-tour-select");
  const serviceTypeField = document.getElementById("booking-service-type");
  const roomSelectGroup = document.getElementById("room-select-group");
  const tourSelectGroup = document.getElementById("tour-select-group");
  const checkinInput = document.getElementById("modal-checkin");
  const checkoutInput = document.getElementById("modal-checkout");
  const guestsInput = document.getElementById("modal-guests");
  const priceDisplay = document.getElementById("estimated-price-display");

  // Populate options into select
  if (window.RESORT_DATA) {
    roomSelect.innerHTML = window.RESORT_DATA.rooms.map(r => `
      <option value="${r.id}" data-price="${r.price}">${r.name} - ${r.priceFormatted}/đêm</option>
    `).join("");

    tourSelect.innerHTML = window.RESORT_DATA.tours.map(t => `
      <option value="${t.id}" data-price="${t.price}">${t.title} - ${t.priceFormatted}/người</option>
    `).join("");
  }

  // Switch Booking Tabs
  function setBookingType(type) {
    if (type === "room") {
      tabRoomBtn.classList.add("active");
      tabTourBtn.classList.remove("active");
      roomSelectGroup.style.display = "block";
      tourSelectGroup.style.display = "none";
      serviceTypeField.value = "room";
      document.querySelector("label[for='modal-checkin']").innerHTML = `Ngày nhận phòng <span class="req">*</span>`;
      document.querySelector("label[for='modal-checkout']").innerHTML = `Ngày trả phòng <span class="req">*</span>`;
      document.getElementById("checkout-group").style.display = "block";
    } else {
      tabTourBtn.classList.add("active");
      tabRoomBtn.classList.remove("active");
      roomSelectGroup.style.display = "none";
      tourSelectGroup.style.display = "block";
      serviceTypeField.value = "tour";
      document.querySelector("label[for='modal-checkin']").innerHTML = `Ngày khởi hành <span class="req">*</span>`;
      document.getElementById("checkout-group").style.display = "none";
    }
    calculateLivePrice();
  }

  if (tabRoomBtn) tabRoomBtn.addEventListener("click", () => setBookingType("room"));
  if (tabTourBtn) tabTourBtn.addEventListener("click", () => setBookingType("tour"));

  // Calculate live estimated price
  function calculateLivePrice() {
    const serviceType = serviceTypeField.value;
    const guests = parseInt(guestsInput.value, 10) || 1;

    if (serviceType === "room") {
      const selectedOption = roomSelect.options[roomSelect.selectedIndex];
      const pricePerNight = selectedOption ? parseInt(selectedOption.getAttribute("data-price"), 10) : 0;

      const date1 = new Date(checkinInput.value);
      const date2 = new Date(checkoutInput.value);
      const diffTime = date2 - date1;
      let nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (nights < 1) nights = 1;

      const total = pricePerNight * nights;
      priceDisplay.textContent = formatCurrency(total);
    } else {
      const selectedOption = tourSelect.options[tourSelect.selectedIndex];
      const pricePerPerson = selectedOption ? parseInt(selectedOption.getAttribute("data-price"), 10) : 0;
      const total = pricePerPerson * guests;
      priceDisplay.textContent = formatCurrency(total);
    }
  }

  // Recalculate price on changes
  [roomSelect, tourSelect, checkinInput, checkoutInput, guestsInput].forEach(el => {
    if (el) {
      el.addEventListener("change", calculateLivePrice);
      el.addEventListener("input", calculateLivePrice);
    }
  });

  // Checkin & Checkout date constraints
  if (checkinInput && checkoutInput) {
    checkinInput.addEventListener("change", () => {
      const cin = new Date(checkinInput.value);
      cin.setDate(cin.getDate() + 1);
      const minCout = cin.toISOString().split("T")[0];
      checkoutInput.min = minCout;
      if (checkoutInput.value < minCout) {
        checkoutInput.value = minCout;
      }
      calculateLivePrice();
    });
  }

  // Quick booking submit
  if (quickBookingForm) {
    quickBookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const qCheckin = document.getElementById("quick-checkin").value;
      const qCheckout = document.getElementById("quick-checkout").value;
      const qGuests = document.getElementById("quick-guests").value;
      const qType = document.getElementById("quick-service-type").value;

      // Transfer data to modal
      if (checkinInput) checkinInput.value = qCheckin;
      if (checkoutInput) checkoutInput.value = qCheckout;
      if (guestsInput) guestsInput.value = qGuests;

      openBookingModal(qType);
    });
  }

  // Open modal triggers from header or buttons
  document.querySelectorAll(".trigger-booking-modal").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openBookingModal("room");
    });
  });

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener("click", closeBookingModal);
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeBookingModal();
    });
  }

  // Form submission with validation
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("modal-fullname").value.trim();
      const phone = document.getElementById("modal-phone").value.trim();
      const email = document.getElementById("modal-email").value.trim();
      const checkin = checkinInput.value;
      const checkout = checkoutInput.value;
      const guests = parseInt(guestsInput.value, 10);
      const serviceType = serviceTypeField.value;

      // Validations
      if (!fullName) {
        showToast("Thông tin chưa đủ", "Vui lòng nhập họ và tên của quý khách.", "warning");
        return;
      }

      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!phone || !phoneRegex.test(phone.replace(/\s+/g, ''))) {
        showToast("Số điện thoại không hợp lệ", "Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 số).", "error");
        return;
      }

      if (!checkin) {
        showToast("Chưa chọn ngày", "Vui lòng chọn ngày đến.", "warning");
        return;
      }

      if (serviceType === "room") {
        if (!checkout) {
          showToast("Chưa chọn ngày", "Vui lòng chọn ngày trả phòng.", "warning");
          return;
        }
        if (new Date(checkout) <= new Date(checkin)) {
          showToast("Ngày không hợp lệ", "Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày.", "error");
          return;
        }
      }

      if (!guests || guests < 1) {
        showToast("Số lượng khách chưa đúng", "Số lượng khách ít nhất phải là 1 người.", "warning");
        return;
      }

      // Success
      const bookingCode = "MS-" + Math.floor(100000 + Math.random() * 900000);
      closeBookingModal();

      showToast(
        "Đặt giữ chỗ thành công!",
        `Mã đơn: ${bookingCode}. Đội ngũ chăm sóc Mộc Sơn sẽ liên hệ qua SĐT ${phone} trong 15 phút tới để xác nhận!`,
        "success",
        6000
      );

      bookingForm.reset();
      setupDefaultDates();
    });
  }
}

// Global open / close modal helper
function openBookingModal(serviceType = "room", itemId = null) {
  const modal = document.getElementById("booking-modal");
  if (!modal) return;

  const tabRoomBtn = document.getElementById("tab-room-btn");
  const tabTourBtn = document.getElementById("tab-tour-btn");
  const roomSelect = document.getElementById("modal-room-select");
  const tourSelect = document.getElementById("modal-tour-select");
  const serviceTypeField = document.getElementById("booking-service-type");
  const roomSelectGroup = document.getElementById("room-select-group");
  const tourSelectGroup = document.getElementById("tour-select-group");

  if (serviceType === "room") {
    tabRoomBtn.classList.add("active");
    tabTourBtn.classList.remove("active");
    roomSelectGroup.style.display = "block";
    tourSelectGroup.style.display = "none";
    serviceTypeField.value = "room";
    document.getElementById("checkout-group").style.display = "block";
    if (itemId) roomSelect.value = itemId;
  } else {
    tabTourBtn.classList.add("active");
    tabRoomBtn.classList.remove("active");
    roomSelectGroup.style.display = "none";
    tourSelectGroup.style.display = "block";
    serviceTypeField.value = "tour";
    document.getElementById("checkout-group").style.display = "none";
    if (itemId) tourSelect.value = itemId;
  }

  // Trigger price calculation
  roomSelect.dispatchEvent(new Event("change"));

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBookingModal() {
  const modal = document.getElementById("booking-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/* ==========================================================================
   8. ROOM DETAILS MODAL / LIGHTBOX
   ========================================================================== */
function openRoomDetailsModal(roomId) {
  const room = window.RESORT_DATA.rooms.find(r => r.id === roomId);
  if (!room) return;

  const detailModal = document.getElementById("room-detail-modal");
  const content = document.getElementById("room-detail-content");

  content.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px;">
      <div>
        <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 12px; height: 300px;">
          <img id="detail-main-img" src="${room.image}" alt="${room.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="display: flex; gap: 8px;">
          ${(room.gallery || [room.image]).map(img => `
            <img src="${img}" style="width: 70px; height: 50px; border-radius: 6px; cursor: pointer; object-fit: cover; border: 2px solid transparent;" 
                 onclick="document.getElementById('detail-main-img').src = '${img}'" 
                 onmouseover="this.style.borderColor='var(--color-accent)'"
                 onmouseout="this.style.borderColor='transparent'">
          `).join("")}
        </div>
      </div>
      <div>
        <span class="room-category">${room.categoryName}</span>
        <h2 style="font-size: 1.8rem; margin: 6px 0 12px 0;">${room.name}</h2>
        <div style="font-size: 1.5rem; color: var(--color-accent); font-weight: 700; margin-bottom: 16px;">
          ${room.priceFormatted} <span style="font-size: 0.85rem; color: var(--color-text-muted); font-weight: 400;">/ ${room.unit}</span>
        </div>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px;">
          ${room.description}
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; font-size: 0.9rem;">
          <div><i class="fa-solid fa-maximize" style="color: var(--color-primary); width: 20px;"></i> Diện tích: <b>${room.area}</b></div>
          <div><i class="fa-solid fa-user-group" style="color: var(--color-primary); width: 20px;"></i> Sức chứa: <b>${room.capacity}</b></div>
          <div><i class="fa-solid fa-bed" style="color: var(--color-primary); width: 20px;"></i> Loại giường: <b>${room.bed}</b></div>
          <div><i class="fa-solid fa-mountain-sun" style="color: var(--color-primary); width: 20px;"></i> Tầm nhìn: <b>${room.view}</b></div>
        </div>
        <h4 style="font-size: 1.05rem; margin-bottom: 10px;">Tiện ích đi kèm:</h4>
        <ul style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 24px; font-size: 0.85rem;">
          ${room.amenities.map(a => `<li><i class="fa-solid fa-circle-check" style="color: var(--color-success); margin-right: 6px;"></i> ${a}</li>`).join("")}
        </ul>
        <button class="btn btn-primary" style="width: 100%;" onclick="closeRoomDetailModal(); openBookingModal('room', '${room.id}');">
          <i class="fa-solid fa-calendar-check"></i> Đặt phòng này ngay
        </button>
      </div>
    </div>
  `;

  detailModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeRoomDetailModal() {
  const detailModal = document.getElementById("room-detail-modal");
  if (detailModal) {
    detailModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}
window.closeRoomDetailModal = closeRoomDetailModal;

/* ==========================================================================
   9. NEWSLETTER SUBSCRIPTION
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = form.querySelector(".newsletter-input");
    const email = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showToast("Email không hợp lệ", "Vui lòng nhập địa chỉ email hợp lệ để nhận ưu đãi.", "error");
      return;
    }

    showToast(
      "Đăng ký thành công!",
      "Cảm ơn bạn! Mộc Sơn Resort đã gửi tặng mã ưu đãi 10% đến email của bạn.",
      "success"
    );
    emailInput.value = "";
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION COMPONENT
   ========================================================================== */
function showToast(title, message, type = "info", duration = 4500) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let iconClass = "fa-circle-info";
  if (type === "success") iconClass = "fa-circle-check";
  if (type === "error") iconClass = "fa-circle-xmark";
  if (type === "warning") iconClass = "fa-triangle-exclamation";

  toast.innerHTML = `
    <i class="fa-solid ${iconClass} toast-icon"></i>
    <div class="toast-content">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 350);
  }, duration);
}
window.showToast = showToast;

/* ==========================================================================
   11. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ==========================================================================
   12. HELPER UTILITIES
   ========================================================================== */
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount).replace("₫", "đ");
}
