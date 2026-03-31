import { giangVienList, maLopList } from "@/utils/listExam";

/**
 * ExamFilterBar - Thanh lọc của trang Lịch Thi
 *
 * Props:
 *  - tuNgay        : string
 *  - denNgay       : string
 *  - filterGV      : string
 *  - filterLop     : string
 *  - onTuNgay      : (val: string) => void
 *  - onDenNgay     : (val: string) => void
 *  - onFilterGV    : (val: string) => void
 *  - onFilterLop   : (val: string) => void
 *  - onSearch      : () => void
 */
export default function ExamFilterBar({
  tuNgay,
  denNgay,
  filterGV,
  filterLop,
  onTuNgay,
  onDenNgay,
  onFilterGV,
  onFilterLop,
  onSearch,
}) {
  const inputClass =
    "border border-gray-300 rounded px-2 py-1 text-sm w-[110px] focus:outline-none focus:ring-2 focus:ring-blue-400";
  const selectClass =
    "border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="bg-white border border-[#ccc] border-t-0 px-3 sm:px-4 py-2 flex flex-wrap items-center gap-2 sm:gap-3 text-sm mb-3">
      {/* Từ ngày */}
      <div className="flex items-center gap-1">
        <label className="text-gray-700 whitespace-nowrap">Từ ngày:</label>
        <input
          type="text"
          value={tuNgay}
          onChange={(e) => onTuNgay(e.target.value)}
          placeholder="dd/mm/yyyy"
          className={inputClass}
        />
        <span className="text-gray-500 cursor-pointer" title="Chọn ngày">
          📅
        </span>
      </div>

      {/* Đến ngày */}
      <div className="flex items-center gap-1">
        <label className="text-gray-700 whitespace-nowrap">Đến ngày:</label>
        <input
          type="text"
          value={denNgay}
          onChange={(e) => onDenNgay(e.target.value)}
          placeholder="dd/mm/yyyy"
          className={inputClass}
        />
        <span className="text-gray-500 cursor-pointer" title="Chọn ngày">
          📅
        </span>
      </div>

      {/* Giảng viên */}
      <select
        value={filterGV}
        onChange={(e) => onFilterGV(e.target.value)}
        className={`${selectClass} w-full sm:w-auto sm:min-w-[180px]`}
      >
        <option value="">Giảng viên giảng dạy</option>
        {giangVienList.map((gv) => (
          <option key={gv} value={gv}>
            {gv}
          </option>
        ))}
      </select>

      {/* Mã lớp */}
      <select
        value={filterLop}
        onChange={(e) => onFilterLop(e.target.value)}
        className={`${selectClass} w-full sm:w-auto sm:min-w-[140px]`}
      >
        <option value="">Mã lớp</option>
        {maLopList.map((lop) => (
          <option key={lop} value={lop}>
            {lop}
          </option>
        ))}
      </select>

      <button
        onClick={onSearch}
        className="w-full sm:w-auto bg-[#222] hover:bg-[#444] text-white text-sm px-5 py-1.5 rounded transition-colors"
      >
        Tìm kiếm
      </button>
    </div>
  );
}
