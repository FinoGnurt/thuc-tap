/**
 * Card thông tin giảng viên + môn học + ngày tháng.
 *
 * Props:
 *   tenGiangVien    - tên hiển thị
 *   mon             - object môn học từ API
 *   tongDaDay       - tổng tiết đã dạy đến tuần hiện tại
 *   tongDuKien      - tổng tiết dự kiến đến tuần hiện tại
 */
export default function InfoCard({ tenGiangVien, mon, tongDaDay, tongDuKien }) {
  return (
    <div className="border border-[#ccc] mb-4 text-[12px]">
      <table className="w-full">
        <tbody>
          <tr>
            {/* Tên giảng viên */}
            <td className="border-r border-[#ccc] px-4 py-3 font-bold text-[#333] w-[160px] align-middle text-center">
              {tenGiangVien}
            </td>

            {/* Thông tin môn */}
            <td className="border-r border-[#ccc] px-4 py-3 align-top">
              <div>
                Dạy môn:{" "}
                <span className="font-semibold">{mon.monHoc}</span>{" "}
                <span className="text-[#0066cc]">({mon.loaiGiangVien})</span>
                {mon.trangThai === "Đã kết thúc" && (
                  <span className="ml-3 text-red-600 font-semibold">
                    Đã kết thúc
                  </span>
                )}
              </div>
              <div>
                Lớp:{" "}
                <span className="font-semibold">
                  {mon.lop} ({mon.buoi})
                </span>{" "}
                - Học kỳ:{" "}
                <span className="font-semibold">{mon.hocKy}</span> - Năm học:{" "}
                <span className="font-semibold">{mon.namHoc}</span>
              </div>
              <div>
                Số tiết:{" "}
                <span className="font-semibold">{mon.soTiet}</span> (LT:{" "}
                {mon.lyThuyet} - TH: {mon.thucHanh}) - Đã dạy:{" "}
                <span className="text-red-600 font-bold">{tongDaDay}</span> /{" "}
                <span className="font-semibold">{tongDuKien}</span>
              </div>
            </td>

            {/* Ngày */}
            <td className="px-4 py-3 align-top text-[11px] w-[200px]">
              <div>
                Ngày bắt đầu:{" "}
                <span className="font-semibold">{mon.batDau}</span>
              </div>
              <div>
                Ngày kết thúc:{" "}
                <span className="font-semibold">{mon.ketThuc || "---"}</span>
              </div>
              {mon.ketThucDuKien && (
                <div className="italic text-[#555]">
                  (Ngày kết thúc dự kiến:{" "}
                  <span className="font-semibold text-[#333]">
                    {mon.ketThucDuKien}
                  </span>
                  )
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
