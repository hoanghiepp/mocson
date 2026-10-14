# Mộc Sơn Eco Resort & Wellness Retreat

Dự án Website giới thiệu Khu du lịch / Resort nghỉ dưỡng sinh thái cao cấp, hiện đại và chuẩn **Responsive** (tối ưu hiển thị hoàn hảo trên điện thoại, máy tính bảng và máy tính).

Xây dựng hoàn toàn bằng **HTML5, CSS3 và JavaScript thuần (ES6+)**, không phụ thuộc vào framework nặng, tốc độ tải nhanh và giao diện thanh lịch.

---

## 🌲 1. Cấu trúc thư mục dự án

```text
dự án mới/
├── index.html                 # Trang chủ chính với đầy đủ các section
├── README.md                  # Tài liệu hướng dẫn sử dụng & triển khai
├── css/
│   └── style.css              # Toàn bộ mã định kiểu CSS (Biến màu, Grid/Flexbox, Animation, Media Queries)
├── js/
│   ├── data.js                # Dữ liệu mẫu (Mock data) về phòng, tour, tiện ích, đánh giá
│   └── main.js                # Xử lý tương tác: Menu, Slider, Bộ lọc, Popup đặt phòng & kiểm tra hợp lệ
├── images/
│   └── logo.svg               # Logo thương hiệu Mộc Sơn dạng vector SVG
└── components/
    └── room-card.html         # Mẫu component thẻ phòng tái sử dụng
```

---

## 🌟 2. Các phần nội dung chính (Sections)

1. **Header (Đầu trang):**
   - Logo thương hiệu Mộc Sơn Eco Resort (Vector SVG).
   - Menu điều hướng mượt mà: Trang chủ, Giới thiệu, Tiện ích, Phòng & Bảng giá, Tour trải nghiệm, Đánh giá, Liên hệ.
   - Hotline hỗ trợ `1900 6868` và nút CTA "Đặt phòng ngay".
   - Hamburger menu linh hoạt với hiệu ứng trượt mượt mà trên thiết bị di động.
   - Header tự động thu gọn và đổi nền kính mờ (Backdrop filter blur) khi cuộn chuột (`.scrolled`).

2. **Hero Banner:**
   - Slider trình chiếu phong cảnh thiên nhiên hùng vĩ mượt mà (Hồ nước, núi đồi, sương mây, rừng thông).
   - Slogan & thông điệp chào đón ấn tượng.
   - Nút mũi tên chuyển slide và các chấm tròn (dots) chỉ báo trạng thái.
   - **Thanh tìm kiếm & đặt phòng nhanh (Quick Booking Bar)** tích hợp trực tiếp: Chọn loại dịch vụ, Ngày đến, Ngày đi, Số lượng khách. Tự động đồng bộ sang popup đặt phòng.

3. **Giới thiệu (About Us):**
   - Câu chuyện triết lý nghỉ dưỡng xanh kết nối thiên nhiên và chữa lành.
   - 4 Điểm nhấn cốt lõi: Không khí thuần khiết, Ẩm thực Farm-to-Table, Khoáng nóng Onsen, Kiến trúc sinh thái.
   - Huy hiệu nổi bật "15+ Năm kiến tạo không gian sống xanh".
   - Dải băng thống kê ấn tượng (120+ Ha Rừng bảo tồn, 45+ Villa & Bungalow, 99.2% Khách hài lòng, 24/7 Dịch vụ tận tâm).

4. **Dịch vụ & Tiện ích (Amenities):**
   - Thẻ dịch vụ 5 sao: Bể bơi vô cực nước ấm 32°C trên mây, Nhà hàng Mộc Vị, Onsen & Spa thảo dược, Khu cắm trại Glamping, Sân Teambuilding 10.000m², Vườn sinh thái giáo dục.

5. **Phòng & Bảng giá (Rooms & Suites):**
   - Bộ lọc danh mục theo nút bấm: *Tất cả, Biệt thự / Villa, Bungalow gỗ, Glamping ngắm sao, Phòng Suite Panorama*.
   - Render tự động từ file dữ liệu `js/data.js`.
   - Hiển thị đầy đủ: Ảnh chất lượng cao, giá tiền định dạng VNĐ, diện tích, sức chứa, loại giường, tầm nhìn, danh sách tiện ích, nút xem chi tiết và đặt phòng.

