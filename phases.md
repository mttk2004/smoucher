Chào bạn, dựa trên docs/api-docs.json và kiến trúc code hiện tại (bạn đã có sẵn các layout, React Router v7, Vite, Tailwind v4, Tanstack Query, React Hook Form, Zod), mình đề xuất lộ trình (Roadmap) chi tiết cho các Phase tiếp theo để hoàn thiện hệ thống Smoucher như sau:
Phase 1: Dashboard & Analytics (Trang Chủ)

Tập trung vào trang app/routes/home.tsx.

    API: /api/v1/dashboard/overview, /api/v1/dashboard/usage-trend (và có thể là branch-stats).
    Nhiệm vụ:
        Tạo các Data Types (Interfaces) cho Dashboard Responses.
        Tạo hooks (useDashboardOverview, useUsageTrend) bằng TanStack Query.
        Xây dựng các thẻ thống kê tổng quan (Total Vouchers, Active Vouchers, Total Usages, Doanh thu giảm giá).
        Sử dụng thư viện recharts (đã có trong package.json) để vẽ biểu đồ doanh thu/lượt dùng theo thời gian.
        Hiển thị danh sách top vouchers hiệu quả.

Phase 2: Quản Lý Chiến Dịch (Campaigns)

Tập trung vào app/routes/campaigns.tsx và app/routes/campaigns.create.tsx.

    API: /api/v1/campaigns (GET, POST), /api/v1/campaigns/{id}/status (PUT).
    Nhiệm vụ:
        Trang danh sách: Tạo bảng (Data Table) hiển thị chiến dịch, tích hợp phân trang (Pagination) và bộ lọc (Search/Filter). Sử dụng thư viện nuqs (đã có) để đồng bộ trạng thái tìm kiếm lên URL.
        Trang tạo mới: Xây dựng form phức tạp với React Hook Form + Zod (Tên, Budget, Start Date, End Date).
        Tính năng: Thay đổi trạng thái (DRAFT/ACTIVE/PAUSED/ENDED).

Phase 3: Quản Lý Voucher (Voucher Studio - Lõi của hệ thống)

Tập trung vào app/routes/vouchers.tsx và app/routes/vouchers.create.tsx.

    API: /api/v1/vouchers (GET, POST), /api/v1/vouchers/{id} (PUT, GET, DELETE), /api/v1/vouchers/{id}/pause|resume.
    Nhiệm vụ:
        Trang danh sách: Data Table quản lý Voucher với bộ lọc chuyên sâu (theo Status, Campaign).
        Voucher Studio (Form tạo/sửa): Đây là phần phức tạp nhất. Form động xử lý logic giảm giá (% hoặc Fixed), thiết lập trần giảm giá, đơn tối thiểu, giới hạn lượt dùng, chọn tập khách hàng (Public/Private), thời gian hiệu lực. Xử lý các trường mảng ID ngoại (áp dụng cho SP nào, chi nhánh nào) dưới dạng JSONB.
        Tính năng: Pause/Resume voucher, Clone, Generate hàng loạt mã code độc nhất.

Phase 4: Khách Hàng & Phân Phối (Customers & Distributions)

Tập trung vào app/routes/customers.tsx và app/routes/distribution.tsx.

    API: /api/v1/customers (GET, POST), /api/v1/distributions (GET, POST).
    Nhiệm vụ:
        Khách hàng: Quản lý danh sách KH, tra cứu lịch sử dùng voucher của 1 KH (/customers/{id}/usages). Gán voucher private cho KH.
        Phân phối: Tạo lệnh gửi Voucher qua Email/SMS, xem trạng thái gửi, thử lại (Retry) lệnh bị lỗi.

Phase 5: Cài đặt Hệ Thống (Dành riêng cho ADMIN)

Tập trung vào layout app/layouts/settings.tsx và các route con bên trong.

    API: /api/v1/api-keys, /api/v1/request-logs, /api/v1/users.
    Nhiệm vụ:
        API Keys: Tạo, thu hồi, cấu hình rate limit cho API Keys của các hệ thống ngoài (POS, E-commerce).
        API Logs: Bảng theo dõi lịch sử request từ POS (phát hiện lỗi, gian lận) với các bộ lọc phức tạp (theo IP, trạng thái, thời gian phản hồi).
        Users Management: Thêm/sửa nhân viên STAFF hoặc ADMIN nội bộ, cấp quyền.

Câu hỏi dành cho bạn: Bạn muốn chúng ta bắt tay vào làm ngay Phase 1 (Dashboard), hay bạn muốn ưu tiên làm Phase 3 (Voucher Studio) trước vì đây là module cốt lõi và phức tạp nhất của dự án? Dù chọn Phase nào, mình sẽ đều bắt đầu bằng việc đọc kỹ các file giao diện mẫu hiện tại (nếu có) và thiết lập API types một cách chuẩn mực.
