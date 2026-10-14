(() => {
  "use strict";

  const products = [
    { id: "aurora-headphones", name: "Tai nghe Aurora", brand: "Mộc Studio", price: 890000, tone: "#e5eadf", emoji: "🎧" },
    { id: "everyday-tote", name: "Túi vải Everyday", brand: "Lành Living", price: 320000, tone: "#f0e7d8", emoji: "👜" },
    { id: "pebble-lamp", name: "Đèn bàn Pebble", brand: "Nếp Home", price: 1250000, tone: "#f3ecd9", emoji: "💡" },
    { id: "daily-watch", name: "Đồng hồ Daily", brand: "Mộc Studio", price: 1490000, tone: "#f0e3dd", emoji: "⌚" },
    { id: "cloud-sneakers", name: "Giày Cloud Walk", brand: "Bước Studio", price: 980000, tone: "#e5e9ea", emoji: "👟" },
    { id: "sip-bottle", name: "Bình giữ nhiệt Sip", brand: "Lành Living", price: 450000, tone: "#e0ece4", emoji: "🧴" },
    { id: "linen-shirt", name: "Áo linen Mây", brand: "Bước Studio", price: 690000, tone: "#eae8db", emoji: "👕" },
    { id: "ceramic-mug", name: "Cốc gốm Nắng", brand: "Nếp Home", price: 280000, tone: "#eee3d7", emoji: "☕" }
  ];
  const freeShippingThreshold = 500000;
  const shippingFee = 30000;
  const money = (value) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
  const $ = (selector) => document.querySelector(selector);
  let cart = readCart();

  function readCart() {
    try {
      const stored = JSON.parse(localStorage.getItem("moc-cart") || "[]");
      if (!Array.isArray(stored)) return [];
      return stored.filter((item) => item && products.some((product) => product.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0)
        .map((item) => ({ id: item.id, quantity: Math.min(item.quantity, 99), variant: typeof item.variant === "string" ? item.variant : "" }));
    } catch (error) {
      console.error("Không thể đọc dữ liệu giỏ hàng.", error);
      return [];
    }
  }

  function persistCart() {
    try {
      localStorage.setItem("moc-cart", JSON.stringify(cart));
      $("#header-cart-count").textContent = String(cart.reduce((sum, item) => sum + item.quantity, 0));
      return true;
    } catch (error) {
      console.error("Không thể lưu dữ liệu giỏ hàng.", error);
      showToast("Không thể lưu giỏ hàng trên thiết bị này.");
      return false;
    }
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2500);
  }

  function getSubtotal() {
    return cart.reduce((sum, item) => sum + products.find((product) => product.id === item.id).price * item.quantity, 0);
  }

  function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    $("#cart-count").textContent = count ? `(${count} món)` : "";
    $("#header-cart-count").textContent = count;
    const target = $("#cart-content");

    if (!cart.length) {
      target.innerHTML = `<div class="empty-cart"><div class="empty-icon" aria-hidden="true">♧</div><h2>Giỏ hàng đang đợi bạn.</h2><p>Có rất nhiều món xinh đang chờ được khám phá. Tìm món bạn yêu thích nhé!</p><a class="button button-dark" href="products.html">Khám phá sản phẩm <span>↗</span></a></div>`;
      return;
    }

    const subtotal = getSubtotal();
    const shipping = subtotal >= freeShippingThreshold ? 0 : shippingFee;
    const remaining = Math.max(0, freeShippingThreshold - subtotal);
    const rows = cart.map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      return `<article class="cart-row">
        <div class="item-image" style="--tone:${product.tone}" aria-hidden="true"><span>${product.emoji}</span></div>
        <div class="item-info"><a class="item-name" href="products.html?q=${encodeURIComponent(product.name)}">${product.name}</a><span class="item-brand">${product.brand}${item.variant ? ` · Cỡ ${item.variant}` : ""}</span><button class="remove-item" type="button" data-remove="${product.id}" data-variant="${item.variant}">Xóa sản phẩm</button></div>
        <span class="item-price">${money(product.price)}</span>
        <div class="quantity-control" aria-label="Số lượng ${product.name}"><button type="button" data-change="-1" data-id="${product.id}" data-variant="${item.variant}" aria-label="Giảm số lượng">−</button><input aria-label="Số lượng" value="${item.quantity}" readonly><button type="button" data-change="1" data-id="${product.id}" data-variant="${item.variant}" aria-label="Tăng số lượng">+</button></div>
        <strong class="item-total">${money(product.price * item.quantity)}</strong>
      </article>`;
    }).join("");

    target.innerHTML = `<div class="cart-layout">
      <div class="cart-items"><div class="cart-table-head"><span>Sản phẩm</span><span>Đơn giá</span><span>Số lượng</span><span>Tạm tính</span></div>${rows}</div>
      <aside class="order-summary"><h2>Tóm tắt đơn hàng</h2>
        <div class="summary-line"><span>Tạm tính</span><span>${money(subtotal)}</span></div>
        <div class="summary-line"><span>Phí vận chuyển</span><span>${shipping ? money(shipping) : "Miễn phí"}</span></div>
        <div class="shipping-progress"><strong>${remaining ? `Mua thêm ${money(remaining)} để được miễn phí giao hàng` : "Đơn hàng của bạn được miễn phí giao hàng!"}</strong><div class="progress-track"><span style="width:${Math.min(100, subtotal / freeShippingThreshold * 100)}%"></span></div></div>
        <div class="summary-total"><span>Tổng cộng</span><strong>${money(subtotal + shipping)}</strong></div>
        <p class="summary-note">Thuế được tính (nếu có) khi xác nhận đơn hàng.</p>
        <form class="promo-form" id="promo-form"><label class="sr-only" for="promo-code">Mã ưu đãi</label><input id="promo-code" placeholder="Mã ưu đãi" autocomplete="off"><button type="submit">Áp dụng</button></form>
        <a class="button button-dark checkout-button" href="checkout.html">Tiến hành đặt hàng <span>↗</span></a><p class="secure-note">♢ Thông tin được bảo mật an toàn</p>
      </aside>
    </div>`;
  }

  function updateQuantity(button) {
    const item = cart.find((entry) => entry.id === button.dataset.id && entry.variant === button.dataset.variant);
    if (!item) return;
    item.quantity = Math.min(99, Math.max(0, item.quantity + Number(button.dataset.change)));
    cart = cart.filter((entry) => entry.quantity > 0);
    if (persistCart()) renderCart();
  }

  function removeItem(button) {
    cart = cart.filter((item) => !(item.id === button.dataset.remove && item.variant === button.dataset.variant));
    if (persistCart()) renderCart();
    showToast("Đã xóa sản phẩm khỏi giỏ hàng.");
  }

  function initialize() {
    persistCart();
    renderCart();
    $("#cart-content").addEventListener("click", (event) => {
      const change = event.target.closest("[data-change]");
      const remove = event.target.closest("[data-remove]");
      if (change) updateQuantity(change);
      if (remove) removeItem(remove);
    });
    $("#cart-content").addEventListener("submit", (event) => {
      if (event.target.id !== "promo-form") return;
      event.preventDefault();
      const code = $("#promo-code").value.trim();
      showToast(code ? "Mã ưu đãi này chưa áp dụng được cho đơn hàng mẫu." : "Vui lòng nhập mã ưu đãi.");
    });
    $("#menu-toggle").addEventListener("click", () => {
      const open = $("#main-nav").classList.toggle("is-open");
      $("#menu-toggle").setAttribute("aria-expanded", String(open));
      $("#menu-toggle").setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    });
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();
