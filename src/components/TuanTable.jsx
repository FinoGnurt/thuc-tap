import TooltipGhiChu from "./TooltipGhiChu";

/**
 * Bảng tuần cho 1 nhóm (tối đa MAX_COLS cột).
 *
 * Props:
 *   nhom          - mảng tuần (slice của cacTuan)
 *   tuanHienTai   - số tuần hiện tại (để highlight)
 *   ghiChuMap     - { [tuan]: string } ghi chú cục bộ
 *   activePopupTuan - số tuần đang mở popup (hoặc null)
 *   pencilRefs    - ref object chia sẻ từ page { current: { [tuan]: el } }
 *   onPencilClick - callback(tuan)
 */
export default function TuanTable({
  nhom,
  tuanHienTai,
  ghiChuMap,
  activePopupTuan,
  pencilRefs,
  onPencilClick,
}) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="border-collapse text-[11px] border border-gray-400 min-w-max">
        <thead>
          <tr>
            <th className="border border-gray-400 bg-[#c8d8e8] text-[#1a3a5c] px-3 py-1 text-center w-[70px] align-middle font-bold">
              Số tiết
            </th>
            {nhom.map((t) => (
              <TuanHeader key={t.tuan} t={t} tuanHienTai={tuanHienTai} />
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Dự kiến */}
          <tr>
            <td className="border border-gray-400 bg-white px-2 py-1.5 font-semibold text-center">
              Dự kiến
            </td>
            {nhom.map((t) => (
              <td
                key={t.tuan}
                className="border border-gray-400 bg-white text-center py-1.5"
              >
                {t.duKien}
              </td>
            ))}
          </tr>

          {/* Đã dạy */}
          <tr>
            <td className="border border-gray-400 bg-[#fffff0] px-2 py-1.5 font-semibold text-center">
              Đã dạy
            </td>
            {nhom.map((t) => {
              const isDaDuyet =
                t.trangThai === "da_duyet" || t.trangThai === "bao_nghi";
              return (
                <td
                  key={t.tuan}
                  className={`border border-gray-400 text-center py-1.5 ${
                    isDaDuyet
                      ? "bg-red-50 text-red-700 font-bold"
                      : "bg-[#fffff0]"
                  }`}
                >
                  {t.daDay === null || t.daDay === undefined ? "" : t.daDay}
                </td>
              );
            })}
          </tr>

          {/* Ghi chú */}
          <tr>
            <td className="border border-gray-400 bg-white px-2 py-1.5 font-semibold text-center">
              Ghi chú
            </td>
            {nhom.map((t) => {
              const isDaDuyet = t.trangThai === "da_duyet";

              // Text ghi chú: ưu tiên state local (vừa lưu), fallback về API field đúng tên
              // API trả về t.ghiChu = "pencil" | "clipboard" (loại icon), KHÔNG phải text
              // Text thực tế từ GV nằm trong ghiChuMap sau khi save
              const ghiChuText = ghiChuMap[t.tuan] ?? "";

              // Hiện icon clipboard nếu:
              //   1. API đánh dấu có ghi chú (t.ghiChu === "clipboard"), HOẶC
              //   2. Người dùng vừa lưu ghi chú mới trong session này
              const hasNote = t.ghiChu === "clipboard" || !!ghiChuText;

              const isActive = activePopupTuan === t.tuan;

              return (
                <td
                  key={t.tuan}
                  className="border border-gray-400 bg-white text-center py-1.5 px-1"
                >
                  <div className="flex flex-col items-center gap-2">
                    {/* Icon clipboard + tooltip nếu API đánh dấu có note hoặc vừa lưu */}
                    {hasNote && <TooltipGhiChu text={ghiChuText} />}

                    {isDaDuyet ? (
                      <span className="text-green-700 text-[13px] font-bold leading-none">
                        ✓
                      </span>
                    ) : (
                      <button
                        ref={(el) => (pencilRefs.current[t.tuan] = el)}
                        title={`Ghi chú tuần ${t.tuan}`}
                        onClick={() => onPencilClick(t.tuan)}
                        className={`text-[15px] cursor-pointer transition-transform hover:scale-125 leading-none ${
                          isActive ? "opacity-50 scale-110" : ""
                        }`}
                      >
                        ✏️
                      </button>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ── Sub-component: header của 1 cột tuần ──────────────────────────────────────
function TuanHeader({ t, tuanHienTai }) {
  const isHienTai = t.tuan === tuanHienTai;
  return (
    <th
      className={`border border-gray-400 px-2 py-1 text-center font-bold min-w-[58px] ${
        isHienTai ? "bg-[#4db6e8] text-white" : "bg-[#c8d8e8] text-[#1a3a5c]"
      }`}
    >
      <div className="whitespace-nowrap">Tuần {t.tuan}</div>
      <div className="font-normal text-[10px] leading-tight">{t.batDau}</div>
      <div className="font-normal text-[10px] leading-tight">đến</div>
      <div className="font-normal text-[10px] leading-tight">{t.ketThuc}</div>
    </th>
  );
}
