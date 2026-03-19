import allSchedules from "@/data/timetable.json";

/**
 * TimetableFilterBar - Thanh lọc tuần/lớp của trang Thời Khóa Biểu
 *
 * Props:
 *  - selectedWeek  : string
 *  - selectedClass : string
 *  - onWeekChange  : (val: string) => void
 *  - onClassChange : (val: string) => void
 *  - onView        : () => void
 */

const CLASS_LIST = ["C22MT1", "C23UDPM1", "T22TKĐH1", "T23UDPM1"];

export default function TimetableFilterBar({
  selectedWeek,
  selectedClass,
  onWeekChange,
  onClassChange,
  onView,
}) {
  const selectClass =
    "border border-gray-300 rounded px-2 py-1 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="bg-white border border-[#ccc] border-t-0 px-3 sm:px-4 py-2 flex flex-wrap items-center gap-2 text-sm mb-3">
      <span className="text-gray-700 w-full sm:w-auto">Thời khóa biểu Lớp:</span>

      {/* Chọn tuần */}
      <select
        value={selectedWeek}
        onChange={(e) => onWeekChange(e.target.value)}
        className={`${selectClass} w-full sm:w-auto sm:min-w-[160px]`}
      >
        <option value="">Chọn tuần áp dụng</option>
        {allSchedules.map((s) => (
          <option key={s.id} value={s.date}>
            {s.date}
          </option>
        ))}
      </select>

      {/* Chọn lớp */}
      <select
        value={selectedClass}
        onChange={(e) => onClassChange(e.target.value)}
        className={`${selectClass} w-full sm:w-auto sm:min-w-[110px]`}
      >
        <option value="">Chọn lớp</option>
        {CLASS_LIST.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button
        onClick={onView}
        className="w-full sm:w-auto bg-[#337ab7] hover:bg-[#286090] text-white text-sm px-4 py-1 rounded transition-colors"
      >
        Xem
      </button>
    </div>
  );
}