6. **Tour & Trải nghiệm (Activities):**
   - Các hoạt động ngoài trời đặc sắc: Chèo thuyền Kayak & SUP đón bình minh, Trekking rừng nguyên sinh, Tiệc BBQ lửa trại & nhạc Acoustic, Nông trại hữu cơ & học nấu ăn bản địa.

7. **Đánh giá của khách hàng (Testimonials):**
   - Slider đánh giá với số sao, avatar, tên khách hàng, thời gian và loại phòng từng lưu trú.
   - Tự động chuyển slide hoặc bấm nút mũi tên / dấu chấm.

8. **Footer (Chân trang):**
   - Thông tin giới thiệu, các kênh mạng xã hội.
   - Địa chỉ chi tiết, Hotline, Email, giờ nhận/trả phòng.
   - Bản đồ Google Maps nhúng trực quan.
   - Form đăng ký email nhận ưu đãi voucher 10% có thông báo Toast.

---

## ⚡ 3. Tính năng JavaScript & Tương tác

- **Kiểm tra dữ liệu biểu mẫu đặt phòng (Validation):**
  - Tự động gán ngày nhận phòng nhỏ nhất là ngày hôm nay.
  - Ngày trả phòng tự động kiểm tra phải sau ngày nhận phòng ít nhất 1 ngày.
  - Bắt buộc số lượng khách tối thiểu 1 người.
  - Kiểm tra định dạng số điện thoại Việt Nam 10 chữ số.
- **Tính toán chi phí tạm tính trực tiếp (Live Price Estimation):**
  - Tự động nhân theo số đêm đối với phòng nghỉ.
  - Tự động nhân theo số lượng khách đối với tour du lịch.
- **Xem nhanh chi tiết phòng (Quick View Modal / Lightbox):**
  - Xem ảnh kích thước lớn, thumbnail chuyển đổi ảnh, đầy đủ thông số kỹ thuật.
- **Toast Notifications:**
  - Thông báo nổi góc màn hình phong cách hiện đại khi gửi đơn đặt phòng hoặc đăng ký nhận tin.
- **Back to Top:** Nút cuộn nhanh lên đầu trang tự động ẩn/hiện theo độ cuộn chuột.

---

## 🚀 4. Hướng dẫn chạy website

Website được viết hoàn toàn bằng công nghệ Web chuẩn (HTML, CSS, JS), bạn có thể chạy theo các cách sau:

### Cách 1: Mở trực tiếp
Nhấp đúp chuột vào file `index.html` để mở trên bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Cốc Cốc, Safari...).

### Cách 2: Chạy qua Local Web Server (Khuyên dùng)
Nếu máy tính đã cài **Python**, mở Terminal / PowerShell tại thư mục này và gõ:
```bash
python -m http.server 8000
```
Sau đó truy cập: [http://localhost:8000](http://localhost:8000)

Hoặc nếu dùng **Visual Studio Code**, bấm chuột phải vào `index.html` và chọn **Open with Live Server**.

---

## 🎨 5. Tùy chỉnh dữ liệu & Giao diện

- **Thêm/Sửa phòng và tour:** Mở file [`js/data.js`](js/data.js) và chỉnh sửa mảng `rooms` hoặc `tours`.
- **Thay đổi màu sắc chủ đạo:** Mở file [`css/style.css`](css/style.css) tại phần `:root`, bạn có thể dễ dàng thay đổi mã màu `--color-primary` (Xanh lá rừng), `--color-accent` (Vàng cát), v.v.

## 🛍️ 6. Trang cửa hàng và thanh toán mẫu

Các trang giỏ hàng và thanh toán front-end nằm tại `cart.html` và `checkout.html`. Nút đặt hàng ở giỏ dẫn đến trang thanh toán; trang này đọc sản phẩm từ khóa LocalStorage `moc-cart`, hiển thị phí vận chuyển, xác thực thông tin giao hàng và xóa giỏ sau khi xác nhận đơn mẫu.

- Giao diện: `css/cart.css` và `css/checkout.css`.
- Xử lý giỏ và thanh toán: `js/cart-page.js` và `js/checkout-page.js`.
- Đơn hàng chỉ được mô phỏng trên trình duyệt, chưa được gửi tới máy chủ hoặc cổng thanh toán.
