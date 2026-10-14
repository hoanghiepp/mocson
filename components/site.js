(function () {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header)
    header.innerHTML = `
    <div class="announcement"><span>✳</span> Một món quà nhỏ: miễn phí vận chuyển cho đơn từ 500.000đ <a href="products.html">Khám phá ngay ↗</a></div>
    <header class="site-header"><div class="container header-main">
      <button class="menu-toggle" id="menu-toggle" type="button" aria-label="Mở menu" aria-expanded="false"><span></span><span></span></button>
      <a class="brand" href="index.html" aria-label="Mộc Market - Trang chủ"><span class="brand-mark">m.</span><span>mộc<span class="brand-sub">market</span></span></a>
      <nav class="main-nav" id="main-nav" aria-label="Điều hướng chính"><a href="index.html">Trang chủ</a><a href="products.html">Sản phẩm</a><a href="products.html?category=Nhà%20cửa">Nhà cửa</a><a href="products.html?category=Thời%20trang">Phong cách</a><a href="#site-footer">Về Mộc</a></nav>
      <form class="header-search" id="search-form" role="search"><button type="submit" aria-label="Tìm kiếm">⌕</button><input type="search" name="q" placeholder="Bạn đang tìm gì?" aria-label="Tìm kiếm sản phẩm"></form>
      <a class="cart-link" href="cart.html" aria-label="Giỏ hàng"><span class="cart-icon">♧</span><span class="cart-label">Giỏ hàng</span><span class="cart-count" id="cart-count">0</span></a>
    </div></header>`;
  if (footer)
    footer.innerHTML = `
    <footer class="site-footer"><div class="container footer-main">
      <div class="footer-about"><a class="brand footer-brand" href="index.html"><span class="brand-mark">m.</span><span>mộc<span class="brand-sub">market</span></span></a><p>Chọn những điều tốt đẹp, tận hưởng những khoảnh khắc bình thường.</p><div class="social-links"><a href="#site-footer" aria-label="Instagram">ig</a><a href="#site-footer" aria-label="Facebook">f</a><a href="#site-footer" aria-label="Pinterest">p</a></div></div>
      <div class="footer-column"><h2>Khám phá</h2><a href="products.html">Tất cả sản phẩm</a><a href="products.html?category=Phụ%20kiện">Phụ kiện</a><a href="products.html?category=Nhà%20cửa">Nhà cửa</a><a href="products.html?category=Thời%20trang">Thời trang</a></div>
      <div class="footer-column"><h2>Hỗ trợ</h2><a href="#site-footer">Chính sách giao hàng</a><a href="#site-footer">Đổi trả & hoàn tiền</a><a href="#site-footer">Câu hỏi thường gặp</a><a href="mailto:xinchao@mocmarket.vn">Liên hệ với Mộc</a></div>
      <div class="footer-contact"><h2>Ghé thăm Mộc</h2><p>12 Nguyễn Văn Bình, Quận 1<br>TP. Hồ Chí Minh, Việt Nam</p><a href="mailto:xinchao@mocmarket.vn">xinchao@mocmarket.vn</a><p>Thứ 2 – Thứ 7, 9:00 – 18:00</p></div>
    </div><div class="container footer-bottom"><span>© 2025 Mộc Market. Làm bằng sự tử tế.</span><span>Điều khoản&nbsp;&nbsp; · &nbsp;&nbsp;Bảo mật</span><a href="#top">Lên đầu trang ↑</a></div></footer>`;
})();
