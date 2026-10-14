(() => {
  "use strict";

  const products = [
    { id: "aurora-headphones", name: "Tai nghe Aurora", brand: "Mộc Studio", category: "Điện tử", price: 890000, oldPrice: 1090000, rating: 4.9, reviews: 128, badge: "BÁN CHẠY", emoji: "🎧", tone: "#e5eadf", description: "Âm thanh trong trẻo, đệm tai êm và pin bền bỉ đến 30 giờ." },
    { id: "everyday-tote", name: "Túi vải Everyday", brand: "Lành Living", category: "Phụ kiện", price: 320000, oldPrice: null, rating: 4.8, reviews: 86, badge: "ĐƯỢC YÊU THÍCH", emoji: "👜", tone: "#f0e7d8", description: "Canvas dày dặn, nhẹ nhàng cùng bạn từ phố nhỏ đến chuyến xa." },
    { id: "pebble-lamp", name: "Đèn bàn Pebble", brand: "Nếp Home", category: "Nhà cửa", price: 1250000, oldPrice: null, rating: 4.9, reviews: 64, badge: "MỚI", emoji: "💡", tone: "#f3ecd9", description: "Ánh sáng dịu dàng, ba mức sáng cho góc nghỉ ngơi ấm áp." },
    { id: "daily-watch", name: "Đồng hồ Daily", brand: "Mộc Studio", category: "Phụ kiện", price: 1490000, oldPrice: 1690000, rating: 4.7, reviews: 52, badge: "−12%", emoji: "⌚", tone: "#f0e3dd", description: "Mặt đồng hồ thanh lịch, dây đeo dễ chỉnh và máy bền bỉ." },
    { id: "cloud-sneakers", name: "Giày Cloud Walk", brand: "Bước Studio", category: "Thời trang", price: 980000, oldPrice: null, rating: 4.8, reviews: 93, badge: "", emoji: "👟", tone: "#e5e9ea", description: "Êm nhẹ, thoáng khí để mỗi bước chân luôn thật thoải mái." },
    { id: "sip-bottle", name: "Bình giữ nhiệt Sip", brand: "Lành Living", category: "Phụ kiện", price: 450000, oldPrice: null, rating: 4.6, reviews: 41, badge: "", emoji: "🧴", tone: "#e0ece4", description: "Thép không gỉ hai lớp, giữ lạnh 12 giờ và nắp chống tràn." },
    { id: "linen-shirt", name: "Áo linen Mây", brand: "Bước Studio", category: "Thời trang", price: 690000, oldPrice: null, rating: 4.8, reviews: 37, badge: "CHẤT LIỆU MỚI", emoji: "👕", tone: "#eae8db", description: "Vải linen mềm mát, phom dáng thoải mái cho ngày nắng nhẹ." },
    { id: "ceramic-mug", name: "Cốc gốm Nắng", brand: "Nếp Home", category: "Nhà cửa", price: 280000, oldPrice: null, rating: 4.9, reviews: 76, badge: "", emoji: "☕", tone: "#eee3d7", description: "Gốm làm thủ công, mỗi chiếc cốc mang một đường men riêng." }
  ];
  const money = (value) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
  const params = new URLSearchParams(location.search);
  const state = {
    query: (params.get("q") || "").trim(),
    categories: new Set(params.get("category") ? [params.get("category")] : []),
    brands: new Set(),
    price: "all",
    min: "",
    max: "",
    favorites: new Set()
  };
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const grid = $("#product-grid");
  const count = $("#result-count");

  function readStoredCart() {
    try {
      const stored = JSON.parse(localStorage.getItem("moc-cart") || "[]");
      return Array.isArray(stored) ? stored.filter((item) => item && typeof item.id === "string" && Number.isInteger(item.quantity) && item.quantity > 0) : [];
    } catch (error) {
      console.error("Không thể đọc dữ liệu giỏ hàng.", error);
      return [];
    }
  }

  function updateCartBadge() {
    $("#cart-count").textContent = readStoredCart().reduce((total, item) => total + item.quantity, 0);
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }

  function renderOptions(target, values, group, selected) {
    $(target).innerHTML = values.map((value) => {
      const total = products.filter((product) => product[group] === value).length;
      return `<label class="check-option"><input type="checkbox" data-filter="${group}" value="${value}" ${selected.has(value) ? "checked" : ""}><span>${value}</span><small>${total}</small></label>`;
    }).join("");
  }

  function getFilteredProducts() {
    const min = state.min === "" ? 0 : Number(state.min);
    const max = state.max === "" ? Infinity : Number(state.max);
    return products.filter((product) => {
      const text = `${product.name} ${product.brand} ${product.category}`.toLocaleLowerCase("vi");
      const matchesQuery = !state.query || text.includes(state.query.toLocaleLowerCase("vi"));
      const matchesCategory = !state.categories.size || state.categories.has(product.category);
      const matchesBrand = !state.brands.size || state.brands.has(product.brand);
      let matchesPreset = true;
      if (state.price === "under500") matchesPreset = product.price < 500000;
      if (state.price === "500to1000") matchesPreset = product.price >= 500000 && product.price <= 1000000;
      if (state.price === "over1000") matchesPreset = product.price > 1000000;
      return matchesQuery && matchesCategory && matchesBrand && matchesPreset && product.price >= min && product.price <= max;
    });
  }

  function getActiveFilters() {
    return [
      ...[...state.categories].map((value) => ({ label: value, type: "category", value })),
      ...[...state.brands].map((value) => ({ label: value, type: "brand", value })),
      ...(state.price !== "all" ? [{ label: { under500: "Dưới 500.000đ", "500to1000": "500.000đ – 1.000.000đ", over1000: "Trên 1.000.000đ" }[state.price], type: "price" }] : []),
      ...(state.min || state.max ? [{ label: `${state.min ? money(Number(state.min)) : "0đ"} – ${state.max ? money(Number(state.max)) : "không giới hạn"}`, type: "custom-price" }] : []),
      ...(state.query ? [{ label: `Từ khóa: ${state.query}`, type: "query" }] : [])
    ];
  }

  function render() {
    const list = getFilteredProducts();
    const sort = $("#sort-products").value;
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "vi"));

    count.textContent = `${list.length} sản phẩm`;
    $("#product-grid").hidden = !list.length;
    $("#empty-state").hidden = Boolean(list.length);
    $("#catalog-end").hidden = !list.length;
    grid.innerHTML = list.map((product) => `<article class="product-card">
      <div class="product-visual" style="--tone:${product.tone}">
        <span class="product-emoji" aria-hidden="true">${product.emoji}</span>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <button class="favorite-button" type="button" data-favorite="${product.id}" aria-label="${state.favorites.has(product.id) ? "Bỏ yêu thích" : "Thêm vào yêu thích"} ${product.name}" aria-pressed="${state.favorites.has(product.id)}">♡</button>
        <button class="quick-add" type="button" data-add="${product.id}" aria-label="Thêm ${product.name} vào giỏ">+</button>
      </div>
      <div class="product-meta"><span>${product.brand}</span><span class="product-rating">★ ${product.rating} <span>(${product.reviews})</span></span></div>
      <a class="product-title" href="product-detail.html?id=${encodeURIComponent(product.id)}">${product.name}</a>
      <p class="product-description">${product.description}</p>
      <div class="product-price-row"><strong>${money(product.price)}</strong>${product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : ""}</div>
    </article>`).join("");
    renderActiveFilters();
  }

  function renderActiveFilters() {
    $("#active-filters").innerHTML = getActiveFilters().map((filter, index) =>
      `<span class="filter-chip">${filter.label}<button type="button" data-remove-filter="${index}" aria-label="Bỏ bộ lọc ${filter.label}">×</button></span>`).join("");
  }

  function clearFilters() {
    state.categories.clear();
    state.brands.clear();
    state.query = "";
    state.price = "all";
    state.min = "";
    state.max = "";
    $("#min-price").value = "";
    $("#max-price").value = "";
    $('input[name="price"][value="all"]').checked = true;
    $("#search-input").value = "";
    $("#header-search input").value = "";
    $$("#filter-panel input[data-filter]").forEach((input) => { input.checked = false; });
    history.replaceState({}, "", "products.html");
    render();
  }

  function addToCart(id) {
    const product = products.find((item) => item.id === id);
    if (!product) return;
    const cart = readStoredCart();
    const existing = cart.find((item) => item.id === id && (!item.variant || item.variant === ""));
    if (existing) existing.quantity = Math.min(99, existing.quantity + 1);
    else cart.push({ id, quantity: 1, variant: "" });
    try {
      localStorage.setItem("moc-cart", JSON.stringify(cart));
      updateCartBadge();
      showToast(`${product.name} đã được thêm vào giỏ hàng.`);
    } catch (error) {
      console.error("Không thể lưu giỏ hàng.", error);
      showToast("Không thể lưu giỏ hàng trên thiết bị này.");
    }
  }

  function initialize() {
    renderOptions("#category-options", [...new Set(products.map((item) => item.category))], "category", state.categories);
    renderOptions("#brand-options", [...new Set(products.map((item) => item.brand))], "brand", state.brands);
    $("#search-input").value = state.query;
    $("#header-search input").value = state.query;
    updateCartBadge();
    render();

    $("#filter-panel").addEventListener("change", (event) => {
      const input = event.target;
      if (input.matches("[data-filter]")) {
        const selection = state[input.dataset.filter === "category" ? "categories" : "brands"];
        input.checked ? selection.add(input.value) : selection.delete(input.value);
        render();
      }
      if (input.name === "price") {
        state.price = input.value;
        state.min = "";
        state.max = "";
        $("#min-price").value = "";
        $("#max-price").value = "";
        render();
      }
    });
    $("#apply-price").addEventListener("click", () => {
      const min = $("#min-price").value.trim();
      const max = $("#max-price").value.trim();
      if (min && max && Number(min) > Number(max)) {
        $("#max-price").setCustomValidity("Giá cao nhất phải lớn hơn hoặc bằng giá thấp nhất.");
        $("#max-price").reportValidity();
        $("#max-price").setCustomValidity("");
        return;
      }
      state.price = "all";
      $('input[name="price"][value="all"]').checked = true;
      state.min = min;
      state.max = max;
      render();
    });
    $("#sort-products").addEventListener("change", render);
    $("#clear-filters").addEventListener("click", clearFilters);
    $("#reset-empty").addEventListener("click", clearFilters);

    const submitSearch = (form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = form.querySelector('input[type="search"]');
        state.query = input.value.trim();
        $("#search-input").value = state.query;
        $("#header-search input").value = state.query;
        render();
      });
    };
    submitSearch($("#catalog-search"));
    submitSearch($("#header-search"));
    $("#search-input").addEventListener("input", () => {
      state.query = $("#search-input").value.trim();
      $("#header-search input").value = $("#search-input").value;
      render();
    });

    $("#active-filters").addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove-filter]");
      if (!button) return;
      const filter = getActiveFilters()[Number(button.dataset.removeFilter)];
      if (!filter) return;
      if (filter.type === "category") state.categories.delete(filter.value);
      if (filter.type === "brand") state.brands.delete(filter.value);
      if (filter.type === "price") {
        state.price = "all";
        $('input[name="price"][value="all"]').checked = true;
      }
      if (filter.type === "custom-price") {
        state.min = "";
        state.max = "";
        $("#min-price").value = "";
        $("#max-price").value = "";
      }
      if (filter.type === "query") {
        state.query = "";
        $("#search-input").value = "";
        $("#header-search input").value = "";
      }
      render();
    });
    grid.addEventListener("click", (event) => {
      const add = event.target.closest("[data-add]");
      if (add) addToCart(add.dataset.add);
      const favorite = event.target.closest("[data-favorite]");
      if (favorite) {
        const id = favorite.dataset.favorite;
        state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
        render();
        showToast(state.favorites.has(id) ? "Đã thêm vào danh sách yêu thích." : "Đã bỏ khỏi danh sách yêu thích.");
      }
    });
    $("#mobile-filter-button").addEventListener("click", () => {
      const open = $("#filter-panel").classList.toggle("is-open");
      $("#mobile-filter-button").setAttribute("aria-expanded", String(open));
    });
    $("#menu-toggle").addEventListener("click", () => {
      const open = $("#main-nav").classList.toggle("is-open");
      $("#menu-toggle").setAttribute("aria-expanded", String(open));
      $("#menu-toggle").setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    });
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();
