(function () {
  const products = window.MOC_PRODUCTS || [];
  const money = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  function readCart() {
    try {
      const data = JSON.parse(localStorage.getItem("moc-cart") || "[]");
      if (!Array.isArray(data)) return [];
      return data
        .filter(
          (item) =>
            item &&
            products.some((product) => product.id === item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0,
        )
        .map((item) => ({
          id: item.id,
          quantity: Math.min(item.quantity, 99),
          variant: typeof item.variant === "string" ? item.variant : "",
        }));
    } catch (error) {
      console.error("Không thể đọc giỏ hàng đã lưu.", error);
      return [];
    }
  }
  let cart = readCart();
  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll("#cart-count").forEach((node) => {
      node.textContent = count;
    });
  }
  function saveCart() {
    try {
      localStorage.setItem("moc-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Không thể lưu giỏ hàng.", error);
      showToast("Không thể lưu giỏ hàng trên thiết bị này. Vui lòng thử lại.");
    }
    updateCartCount();
  }
  function showToast(message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      document.body.append(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(
      () => toast.classList.remove("is-visible"),
      2600,
    );
  }
  function addToCart(id, quantity, variant) {
    const product = products.find((item) => item.id === id);
    if (!product) return;
    const option = variant || "";
    const existing = cart.find(
      (item) => item.id === id && item.variant === option,
    );
    if (existing)
      existing.quantity = Math.min(99, existing.quantity + quantity);
    else cart.push({ id, quantity: Math.min(99, quantity), variant: option });
    saveCart();
    showToast(`${product.name} đã được thêm vào giỏ hàng.`);
  }
  function productCard(product) {
    return `<article class="product-card"><div class="product-image-wrap"><a class="product-image" href="product-detail.html?id=${encodeURIComponent(product.id)}"><img src="${product.image}" alt="${product.name}" loading="lazy">${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}</a><button class="quick-add" type="button" data-add="${product.id}" aria-label="Thêm ${product.name} vào giỏ">+</button></div><div class="product-meta"><span>${product.brand}</span><span class="product-rating">★ ${product.rating}</span></div><a class="product-name" href="product-detail.html?id=${encodeURIComponent(product.id)}">${product.name}</a><div class="product-pricing"><strong>${money(product.price)}</strong>${product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : ""}</div></article>`;
  }
  function renderProducts(target, items) {
    if (target) target.innerHTML = items.map(productCard).join("");
  }
  function setupHeader() {
    updateCartCount();
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("main-nav");
    if (toggle && nav)
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
      });
    const form = document.getElementById("search-form");
    if (form)
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = new FormData(form).get("q").toString().trim();
        window.location.href = `products.html${query ? `?q=${encodeURIComponent(query)}` : ""}`;
      });
  }
  function setupHome() {
    renderProducts(
      document.getElementById("featured-products"),
      products.slice(0, 4),
    );
    const form = document.getElementById("newsletter-form");
    if (form)
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        showToast("Cảm ơn bạn đã đăng ký nhận tin từ Mộc!");
        form.reset();
      });
  }
  function setupCatalog() {
    const grid = document.getElementById("catalog-products");
    if (!grid) return;
    const params = new URLSearchParams(window.location.search);
    let query = (params.get("q") || "").trim().toLocaleLowerCase("vi");
    const categories = [...new Set(products.map((item) => item.category))];
    const brands = [...new Set(products.map((item) => item.brand))];
    const categoryQuery = params.get("category") || "";
    const options = (values, group, selected) =>
      values
        .map(
          (value) =>
            `<label class="filter-option"><input type="checkbox" name="${group}" value="${value}" ${selected.includes(value) ? "checked" : ""}><span>${value}</span><small>${products.filter((item) => item[group] === value).length}</small></label>`,
        )
        .join("");
    document.getElementById("category-filters").innerHTML = options(
      categories,
      "category",
      categoryQuery ? [categoryQuery] : [],
    );
    document.getElementById("brand-filters").innerHTML = options(
      brands,
      "brand",
      [],
    );
    const render = () => {
      const category = [
        ...document.querySelectorAll('input[name="category"]:checked'),
      ].map((item) => item.value);
      const brand = [
        ...document.querySelectorAll('input[name="brand"]:checked'),
      ].map((item) => item.value);
      const min = Number(document.getElementById("min-price").value) || 0;
      const max =
        Number(document.getElementById("max-price").value) || Infinity;
      let result = products.filter((item) => {
        const matchesQuery =
          !query ||
          `${item.name} ${item.brand} ${item.category}`
            .toLocaleLowerCase("vi")
            .includes(query);
        return (
          matchesQuery &&
          (!category.length || category.includes(item.category)) &&
          (!brand.length || brand.includes(item.brand)) &&
          item.price >= min &&
          item.price <= max
        );
      });
      const sort = document.getElementById("sort-products").value;
      if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
      if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
      if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
      document.getElementById("result-count").textContent =
        `${result.length} sản phẩm${query ? ` cho “${params.get("q")}”` : ""}`;
      grid.hidden = result.length === 0;
      document.getElementById("empty-products").hidden = result.length !== 0;
      renderProducts(grid, result);
    };
    document.getElementById("filters").addEventListener("change", render);
    document.getElementById("apply-price").addEventListener("click", render);
    document.getElementById("sort-products").addEventListener("change", render);
    const clear = () => {
      query = "";
      document
        .querySelectorAll("#filters input[type=checkbox]")
        .forEach((item) => {
          item.checked = false;
        });
      document.getElementById("min-price").value = "";
      document.getElementById("max-price").value = "";
      window.history.replaceState({}, "", "products.html");
      render();
    };
    document.getElementById("clear-filters").addEventListener("click", clear);
    document.getElementById("reset-search").addEventListener("click", clear);
    render();
  }
  function setupDetail() {
    const target = document.getElementById("product-detail");
    if (!target) return;
    const id = new URLSearchParams(window.location.search).get("id");
    const product = products.find((item) => item.id === id) || products[0];
    document.title = `${product.name} — Mộc Market`;
    document.getElementById("detail-breadcrumb").textContent = product.name;
    target.innerHTML = `<div class="detail-image"><span class="detail-image-mark">MỘC / 01</span><img src="${product.image}" alt="${product.name}"></div><div class="detail-info"><span class="eyebrow">${product.brand} · ${product.category}</span><h1>${product.name}</h1><div class="detail-rating"><span>★★★★★</span><strong>${product.rating}</strong><a href="#reviews">(${product.reviews} đánh giá)</a></div><div class="detail-price"><strong>${money(product.price)}</strong>${product.oldPrice ? `<del>${money(product.oldPrice)}</del><span class="discount-note">Ưu đãi có hạn</span>` : ""}</div><p class="detail-description">${product.description}</p><div class="detail-divider"></div><p class="option-label">Màu sắc <strong>${product.color}</strong></p><div class="color-swatch" aria-label="Màu ${product.color}"><span></span>${product.color}</div>${product.sizes.length ? `<label class="option-label" for="product-size">Kích thước</label><select id="product-size" class="size-select"><option value="">Chọn kích thước</option>${product.sizes.map((size) => `<option value="${size}">${size}</option>`).join("")}</select>` : ""}<div class="purchase-row"><div class="quantity-control"><button type="button" data-qty="-1" aria-label="Giảm số lượng">−</button><input id="detail-quantity" type="number" min="1" max="99" value="1" aria-label="Số lượng"><button type="button" data-qty="1" aria-label="Tăng số lượng">+</button></div><button class="button button-dark detail-add" id="detail-add" type="button">Thêm vào giỏ <span>↗</span></button></div><button class="button button-outline buy-now" id="buy-now" type="button">Mua ngay</button><div class="detail-assurance"><span>✓</span> Miễn phí vận chuyển từ 500.000đ <span>·</span> Đổi trả trong 30 ngày</div></div>`;
    target.addEventListener("click", (event) => {
      const button = event.target.closest("[data-qty]");
      if (button) {
        const input = document.getElementById("detail-quantity");
        input.value = Math.max(
          1,
          Math.min(99, Number(input.value) + Number(button.dataset.qty)),
        );
      }
    });
    const buy = (redirect) => {
      const quantity = Math.max(
        1,
        Math.min(
          99,
          Number(document.getElementById("detail-quantity").value) || 1,
        ),
      );
      const size = document.getElementById("product-size")
        ? document.getElementById("product-size").value
        : "";
      if (product.sizes.length && !size) {
        document.getElementById("product-size").focus();
        showToast("Vui lòng chọn kích thước.");
        return;
      }
      addToCart(product.id, quantity, size);
      if (redirect) window.location.href = "checkout.html";
    };
    document
      .getElementById("detail-add")
      .addEventListener("click", () => buy(false));
    document
      .getElementById("buy-now")
      .addEventListener("click", () => buy(true));
    const related = products
      .filter(
        (item) => item.id !== product.id && item.category === product.category,
      )
      .concat(
        products.filter(
          (item) =>
            item.id !== product.id && item.category !== product.category,
        ),
      )
      .slice(0, 4);
    renderProducts(document.getElementById("related-products"), related);
  }
  function setupCart() {
    const target = document.getElementById("cart-content");
    if (!target) return;
    const render = () => {
      document.getElementById("cart-title-count").textContent = cart.length
        ? `(${cart.reduce((sum, item) => sum + item.quantity, 0)})`
        : "";
      if (!cart.length) {
        target.innerHTML = `<div class="empty-cart"><div class="empty-cart-icon">♧</div><h2>Giỏ hàng đang đợi bạn.</h2><p>Hãy dạo quanh một chút, chắc chắn sẽ có món khiến bạn mỉm cười.</p><a href="products.html" class="button button-dark">Khám phá sản phẩm <span>↗</span></a></div>`;
        return;
      }
      const subtotal = cart.reduce(
        (sum, item) =>
          sum +
          products.find((product) => product.id === item.id).price *
            item.quantity,
        0,
      );
      const rows = cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.id);
          return `<article class="cart-item"><a class="cart-product-image" href="product-detail.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a><div class="cart-product-info"><a href="product-detail.html?id=${product.id}">${product.name}</a><span>${product.brand}${item.variant ? ` · Cỡ ${item.variant}` : ""}</span><button type="button" class="remove-item" data-remove="${item.id}" data-variant="${item.variant}">Xóa</button></div><span class="cart-unit-price">${money(product.price)}</span><div class="quantity-control cart-quantity"><button type="button" data-change="-1" data-id="${item.id}" data-variant="${item.variant}" aria-label="Giảm số lượng">−</button><input value="${item.quantity}" readonly aria-label="Số lượng ${product.name}"><button type="button" data-change="1" data-id="${item.id}" data-variant="${item.variant}" aria-label="Tăng số lượng">+</button></div><strong class="cart-line-total">${money(product.price * item.quantity)}</strong></article>`;
        })
        .join("");
      target.innerHTML = `<div class="cart-layout"><div class="cart-items"><div class="cart-table-head"><span>Sản phẩm</span><span>Đơn giá</span><span>Số lượng</span><span>Tạm tính</span></div>${rows}</div><aside class="order-summary"><h2>Tóm tắt đơn hàng</h2><div class="summary-line"><span>Tạm tính</span><span>${money(subtotal)}</span></div><div class="summary-line"><span>Phí vận chuyển</span><span>${subtotal >= 500000 ? "Miễn phí" : money(30000)}</span></div><div class="summary-total"><span>Tổng cộng</span><strong>${money(subtotal + (subtotal >= 500000 ? 0 : 30000))}</strong></div><p>Đã bao gồm thuế VAT (nếu có).</p><a href="checkout.html" class="button button-dark checkout-button">Tiến hành thanh toán <span>↗</span></a><div class="secure-note">♢ Thanh toán an toàn & bảo mật</div></aside></div>`;
    };
    target.addEventListener("click", (event) => {
      const remove = event.target.closest("[data-remove]");
      const change = event.target.closest("[data-change]");
      if (remove)
        cart = cart.filter(
          (item) =>
            !(
              item.id === remove.dataset.remove &&
              item.variant === remove.dataset.variant
            ),
        );
      if (change) {
        const item = cart.find(
          (entry) =>
            entry.id === change.dataset.id &&
            entry.variant === change.dataset.variant,
        );
        if (item)
          item.quantity = Math.min(
            99,
            Math.max(0, item.quantity + Number(change.dataset.change)),
          );
        cart = cart.filter((item) => item.quantity > 0);
      }
      if (remove || change) {
        saveCart();
        render();
      }
    });
    render();
  }
  function setupCheckout() {
    const target = document.getElementById("checkout-content");
    if (!target) return;
    if (!cart.length) {
      target.innerHTML = `<div class="empty-cart"><div class="empty-cart-icon">♧</div><h2>Chưa có sản phẩm để thanh toán.</h2><p>Thêm món đồ bạn yêu thích vào giỏ hàng trước nhé.</p><a href="products.html" class="button button-dark">Khám phá sản phẩm <span>↗</span></a></div>`;
      return;
    }
    const subtotal = cart.reduce(
      (sum, item) =>
        sum +
        products.find((product) => product.id === item.id).price *
          item.quantity,
      0,
    );
    const shipping = subtotal >= 500000 ? 0 : 30000;
    const items = cart
      .map((item) => {
        const product = products.find((entry) => entry.id === item.id);
        return `<div class="checkout-item"><img src="${product.image}" alt=""><div><strong>${product.name}</strong><small>${item.quantity} × ${money(product.price)}${item.variant ? ` · Cỡ ${item.variant}` : ""}</small></div><b>${money(product.price * item.quantity)}</b></div>`;
      })
      .join("");
    target.innerHTML = `<form class="checkout-layout" id="checkout-form"><div class="checkout-fields"><section class="form-section"><h2><span>01</span> Thông tin giao hàng</h2><div class="form-grid"><label class="form-field field-full">Họ và tên<input name="name" autocomplete="name" required placeholder="Nguyễn Minh Anh"></label><label class="form-field">Email<input name="email" type="email" autocomplete="email" required placeholder="ban@email.com"></label><label class="form-field">Số điện thoại<input name="phone" type="tel" autocomplete="tel" pattern="[+]?[0-9]{8,15}" required placeholder="0901234567"></label><label class="form-field field-full">Địa chỉ<input name="address" autocomplete="street-address" required placeholder="Số nhà, tên đường"></label><label class="form-field">Tỉnh / Thành phố<input name="city" autocomplete="address-level1" required placeholder="TP. Hồ Chí Minh"></label><label class="form-field">Mã bưu chính<input name="postal" autocomplete="postal-code" placeholder="700000"></label><label class="form-field field-full">Ghi chú đơn hàng <span>(không bắt buộc)</span><textarea name="note" rows="3" placeholder="Lưu ý cho người giao hàng..."></textarea></label></div></section><section class="form-section"><h2><span>02</span> Phương thức thanh toán</h2><div class="payment-options"><label class="payment-option"><input type="radio" name="payment" value="cod" checked><span class="payment-icon">₫</span><span><strong>Thanh toán khi nhận hàng</strong><small>Thanh toán bằng tiền mặt khi nhận được hàng</small></span><i></i></label><label class="payment-option"><input type="radio" name="payment" value="bank"><span class="payment-icon">↗</span><span><strong>Chuyển khoản ngân hàng</strong><small>Thông tin chuyển khoản sẽ gửi sau khi đặt hàng</small></span><i></i></label></div></section></div><aside class="order-summary checkout-summary"><h2>Đơn hàng của bạn</h2><div class="checkout-items">${items}</div><div class="summary-line"><span>Tạm tính</span><span>${money(subtotal)}</span></div><div class="summary-line"><span>Vận chuyển</span><span>${shipping ? money(shipping) : "Miễn phí"}</span></div><div class="summary-total"><span>Tổng cộng</span><strong>${money(subtotal + shipping)}</strong></div><button type="submit" class="button button-dark checkout-button">Đặt hàng <span>↗</span></button><p class="secure-note">Bằng cách đặt hàng, bạn đồng ý với điều khoản mua hàng của Mộc.</p></aside></form>`;
    target.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      if (!form.reportValidity()) return;
      const name = new FormData(form).get("name").toString();
      cart = [];
      saveCart();
      target.innerHTML = `<div class="order-success"><span>✓</span><span class="eyebrow">MỘC ĐÃ NHẬN ĐƯỢC ĐƠN HÀNG</span><h2>Cảm ơn ${name}!</h2><p>Đơn hàng của bạn đã được ghi nhận. Chúng mình sẽ liên hệ sớm để xác nhận thông tin giao hàng.</p><a class="button button-dark" href="index.html">Trở về trang chủ <span>↗</span></a></div>`;
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    setupHeader();
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-add]");
      if (button) {
        event.preventDefault();
        event.stopPropagation();
        addToCart(button.dataset.add, 1, "");
      }
    });
    setupHome();
    setupCatalog();
    setupDetail();
    setupCart();
    setupCheckout();
  });
})();
