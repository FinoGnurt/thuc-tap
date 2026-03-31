import Breadcrumb from "@/components/Breadcrumb";
import SectionHeader from "@/components/common/SectionHeader";
import { UserContext } from "@/contexts/UserContext";
import { useLoading } from "@/hooks/useLoading";
import { getChiTietKeHoach, updateNote } from "@/services/monHocService";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import GhiChuPopup from "@/components/GhiChuPopup";

import InfoCard from "@/components/InfoCard";
import TuanTable from "@/components/TuanTable";
import { chunkArray, getTuanHienTai, tinhTongDenTuan } from "@/utils/tuanUtils";

const MAX_COLS = 14;

export default function TeachingPlanPage() {
  const { user } = useContext(UserContext);
  const { showLoading, hideLoading } = useLoading();
  const { id } = useParams();

  const [mon, setMon] = useState(null);
  const [ghiChuMap, setGhiChuMap] = useState({}); // { [tuan]: string }
  const [activePopup, setActivePopup] = useState(null); // { tuan, anchorRef }

  const pencilRefs = useRef({}); // { [tuan]: HTMLElement }

  // ── Fetch ────────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      showLoading();
      const data = await getChiTietKeHoach(id);
      hideLoading();
      setMon(data);

      // Khởi tạo ghiChuMap từ API
      if (data?.cacTuan) {
        const map = {};
        data.cacTuan.forEach((t) => {
          if (t.ghiChu) map[t.tuan] = t.ghiChu;
        });
        setGhiChuMap(map);
      }
    })();
  }, [id]);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (!mon) {
    return (
      <div className="bg-white p-2 sm:p-3 text-[12px] text-[#999] italic">
        Đang tải dữ liệu...
      </div>
    );
  }

  // ── Tính toán ─────────────────────────────────────────────────────────────
  const tuanHienTai = getTuanHienTai(mon.cacTuan);
  const { tongDaDay, tongDuKien } = tinhTongDenTuan(mon.cacTuan, tuanHienTai);
  const nhomTuan = chunkArray(mon.cacTuan, MAX_COLS);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePencilClick = (tuan) => {
    if (activePopup?.tuan === tuan) {
      setActivePopup(null);
      return;
    }
    setActivePopup({
      tuan,
      anchorRef: { current: pencilRefs.current[tuan] },
    });
  };

  const handleSaveGhiChu = async (tuan, text) => {
    // Optimistic update
    setGhiChuMap((prev) => ({ ...prev, [tuan]: text }));
    try {
      await updateNote(id, tuan, text);
    } catch (err) {
      console.error("Lưu ghi chú thất bại:", err);
      // Rollback
      setGhiChuMap((prev) => {
        const next = { ...prev };
        delete next[tuan];
        return next;
      });
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white p-2 sm:p-3">
      <Breadcrumb currentTitle="Chi tiết kế hoạch giảng dạy" />
      <SectionHeader title="CHI TIẾT KẾ HOẠCH GIẢNG DẠY" />

      {/* Icon in */}
      <div className="mt-2 mb-3">
        <button
          onClick={() => window.print()}
          title="In trang"
          className="cursor-pointer hover:opacity-70 text-[18px]"
        >
          🖨️
        </button>
      </div>

      {/* Card thông tin */}
      <InfoCard
        tenGiangVien={user?.name || "Phạm Thế Trí"}
        mon={mon}
        tongDaDay={tongDaDay}
        tongDuKien={tongDuKien}
      />

      {/* Bảng tuần — mỗi nhóm tối đa MAX_COLS cột */}
      {nhomTuan.map((nhom, idx) => (
        <TuanTable
          key={idx}
          nhom={nhom}
          tuanHienTai={tuanHienTai}
          ghiChuMap={ghiChuMap}
          activePopupTuan={activePopup?.tuan ?? null}
          pencilRefs={pencilRefs}
          onPencilClick={handlePencilClick}
        />
      ))}

      {/* Popup ghi chú */}
      {activePopup && (
        <GhiChuPopup
          key={activePopup.tuan}
          tuan={activePopup.tuan}
          ghiChuGV={ghiChuMap[activePopup.tuan] ?? ""}
          anchorRef={activePopup.anchorRef}
          onClose={() => setActivePopup(null)}
          onSave={handleSaveGhiChu}
        />
      )}

      <div className="mt-2 text-[11px] text-gray-600 italic px-1">
        * Tuần hiện tại được tô màu xanh. Tuần có báo nghỉ đã duyệt hiển thị{" "}
        <strong>✓</strong> ở hàng Ghi chú.
      </div>
    </div>
  );
}
