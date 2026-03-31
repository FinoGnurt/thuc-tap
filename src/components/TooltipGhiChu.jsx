import tableIcon from "@/assets/images/ghichu_48.png";
import { useEffect, useRef, useState } from "react";

/**
 * Icon clipboard với tooltip thông minh:
 * - Desktop (có chuột / hover):  hover để xem nội dung ghi chú.
 * - Mobile/touch (hover: none):  tap để toggle tooltip, tap ngoài để đóng.
 *
 * Phát hiện thiết bị qua media query `(hover: none)` — chính xác hơn
 * user-agent sniffing và cập nhật tự động khi thay đổi input device.
 *
 * Props:
 *   text  - nội dung ghi chú. Nếu rỗng chỉ hiện icon, không có tooltip.
 */
export default function TooltipGhiChu({ text = "" }) {
  const hasText = !!text;

  // true khi thiết bị không hỗ trợ hover (touchscreen)
  const [isTouch, setIsTouch] = useState(false);
  // Chỉ dùng cho touch: trạng thái mở/đóng tooltip
  const [open, setOpen] = useState(false);

  const wrapRef = useRef(null);

  // ── Phát hiện thiết bị ────────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    setIsTouch(mq.matches);
    const onChange = (e) => {
      setIsTouch(e.matches);
      setOpen(false); // reset khi chuyển device
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ── Touch: click ngoài → đóng ─────────────────────────────────────────────
  useEffect(() => {
    if (!isTouch || !open) return;
    const handle = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("touchstart", handle);
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("touchstart", handle);
      document.removeEventListener("mousedown", handle);
    };
  }, [isTouch, open]);

  const handleTap = (e) => {
    if (!isTouch || !hasText) return;
    e.stopPropagation();
    setOpen((v) => !v);
  };

  return (
    <div
      ref={wrapRef}
      onClick={handleTap}
      className={`relative inline-flex items-center justify-center ${
        !hasText
          ? "cursor-default"
          : isTouch
            ? "cursor-pointer"
            : "group cursor-pointer"
      }`}
    >
      <img
        src={tableIcon}
        alt="ghi chú"
        className="w-5 h-5 object-contain select-none"
      />

      {/* Tooltip — chỉ render khi có text */}
      {hasText && (
        <div
          className={`
            absolute bottom-full left-1/2 -translate-x-1/2 mb-2
            w-max max-w-[160px]
            px-2.5 py-1.5
            bg-gray-800 text-white text-[11px] leading-relaxed
            rounded shadow-lg
            whitespace-pre-wrap break-words
            transition-all duration-200 ease-out
            z-[100]
            ${
              isTouch
                ? // Touch: kiểm soát bằng state
                  open
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
                : // Desktop: CSS group-hover thuần
                  "opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
            }
          `}
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
