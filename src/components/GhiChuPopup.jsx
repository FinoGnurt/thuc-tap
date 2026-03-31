import { useEffect, useRef, useState } from "react";

/**
 * Popup ghi chú giảng viên.
 * Gắn vào vị trí của `anchorRef` (nút bút chì), tự tránh tràn viewport.
 *
 * Props:
 *   tuan       - số tuần
 *   ghiChuGV   - nội dung hiện tại (có thể rỗng)
 *   anchorRef  - { current: HTMLElement } của nút bút chì
 *   onClose    - callback đóng popup
 *   onSave     - callback(tuan, text) khi bấm Cập nhật
 */
export default function GhiChuPopup({ tuan, ghiChuGV = "", anchorRef, onClose, onSave }) {
  const [text, setText] = useState(ghiChuGV);
  const popupRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);

  const POPUP_W = 220;
  const POPUP_H = 148;

  // ── Tính vị trí ────────────────────────────────────────────────────────────
  useEffect(() => {
    const anchor = anchorRef?.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();

    let left = rect.left + rect.width / 2 - POPUP_W / 2;
    let top  = rect.bottom + 8;

    // Tránh tràn phải / trái
    left = Math.max(8, Math.min(left, window.innerWidth - POPUP_W - 8));
    // Tránh tràn xuống → flip lên trên
    if (top + POPUP_H > window.innerHeight - 8) {
      top = rect.top - POPUP_H - 8;
    }

    setPos({ top, left });
    requestAnimationFrame(() => setVisible(true));
  }, [anchorRef]);

  // ── Click ngoài → đóng ────────────────────────────────────────────────────
  useEffect(() => {
    const handle = (e) => {
      if (
        popupRef.current?.contains(e.target) ||
        anchorRef?.current?.contains(e.target)
      )
        return;
      triggerClose();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const triggerClose = () => {
    setVisible(false);
    setTimeout(onClose, 180);
  };

  const handleSave = () => {
    onSave(tuan, text);
    triggerClose();
  };

  // Vị trí mũi tên căn theo nút anchor
  const arrowLeft = (() => {
    const anchor = anchorRef?.current;
    if (!anchor) return 90;
    const rect = anchor.getBoundingClientRect();
    const center = rect.left + rect.width / 2 - pos.left - 7;
    return Math.min(Math.max(center, 10), POPUP_W - 24);
  })();

  return (
    <div
      ref={popupRef}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        zIndex: 9999,
        width: POPUP_W,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.96)",
        transition: "opacity 0.18s ease, transform 0.18s ease",
        transformOrigin: "top center",
      }}
      className="bg-[#3c3c3c] text-white rounded-sm shadow-2xl border border-[#555] text-[12px]"
    >
      {/* Mũi tên ▲ */}
      <div
        style={{
          position: "absolute",
          top: -7,
          left: arrowLeft,
          width: 0,
          height: 0,
          borderLeft: "7px solid transparent",
          borderRight: "7px solid transparent",
          borderBottom: "7px solid #3c3c3c",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div className="px-3 pt-2.5 pb-1.5 text-[11px] text-[#ccc] font-semibold border-b border-[#555]">
        Ghi chú giảng viên:{" "}
        <span className="text-[#4db6e8]">(tuần {tuan})</span>
      </div>

      {/* Body */}
      <div className="px-2 pt-2 pb-1">
        <textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full bg-white text-black text-[12px] border border-[#aaa] px-1.5 py-1 resize-none outline-none"
          placeholder="Nhập ghi chú..."
        />
      </div>

      {/* Footer */}
      <div className="px-2 pb-2.5 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#555] hover:bg-[#666] active:bg-[#444] text-white text-[11px] px-5 py-1 cursor-pointer transition-colors"
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
}
