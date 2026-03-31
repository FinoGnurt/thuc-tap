import tableIcon from "@/assets/images/ghichu_48.png";

/**
 * Icon clipboard.
 * - Luôn hiển thị icon khi được render (caller quyết định khi nào render).
 * - Nếu có `text` → hiện tooltip hover phía TRÊN icon.
 * - Tooltip dùng `bottom-full` thay `left-full` để không bị cắt bởi overflow-x-auto của bảng.
 *
 * Props:
 *   text  - nội dung ghi chú (optional). Nếu rỗng thì chỉ hiện icon, không có tooltip.
 */
export default function TooltipGhiChu({ text = "" }) {
  const hasText = !!text;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        hasText ? "group cursor-pointer" : "cursor-default"
      }`}
    >
      <img src={tableIcon} alt="ghi chú" className="w-5 h-5 object-contain" />

      {/* Tooltip — chỉ render khi có text */}
      {hasText && (
        <div
          className="
            absolute bottom-full left-1/2 -translate-x-1/2 mb-2
            w-max max-w-[160px]
            px-2.5 py-1.5
            bg-gray-800 text-white text-[11px] leading-relaxed
            rounded shadow-lg
            whitespace-pre-wrap break-words
            opacity-0 scale-95 pointer-events-none
            transition-all duration-200 ease-out
            group-hover:opacity-100 group-hover:scale-100
            z-[100]
          "
        >
          {text}

          {/* Mũi tên xuống */}
          <span
            className="
              absolute top-full left-1/2 -translate-x-1/2
              w-0 h-0
              border-l-[5px] border-r-[5px] border-t-[5px]
              border-l-transparent border-r-transparent border-t-gray-800
            "
          />
        </div>
      )}
    </div>
  );
}
