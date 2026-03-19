# Kế hoạch tiếp theo cho dự án Smoucher (Kiến trúc 9 bảng API-focused)

Dự án đang theo mô hình **API-focused (9 bảng)**, không quản lý các thực thể bên ngoài (Sản phẩm, Chi nhánh, Đơn hàng) mà chỉ lưu trữ và xử lý thông qua `external_id`. Dưới đây là các bước tiếp theo để hoàn thiện hệ thống:

## 1. Yêu cầu bổ sung API cho trang History (Lịch sử sử dụng Voucher)

1. **API lấy toàn bộ Lịch sử sử dụng (Usage History Table)**
    - **Vấn đề:** Hiện tại chỉ có API lấy lịch sử theo từng voucher (`GET /vouchers/{id}/usages`) hoặc theo khách hàng (`GET /customers/{id}/usages`). Giao diện `/history` cần hiển thị tất cả các lượt sử dụng của toàn hệ thống.
    - **Yêu cầu bổ sung:** `GET /api/v1/usages` (hoặc `GET /api/v1/vouchers/usages`)
    - **Query params cần hỗ trợ:**
        - `page`, `size`, `sort`
        - `search` (tìm kiếm theo `externalOrderId`)
        - `usedAtFrom`, `usedAtTo` (lọc theo khoảng thời gian)
        - `externalBranchId` (lọc theo External ID của chi nhánh)
    - **Lưu ý Response:** Trả về `external_branch_id` và `external_order_id`. *Không yêu cầu Backend trả về thông tin `branchName` hay `address` vì hệ thống không trực tiếp quản lý chi nhánh.*

2. **API Export CSV cho toàn bộ Lịch sử**
    - **Vấn đề:** Có nút "Export CSV" cho toàn bộ lịch sử nhưng API hiện tại chỉ hỗ trợ export theo từng voucher hoặc customer.
    - **Yêu cầu bổ sung:** `GET /api/v1/usages/export` (hoặc `GET /api/v1/vouchers/usages/export`). Hỗ trợ các query params lọc tương tự như API lấy danh sách ở trên. Dữ liệu CSV cũng chỉ bao gồm các `external_id`.

3. **Bổ sung chỉ số cho API Thống kê (`GET /api/v1/dashboard/overview`)**
    - **Vấn đề:** Giao diện cần hiển thị 3 thẻ: "Total Savings", "Active Users", "Redemption Rate" cùng tỷ lệ tăng/giảm so với tháng trước.
    - **Yêu cầu bổ sung vào Response:**
        - `activeCustomerCount`: Số lượng người dùng/khách hàng đang active (hiện chỉ có `activeMerchantCount`).
        - Các chỉ số tăng trưởng (Growth percentage): VD: `savingsGrowthPercentage` (+14%), `activeUsersGrowthPercentage` (+5.2%) hoặc trả về thông số của 2 kỳ để Frontend tự tính.

## 2. Dọn dẹp và Điều chỉnh Frontend (UI Cleanup)
- Xóa các cột/trường hiển thị hoặc yêu cầu hiển thị tên/địa chỉ chi nhánh (ví dụ như `branchName`, `address`) trong bảng danh sách (chẳng hạn ở `History` hoặc `Vouchers`).
- Thay thế các trường thông tin dư thừa bằng mã nhận diện từ hệ thống POS (`external_branch_id`, `external_order_id`).
- Đảm bảo form tạo Voucher (Voucher Studio) khi chọn áp dụng cho chi nhánh hoặc sản phẩm, sẽ nhận và lưu trữ danh sách các External IDs (dưới dạng mảng JSON `["ID1", "ID2"]`).

## 3. Xác thực & Phân quyền (Auth & Roles)
- Đảm bảo tuân thủ Layout Strategy cho 3 Role: GUEST, STAFF và ADMIN (với ADMIN có thêm menu System và Developer).
- Quản lý `api_keys` và `api_request_logs` (System name, expiry, status, request details).
