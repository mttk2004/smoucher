Tôi đã cung cấp toàn bộ thông tin về các lỗi và thiếu sót của API ở phía trên. Đây là bản danh sách bạn có thể sao chép và gửi trực tiếp cho nhóm Backend:
Yêu cầu bổ sung API cho trang History (Lịch sử sử dụng Voucher)

1. API lấy toàn bộ Lịch sử sử dụng (Usage History Table)

    Vấn đề: Hiện tại chỉ có API lấy lịch sử theo từng voucher (GET /vouchers/{id}/usages) hoặc theo khách hàng (GET /customers/{id}/usages). Giao diện /history cần hiển thị tất cả các lượt sử dụng của toàn hệ thống.
    Yêu cầu bổ sung: GET /api/v1/usages (hoặc GET /api/v1/vouchers/usages)
    Query params cần hỗ trợ:
        page, size, sort
        search (tìm kiếm theo externalOrderId)
        usedAtFrom, usedAtTo (lọc theo ngày tháng)
        externalBranchId (lọc theo chi nhánh)
    Response Model cần thêm:
        location / branchName: Tên chi nhánh (do DB chỉ lưu ID).
        address: Địa chỉ chi nhánh.
        status: Trạng thái lượt dùng (Completed, Pending, Cancelled...) vì hiện tại bảng voucher_usages không thấy lưu trạng thái này (có thể do tích hợp POS).

2. API Export CSV cho toàn bộ Lịch sử

    Vấn đề: Có nút "Export CSV" cho toàn bộ lịch sử nhưng API hiện tại chỉ hỗ trợ export theo từng voucher hoặc customer.
    Yêu cầu bổ sung: GET /api/v1/usages/export (hoặc GET /api/v1/vouchers/usages/export). Hỗ trợ các query params lọc tương tự như API lấy danh sách ở trên.

3. Bổ sung chỉ số cho API Thống kê (GET /api/v1/dashboard/overview)

    Vấn đề: Giao diện cần hiển thị 3 thẻ: "Total Savings", "Active Users", "Redemption Rate" cùng tỷ lệ tăng/giảm so với tháng trước.
    Yêu cầu bổ sung vào Response:
        activeCustomerCount: Số lượng người dùng/khách hàng đang active (hiện chỉ có activeMerchantCount).
        Các chỉ số tăng trưởng (Growth percentage): VD: savingsGrowthPercentage (+14%), activeUsersGrowthPercentage (+5.2%) hoặc trả về thông số của 2 kỳ để Frontend tự tính.
