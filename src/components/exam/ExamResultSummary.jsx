/**
 * ExamResultSummary - Dòng tóm tắt "Hiển thị X–Y / Z kết quả"
 *
 * Props:
 *  - currentPage    : number
 *  - itemsPerPage   : number
 *  - totalItems     : number
 */
export default function ExamResultSummary({
  currentPage,
  itemsPerPage,
  totalItems,
}) {
  if (totalItems === 0) return null;

  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-2 text-xs text-gray-500 text-right">
      Hiển thị {from}–{to} / {totalItems} kết quả
    </div>
  );
}
