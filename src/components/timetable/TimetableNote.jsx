/**
 * TimetableNote - Phần ghi chú cuối trang Thời Khóa Biểu
 */
export default function TimetableNote() {
  return (
    <div className="mt-5 text-sm">
      <p className="text-red-600 font-bold">Ghi chú:</p>
      <ul className="mt-2 text-gray-800 space-y-1 pl-4">
        <li>
          + Chọn <strong>tuần áp dụng</strong> rồi chọn <strong>Lớp</strong>{" "}
          xong nhấn nút <strong>Xem</strong>.
        </li>
        <li>
          + Lớp Cao đẳng: có chữ "C" ở đầu tên lớp. VD: C22MT1, C23UDPM1, ...
        </li>
        <li>
          + Lớp Trung cấp: có chữ "T" ở đầu tên lớp. VD: T22TKĐH1,
          T23UDPM1, ...
        </li>
        <li>
          + <strong>MT</strong>: Quản trị mạng máy tính
        </li>
        <li>
          + <strong>UDPM</strong>: Ứng dụng phần mềm
        </li>
        <li>
          + <strong>TKĐH</strong>: Thiết kế đồ họa
        </li>
      </ul>
    </div>
  );
}
