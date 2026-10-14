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

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function readCart() {
    try {
      const stored = JSON.parse(localStorage.getItem("moc-cart") || "[]");
      if (!Array.isArray(stored)) return [];
      return stored
        .filter((item) => item && products.some((product) => product.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0)
        .map((item) => ({ id: item.id, quantity: Math.min(item.quantity, 99), variant: typeof item.variant === "string" ? item.variant : "" }));
    } catch (error) {
      console.error("Không thể đọc giỏ hàng.", error);
      return [];
    }
  }

  function updateBadge(cart) {
    $("#header-cart-count").textContent = String(cart.reduce((sum, item) => sum + item.quantity, 0));
  }

  function renderEmpty() {
    $("#checkout-content").innerHTML = `<div class="empty-checkout"><div class="empty-checkout-icon" aria-hidden="true">♧</div><h2>Giỏ hàng của bạn đang trống.</h2><p>Chọn vài món bạn yêu thích trước khi tiến hành thanh toán nhé.</p><a class="button button-dark" href="products.html">Quay lại mua sắm <span>↗</span></a></div>`;
  }

  function renderCheckout(cart) {
    const subtotal = cart.reduce((sum, item) => sum + products.find((product) => product.id === item.id).price * item.quantity, 0);
    const shipping = subtotal >= freeShippingThreshold ? 0 : shippingFee;
    const rows = cart.map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      return `<div class="checkout-item">
        <div class="checkout-item-visual" style="--tone:${product.tone}" aria-hidden="true">${product.emoji}</div>
        <div><strong class="checkout-item-name">${product.name}</strong><span class="checkout-item-detail">${product.brand} · ${item.quantity} sản phẩm${item.variant ? ` · Cỡ ${item.variant}` : ""}</span></div>
        <strong class="checkout-item-price">${money(product.price * item.quantity)}</strong>
      </div>`;
    }).join("");

    $("#checkout-content").innerHTML = `<form class="checkout-layout" id="checkout-form" novalidate>
      <div class="checkout-form-sections">
        <section class="form-section"><h2><span class="step-number">01</span> Thông tin giao hàng</h2>
          <div class="form-grid">
            <label class="form-field field-full">Họ và tên<input name="name" autocomplete="name" required maxlength="100" placeholder="Nguyễn Minh Anh"></label>
            <label class="form-field">Email<input name="email" type="email" autocomplete="email" required maxlength="150" placeholder="ban@email.com"></label>
            <label class="form-field">Số điện thoại<input name="phone" type="tel" inputmode="tel" pattern="[+]?[0-9]{8,15}" autocomplete="tel" required placeholder="0901234567"></label>
            <label class="form-field field-full">Địa chỉ nhận hàng<input name="address" autocomplete="street-address" required maxlength="200" placeholder="Số nhà, tên đường, phường/xã"></label>
            <label class="form-field">Tỉnh / Thành phố<input name="city" autocomplete="address-level1" required maxlength="100" placeholder="TP. Hồ Chí Minh"></label>
            <label class="form-field">Mã bưu chính <span>(không bắt buộc)</span><input name="postal" autocomplete="postal-code" inputmode="numeric" pattern="[0-9]{4,10}" placeholder="700000"></label>
            <label class="form-field field-full">Ghi chú <span>(không bắt buộc)</span><textarea name="note" rows="3" maxlength="500" placeholder="Lưu ý cho Mộc hoặc người giao hàng..."></textarea></label>
          </div>
        </section>
        <section class="form-section"><h2><span class="step-number">02</span> Phương thức thanh toán</h2>
          <div class="payment-list">
            <label class="payment-option"><input type="radio" name="payment" value="cod" checked><span class="payment-icon" aria-hidden="true">₫</span><span><strong>Thanh toán khi nhận hàng</strong><small>Thanh toán bằng tiền mặt khi nhận được hàng</small></span></label>
            <label class="payment-option"><input type="radio" name="payment" value="bank"><span class="payment-icon" aria-hidden="true">↗</span><span><strong>Chuyển khoản ngân hàng</strong><small>Thông tin chuyển khoản sẽ được xác nhận sau khi đặt hàng</small></span></label>
          </div>
        </section>
        <div class="form-actions"><a class="button button-outline" href="cart.html">← Quay lại giỏ hàng</a><button class="button button-dark" type="submit">Xác nhận đặt hàng <span>↗</span></button></div>
      </div>
      <aside class="order-summary"><h2>Đơn hàng của bạn</h2><div class="checkout-items">${rows}</div>
        <div class="summary-line"><span>Tạm tính</span><span>${money(subtotal)}</span></div>
        <div class="summary-line"><span>Phí vận chuyển</span><span>${shipping ? money(shipping) : "Miễn phí"}</span></div>
        <div class="free-shipping-note">${subtotal >= freeShippingThreshold ? "Đơn hàng được miễn phí giao hàng." : `Mua thêm ${money(freeShippingThreshold - subtotal)} để được miễn phí giao hàng.`}</div>
        <div class="summary-total"><span>Tổng thanh toán</span><strong>${money(subtotal + shipping)}</strong></div>
        <p class="secure-note">Thông tin chỉ được dùng để xử lý đơn hàng mẫu.</p>
      </aside>
    </form>`;
  }

  function escapeHTML(value) {
    return value.replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function handleSubmit(cart) {
    $("#checkout-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = data.get("name").toString().trim();
      try {
        localStorage.setItem("moc-cart", "[]");
      } catch (error) {
        console.error("Không thể cập nhật giỏ hàng sau khi đặt đơn.", error);
        showToast("Không thể hoàn tất đơn hàng do trình duyệt không lưu được dữ liệu.");
        return;
      }

      updateBadge([]);
      $("#checkout-content").hidden = true;
      const orderId = `MOC-${Date.now().toString().slice(-8)}`;
      $("#order-success").innerHTML = `<div class="success-icon" aria-hidden="true">✓</div><span class="eyebrow">MỘC ĐÃ NHẬN ĐƯỢC ĐƠN HÀNG</span><h2>Cảm ơn ${escapeHTML(name)}!</h2><p>Mã đơn hàng mẫu <strong>${orderId}</strong>. Đơn có ${cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm. Đây là bản front-end minh họa nên đơn hàng chưa được gửi đến máy chủ.</p><a class="button button-dark" href="products.html">Tiếp tục mua sắm <span>↗</span></a></div>`;
      $("#order-success").hidden = false;
      $("#order-success").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function initialize() {
    const cart = readCart();
    updateBadge(cart);
    if (!cart.length) {
      renderEmpty();
    } else {
      renderCheckout(cart);
      handleSubmit(cart);
    }
    $("#menu-toggle").addEventListener("click", () => {
      const open = $("#main-nav").classList.toggle("is-open");
      $("#menu-toggle").setAttribute("aria-expanded", String(open));
      $("#menu-toggle").setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    });
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();
