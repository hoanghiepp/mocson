/**
 * Dữ liệu mẫu (Mock Data) - Mộc Sơn Eco Resort & Retreat
 * Chứa danh sách phòng, tour trải nghiệm, tiện ích, đánh giá từ khách hàng.
 */

const RESORT_DATA = {
  // Thông tin chung
  info: {
    name: "Mộc Sơn Eco Resort & Retreat",
    slogan: "Trở về với thiên nhiên - Đánh thức mọi giác quan",
    address: "Thung Lũng Mây Ngàn, Bản Suối Cỏ, Huyện Mai Châu, Hòa Bình (hoặc Bảo Lộc, Lâm Đồng)",
    hotline: "1900 6868 - 0988 123 456",
    email: "booking@mocsonresort.vn",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    rating: 4.9,
    reviewsCount: 1248
  },

  // Danh mục phòng lưu trú
  rooms: [
    {
      id: "room-01",
      name: "Villa Hồ Ngọc Bích (Private Pool)",
      category: "villa",
      categoryName: "Biệt thự cao cấp",
      price: 4850000,
      priceFormatted: "4.850.000đ",
      unit: "đêm",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Biệt thự biệt lập view trực diện lòng hồ ngọc bích, sở hữu bể bơi nước ấm vô cực riêng, sân tắm nắng bằng gỗ teak và bồn tắm đá lộ thiên.",
      area: "120m²",
      capacity: "2-4 Người lớn + 2 Trẻ em",
      bed: "1 Giường King lớn + 1 Giường đôi",
      view: "View Hồ & Núi đá vôi",
      isFeatured: true,
      tag: "Bán chạy nhất",
      amenities: [
        "Bể bơi vô cực riêng",
        "Bồn tắm đá lộ thiên",
        "Bữa sáng nổi tại hồ",
        "Minibar miễn phí cao cấp",
        "Quản gia riêng 24/7",
        "Wifi tốc độ cao",
        "Máy pha cà phê Nespresso"
      ]
    },
    {
      id: "room-02",
      name: "Bungalow Gỗ Thông Thung Lũng",
      category: "bungalow",
      categoryName: "Bungalow",
      price: 2650000,
      priceFormatted: "2.650.000đ",
      unit: "đêm",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Thiết kế hoàn toàn từ gỗ thông tự nhiên tỏa hương thơm dịu nhẹ, ban công lớn ngắm biển mây buổi sớm và thung lũng ngập tràn hoa dại.",
      area: "65m²",
      capacity: "2 Người lớn",
      bed: "1 Giường King cao cấp",
      view: "View Rừng thông & Săn mây",
      isFeatured: true,
      tag: "Lãng mạn",
      amenities: [
        "Ban công ngắm bình minh",
        "Bồn tắm gỗ pơ mu ngâm thảo dược",
        "Bữa sáng Buffet hữu cơ",
        "Bộ trà thảo mộc organic",
        "Điều hòa 2 chiều êm ái",
        "Loa Bluetooth Marshall"
      ]
    },
    {
      id: "room-03",
      name: "Glamping Dome Ngắm Sao Thượng Hạng",
      category: "glamping",
      categoryName: "Cắm trại Glamping",
      price: 1850000,
      priceFormatted: "1.850.000đ",
      unit: "đêm",
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Trải nghiệm cắm trại sang chảnh chuẩn 5 sao với lều vòm Panorama trần kính ngắm trọn dải ngân hà, trang bị điều hòa mát lạnh và phòng tắm khép kín riêng tư.",
      area: "45m²",
      capacity: "2 Người lớn + 1 Trẻ nhỏ",
      bed: "1 Giường Queen đệm lông vũ",
      view: "Bầu trời sao & Thảo nguyên",
      isFeatured: false,
      tag: "Trải nghiệm mới",
      amenities: [
        "Mái vòm ngắm sao đêm",
        "Kính thiên văn quang học",
        "Điều hòa & Máy sưởi",
        "Bàn ghế gỗ ngoài trời thư giãn",
        "Set đồ nướng BBQ đêm",
        "Phòng tắm nóng lạnh riêng"
      ]
    },
    {
      id: "room-04",
      name: "Panorama Valley Suite",
      category: "suite",
      categoryName: "Phòng Suite",
      price: 3450000,
      priceFormatted: "3.450.000đ",
      unit: "đêm",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Phòng suite góc với cửa kính sát trần 270 độ bao trọn toàn cảnh ruộng bậc thang và thung lũng sương mù. Thiết kế tối giản Nhật Bản Wabi-sabi.",
      area: "85m²",
      capacity: "2-3 Người lớn",
      bed: "1 Giường Super King + Sofa bed",
      view: "Toàn cảnh 270 độ Thung lũng",
      isFeatured: false,
      tag: "View đỉnh cao",
      amenities: [
        "Cửa kính Panorama 270°",
        "Bồn tắm sục Jacuzzi kính",
        "Bữa sáng tại phòng",
        "Khu vực tiếp khách riêng",
        "Bàn làm việc yên tĩnh",
        "Dịch vụ phòng 24/24"
      ]
    },
    {
      id: "room-05",
      name: "Family Chalet Gỗ Mộc 2 Tầng",
      category: "villa",
      categoryName: "Biệt thự cao cấp",
      price: 5900000,
      priceFormatted: "5.900.000đ",
      unit: "đêm",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Căn Chalet 2 tầng phong cách Bắc Âu dành cho gia đình đông người hoặc nhóm bạn, có bếp nấu ăn gia đình, bàn ăn ngoài trời và sân cỏ vui chơi cho trẻ em.",
      area: "160m²",
      capacity: "4-6 Người lớn + 3 Trẻ em",
      bed: "2 Giường King + 2 Giường đơn",
      view: "View Vườn thông & Đồi trà",
      isFeatured: false,
      tag: "Gia đình yêu thích",
      amenities: [
        "2 Tầng với 3 phòng ngủ",
        "Khu bếp hiện đại đầy đủ dụng cụ",
        "Lò sưởi củi sưởi ấm mùa đông",
        "Sân cỏ nướng BBQ riêng biệt",
        "Bàn ăn dài 8 người",
        "Miễn phí vé khu vui chơi trẻ em"
      ]
    },
    {
      id: "room-06",
      name: "Zen Garden Eco-Cottage",
      category: "bungalow",
      categoryName: "Bungalow",
      price: 2150000,
      priceFormatted: "2.150.000đ",
      unit: "đêm",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Nằm nép mình giữa vườn trúc xanh rì rào và suối đá róc rách, Cottage mang lại không gian thiền định tĩnh tại tuyệt đối, thích hợp để đọc sách và nạp lại năng lượng.",
      area: "55m²",
      capacity: "2 Người lớn",
      bed: "1 Giường Queen nệm thảo mộc",
      view: "Vườn Thiền & Suối nước tự nhiên",
      isFeatured: false,
      tag: "Chữa lành",
      amenities: [
        "Sân hiên thưởng trà thiền",
        "Khu vườn Nhật Bản riêng",
        "Thảm tập Yoga & Chuông xoay",
        "Bồn tắm gỗ thảo dược thiên nhiên",
        "Không TV (Tận hưởng tĩnh lặng)",
        "Bộ tinh dầu sả chanh tự nhiên"
      ]
    }
  ],

  // Tour & Hoạt động trải nghiệm
  tours: [
    {
      id: "tour-01",
      title: "Chèo Kayak & SUP Đón Bình Minh Hồ Ngọc",
      duration: "2 - 3 Giờ",
      time: "05:30 - 08:30 Sáng",
      price: 450000,
      priceFormatted: "450.000đ",
      unit: "người",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
      highlight: "Đón những tia nắng đầu tiên xuyên qua làn sương bảng lảng trên mặt hồ trong vắt.",
      included: ["Áo phao & thuyền Kayak/SUP chuyên dụng", "Hướng dẫn viên & Chụp ảnh máy cơ", "Cà phê nóng & bánh nhẹ trên bè nổi"],
      tag: "Trải nghiệm đặc sắc"
    },
    {
      id: "tour-02",
      title: "Trekking Khám Phá Rừng Nguyên Sinh & Thác Bạc",
      duration: "Nửa ngày (4 Giờ)",
      time: "08:00 - 12:30",
      price: 650000,
      priceFormatted: "650.000đ",
      unit: "người",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=80",
      highlight: "Len lỏi dưới tán cây cổ thụ trăm năm, giải mã hệ sinh thái bản địa và tắm suối thác mát lạnh.",
      included: ["Gậy trekking & găng tay", "Hướng dẫn viên bản địa am hiểu rừng", "Bữa trưa cơm lam gà nướng bên bờ suối"],
      tag: "Mạo hiểm & Khám phá"
    },
    {
      id: "tour-03",
      title: "Đêm Lửa Trại, Tiệc BBQ Rừng & Nhạc Acoustic",
      duration: "3.5 Giờ",
      time: "18:30 - 22:00 Mỗi tối",
      price: 550000,
      priceFormatted: "550.000đ",
      unit: "người",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80",
      highlight: "Quây quần bên ánh lửa ấm áp, lắng nghe giai điệu guitar mộc và thưởng thức đặc sản nướng bản địa.",
      included: ["Tiệc buffet nướng than hoa hảo hạng", "Rượu ngô men lá / Rượu vang khai vị", "Chương trình ca nhạc mộc Acoustic dưới sao"],
      tag: "Gắn kết & Cảm xúc"
    },
    {
      id: "tour-04",
      title: "Nông Trại Hữu Cơ & Lớp Học Nấu Ăn Bản Địa",
      duration: "3 Giờ",
      time: "14:30 - 17:30",
      price: 490000,
      priceFormatted: "490.000đ",
      unit: "người",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
      highlight: "Tự tay thu hoạch rau củ hữu cơ tại vườn Mộc Sơn và cùng Bếp Trưởng sáng tạo món ăn truyền thống.",
      included: ["Trang phục nhà nông nón lá, giỏ tre", "Thu hoạch rau củ & hái nấm tươi", "Tự làm 3 món đặc sản và nhận chứng nhận"],
      tag: "Thú vị cho gia đình"
    }
  ],

  // Tiện ích & Dịch vụ nổi bật
  amenities: [
    {
      icon: "fa-water-ladder",
      title: "Bể Bơi Vô Cực Nước Ấm",
      subtitle: "View Thung Lũng Chạm Mây",
      description: "Bể bơi tràn bờ sử dụng công nghệ điện phân muối khoáng tự nhiên, nhiệt độ nước duy trì 32°C quanh năm, ngắm trọn bình minh thung lũng."
    },
    {
      icon: "fa-utensils",
      title: "Nhà Hàng Ẩm Thực Mộc Vị",
      subtitle: "Triết Lý Farm-To-Table",
      description: "Thực đơn tinh tế hòa quyện giữa đặc sản Tây Bắc và phong vị Á - Âu đương đại, 100% nguyên liệu tươi sạch từ nông trang hữu cơ của resort."
    },
    {
      icon: "fa-spa",
      title: "Mộc Sen Wellness & Onsen",
      subtitle: "Trị Liệu Thảo Dược Cổ Truyền",
      description: "Tắm khoáng nóng Onsen kiểu Nhật, xông hơi đá muối Himalaya và các liệu pháp massage bấm huyệt thảo mộc phục hồi năng lượng thể chất và tinh thần."
    },
    {
      icon: "fa-campground",
      title: "Khu Cắm Trại & Glamping",
      subtitle: "Trải Nghiệm Đêm Rừng Sang Trọng",
      description: "Khu vực cắm trại đồi thông riêng tư với lều cao cấp trang bị đầy đủ đệm êm, đèn cổ điển, khu vệ sinh 5 sao và bếp nướng ngoài trời."
    },
    {
      icon: "fa-person-hiking",
      title: "Khám Phá & Teambuilding",
      subtitle: "Sân Cỏ Sinh Thái 10.000m²",
      description: "Bãi cỏ xanh mướt phục vụ các hoạt động gắn kết doanh nghiệp, dã ngoại gia đình, chèo kayak vượt thử thách và tour thám hiểm đường mòn."
    },
    {
      icon: "fa-seedling",
      title: "Vườn Sinh Thái & Nông Trang",
      subtitle: "Trải Nghiệm Giáo Dục Cho Trẻ Em",
      description: "Khu vườn thảo mộc, vườn thú thân thiện (thỏ, cừu, hươu sao) giúp các bé gần gũi thiên nhiên và học hỏi nông nghiệp bền vững."
    }
  ],

  // Đánh giá từ khách hàng
  testimonials: [
    {
      name: "Nguyễn Hoàng Nam & Thùy Dung",
      role: "Kỳ nghỉ trăng mật - Hà Nội",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "Kỳ nghỉ tuyệt vời nhất của vợ chồng mình! Biệt thự Hồ Ngọc Bích thực sự đẹp ngỡ ngàng hơn cả trong ảnh. Sáng mở cửa ra sương mây ùa vào tận giường, bồn tắm lộ thiên ngâm lá thuốc người Dao cực kỳ thư giãn. Đội ngũ nhân viên thân thiện và chu đáo 10 điểm!",
      date: "Tháng 09/2026",
      stayedRoom: "Villa Hồ Ngọc Bích"
    },
    {
      name: "Trần Mai Anh",
      role: "Travel Blogger - TP. Hồ Chí Minh",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "Là người đã đi qua rất nhiều resort sinh thái tại Việt Nam, Mộc Sơn vẫn đem lại cho mình cảm giác bình yên đến lạ kỳ. Đồ ăn farm-to-table cực kỳ tươi ngon, ngọt đậm vị rau củ hữu cơ. Trải nghiệm chèo kayak đón bình minh là khoảnh khắc đắt giá nhất!",
      date: "Tháng 08/2026",
      stayedRoom: "Glamping Dome Ngắm Sao"
    },
    {
      name: "Phạm Quốc Tuấn",
      role: "Giám đốc Doanh nghiệp - Đà Nẵng",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "Công ty mình tổ chức Retreat 3 ngày 2 đêm tại đây cho hơn 40 nhân sự. Mọi khâu từ dịch vụ teambuilding, tiệc BBQ lửa trại đến phòng ở đều được chuẩn bị chu toàn vượt mong đợi. Không gian tách biệt, trong lành giúp cả đội sạc lại 100% năng lượng.",
      date: "Tháng 07/2026",
      stayedRoom: "Family Chalet & Bungalow"
    },
    {
      name: "Lê Thu Hằng",
      role: "Kỳ nghỉ gia đình 3 thế hệ - Hải Phòng",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "Bố mẹ mình lớn tuổi rất thích không khí tĩnh lặng và dịch vụ tắm khoáng nóng Onsen của resort. Các bé nhỏ thì mê tít khu vườn thỏ và lớp hái dâu tây. Chắc chắn gia đình mình sẽ quay lại vào dịp Tết tới!",
      date: "Tháng 06/2026",
      stayedRoom: "Family Chalet Gỗ Mộc"
    }
  ],

  // Thống kê nổi bật
  stats: [
    { number: "120+", label: "Héc-ta Rừng Bảo Tồn", icon: "fa-tree" },
    { number: "45+", label: "Villa & Bungalow Sinh Thái", icon: "fa-hotel" },
    { number: "99.2%", label: "Khách Hài Lòng & Quay Lại", icon: "fa-heart" },
    { number: "24/7", label: "Phục Vụ & Hỗ Trợ Tận Tâm", icon: "fa-bell-concierge" }
  ]
};

// Xuất ra phạm vi toàn cục để dễ dàng sử dụng cả trong file script trực tiếp
if (typeof window !== "undefined") {
  window.RESORT_DATA = RESORT_DATA;
}
