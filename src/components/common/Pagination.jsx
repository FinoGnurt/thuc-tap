/**
 * Pagination - Component phân trang dùng chung
 *
 * Props:
 *  - currentPage  : number  — trang hiện tại
 *  - totalPages   : number  — tổng số trang
 *  - onPageChange : (page: number) => void
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const buildPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1, 2, 3, 4];

    if (currentPage > 5 && currentPage < totalPages - 1) {
      pages.push("...", currentPage);
    }

    if (currentPage < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  const pages = buildPages();

  const btnBase =
    "px-1 text-[#337ab7] hover:underline disabled:text-gray-400 disabled:cursor-default";
  const pageBtn = (isActive) =>
    `px-2 py-0.5 rounded ${
      isActive
        ? "bg-[#337ab7] text-white cursor-default font-bold"
        : "text-[#337ab7] hover:underline"
    }`;

  return (
    <div className="bg-gray-100 border border-gray-300 border-t-0 px-3 py-1.5 flex justify-end items-center gap-0.5 text-sm select-none">
      {/* << First */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={btnBase}
      >
        &lt;&lt;
      </button>

      {/* < Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={btnBase}
      >
        &lt;
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-1 text-gray-500 select-none">
            ...
          </span>
        ) : (
          <button
            key={`page-${p}`}
            onClick={() => onPageChange(p)}
            className={pageBtn(p === currentPage)}
          >
            {p}
          </button>
        )
      )}

      {/* > Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={btnBase}
      >
        &gt;
      </button>

      {/* >> Last */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={btnBase}
      >
        &gt;&gt;
      </button>
    </div>
  );
}
