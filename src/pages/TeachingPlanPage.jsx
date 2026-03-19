import Breadcrumb from "@/components/Breadcrumb";
import SectionHeader from "@/components/common/SectionHeader";
import { useLoading } from "@/hooks/useLoading";
import { getDanhSachMonHoc } from "@/services/monHocService";
import { useEffect, useState } from "react";

const TUAN_HIEN_TAI = 7; // Tuần đang highlight

export default function TeachingPlanPage() {
  const { showLoading, hideLoading } = useLoading();
  const [dsMonHoc, setDsMonHoc] = useState([]);
  useEffect(() => {
    (async () => {
      showLoading();
      const dsMonHoc = await getDanhSachMonHoc();
      hideLoading();
      setDsMonHoc(dsMonHoc);
    })();
  }, []);

  return (
    <div className="bg-white p-2 sm:p-3">
      <Breadcrumb currentTitle="Kế hoạch dạy học" />
      <SectionHeader title="KẾ HOẠCH DẠY HỌC THEO TUẦN" />

      <div className="mt-2 text-[11px] text-gray-600 italic mb-3 px-1">
        * Các tuần đã được duyệt báo nghỉ sẽ hiển thị <strong>0</strong> ở hàng
        "Đã dạy". Tuần hiện tại được tô màu xanh.
      </div>

      {dsMonHoc.map((mon) => (
        <div key={mon.id} className="mb-6">
          <div className="bg-[#e8edf5] border border-[#aabfcf] px-3 py-1.5 text-[12px] font-bold text-[#1a3a5c] mb-0">
            {mon.tenMon} — Lớp: {mon.lop}
          </div>

          {/* Bảng cuộn ngang */}
          <div className="overflow-x-auto">
            <table className="border-collapse text-[11px] border border-gray-400 w-full min-w-[900px]">
              <thead>
                {/* Hàng 1: Tiêu đề tuần */}
                <tr>
                  <th
                    rowSpan={2}
                    className="border border-gray-400 bg-[#c8d8e8] text-[#1a3a5c] px-2 py-1 text-center w-[80px] align-middle font-bold"
                  >
                    Số tiết
                  </th>
                  {mon.cacTuan.map((t) => {
                    const isHienTai = t.tuan === TUAN_HIEN_TAI;
                    return (
                      <th
                        key={t.tuan}
                        className={`border border-gray-400 px-1 py-1 text-center font-bold ${
                          isHienTai
                            ? "bg-[#4db6e8] text-white"
                            : "bg-[#c8d8e8] text-[#1a3a5c]"
                        }`}
                      >
                        <div>Tuần {t.tuan}</div>
                        <div className="font-normal text-[10px] leading-tight">
                          {t.batDau}
                        </div>
                        <div className="font-normal text-[10px] leading-tight">
                          đến
                        </div>
                        <div className="font-normal text-[10px] leading-tight">
                          {t.ketThuc}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {/* Hàng dự kiến */}
                <tr>
                  <td className="border border-gray-400 bg-white px-2 py-1 font-semibold text-center">
                    Dự kiến
                  </td>
                  {mon.cacTuan.map((t) => (
                    <td
                      key={t.tuan}
                      className="border border-gray-400 bg-white text-center py-1"
                    >
                      {t.duKien}
                    </td>
                  ))}
                </tr>

                {/* Hàng đã dạy */}
                <tr>
                  <td className="border border-gray-400 bg-[#fffff0] px-2 py-1 font-semibold text-center">
                    Đã dạy
                  </td>
                  {mon.cacTuan.map((t) => {
                    const isDaDuyet = t.trangThai === "da_duyet";
                    return (
                      <td
                        key={t.tuan}
                        className={`border border-gray-400 text-center py-1 ${
                          isDaDuyet
                            ? "bg-red-50 text-red-700 font-bold"
                            : "bg-[#fffff0]"
                        }`}
                        title={isDaDuyet ? "Tuần nghỉ đã được duyệt" : ""}
                      >
                        {t.daDay === null ? "" : t.daDay}
                      </td>
                    );
                  })}
                </tr>

                {/* Hàng ghi chú (icon bút chì) */}
                <tr>
                  <td className="border border-gray-400 bg-white px-2 py-1 font-semibold text-center">
                    Ghi chú
                  </td>
                  {mon.cacTuan.map((t) => (
                    <td
                      key={t.tuan}
                      className="border border-gray-400 bg-white text-center py-1"
                    >
                      {t.trangThai === "da_duyet" ? (
                        <span
                          title="Đã duyệt nghỉ"
                          className="text-green-700 text-[13px]"
                        >
                          ✓
                        </span>
                      ) : (
                        <span className="text-orange-500 text-[13px]">✏️</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
