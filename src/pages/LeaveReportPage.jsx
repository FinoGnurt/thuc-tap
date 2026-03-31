import Breadcrumb from "@/components/Breadcrumb";
import SectionHeader from "@/components/common/SectionHeader";
import { useLoading } from "@/hooks/useLoading";
import { getDanhSachBaoNghi, themBaoNghi } from "@/services/baoNghiService";
import { getDanhSachMonHoc } from "@/services/monHocService";
import { useEffect, useState } from "react";

const LY_DO_MAU = [
  "Bệnh",
  "Công tác",
  "Hội thảo / Hội nghị",
  "Việc cá nhân",
  "Lý do khác",
];

export default function LeaveReportPage() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const [idMonHoc, setIdMonHoc] = useState("");
  const [tuanBaoNghi, setTuanBaoNghi] = useState("");
  const [lyDo, setLyDo] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  const [thongBao, setThongBao] = useState(null); // { loai: "success"|"error", noi: string }
  const [dsMonHoc, setDsMonHoc] = useState([]);
  const [dsBaoNghi, setDsBaoNghi] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      showLoading();

      const [monHoc, baoNghi] = await Promise.all([
        getDanhSachMonHoc(),
        getDanhSachBaoNghi(),
      ]);

      setDsMonHoc(monHoc);
      setDsBaoNghi(baoNghi);

      hideLoading();
    };

    fetchData();
  }, []);

  const dsBaoNghiCuaGV = dsBaoNghi.filter((d) => d.tenGV === userLogin?.name);

  const chonMonHoc = dsMonHoc.find((m) => m.id === Number(idMonHoc));
  const cacTuanChuaBaoNghi =
    chonMonHoc?.cacTuan.filter((t) => t.duKien > 0 && t.daDay === null) ?? [];
  console.log(chonMonHoc);
  const handleGui = async () => {
    if (!idMonHoc || !tuanBaoNghi || !lyDo) {
      setThongBao({
        loai: "error",
        noi: "Vui lòng điền đầy đủ thông tin bắt buộc!",
      });
      return;
    }
    const tuan = parseInt(tuanBaoNghi);
    const tuanInfo = chonMonHoc.cacTuan.find((t) => t.tuan === tuan);

    // Kiểm tra đã báo nghỉ tuần này chưa
    const trung = dsBaoNghi.find(
      (d) =>
        d.idMonHoc === idMonHoc && d.tuan === tuan && d.trangThai !== "tu_choi",
    );
    if (trung) {
      setThongBao({
        loai: "error",
        noi: "Bạn đã báo nghỉ tuần này cho môn học này rồi!",
      });
      return;
    }

    showLoading();
    const dsBaoNghiMoi = await themBaoNghi({
      tenGV: userLogin.name,
      idMonHoc,
      tenMon: chonMonHoc.tenMon,
      lop: chonMonHoc.lop,
      tuan,
      tuanInfo: tuanInfo ? `${tuanInfo.batDau} đến ${tuanInfo.ketThuc}` : "",
      soTietDuKien: tuanInfo?.duKien ?? 0,
      lyDo,
      ghiChuGV: ghiChu,
      ghiChuTK: "",
    });
    hideLoading();

    setThongBao({
      loai: "success",
      noi: "Gửi đơn báo nghỉ thành công! Đang chờ trưởng khoa duyệt.",
    });
    setIdMonHoc("");
    setTuanBaoNghi("");
    setLyDo("");
    setGhiChu("");
    setDsBaoNghi([...dsBaoNghi, dsBaoNghiMoi]);
  };

  const trangThaiLabel = (tt) => {
    if (tt === "cho_duyet")
      return <span className="text-orange-600 font-semibold">Chờ duyệt</span>;
    if (tt === "da_duyet")
      return <span className="text-green-700 font-semibold">Đã duyệt</span>;
    if (tt === "tu_choi")
      return <span className="text-red-600 font-semibold">Từ chối</span>;
    return null;
  };

  return (
    <div className="bg-white p-2 sm:p-3">
      <Breadcrumb currentTitle="Báo nghỉ dạy" />

      {/* Form báo nghỉ */}
      <SectionHeader title="ĐĂNG KÝ BÁO NGHỈ DẠY" />

      <div className="bg-[#FFFFF0] border border-[#E1E1E1] p-4 mt-1 text-[12px]">
        {thongBao && (
          <div
            className={`mb-3 px-3 py-2 border text-[12px] ${
              thongBao.loai === "success"
                ? "bg-green-50 border-green-400 text-green-800"
                : "bg-red-50 border-red-400 text-red-800"
            }`}
          >
            {thongBao.noi}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-2xl">
          <div>
            <label className="block text-[#555] mb-0.5 font-semibold">
              Giảng viên:
            </label>
            <input
              type="text"
              readOnly
              value={userLogin?.name ?? ""}
              className="w-full border border-[#aaa] px-1.5 py-1 bg-gray-100 text-[12px] text-gray-500 cursor-default"
            />
          </div>

          <div>
            <label className="block text-[#555] mb-0.5 font-semibold">
              Môn học / Lớp: <span className="text-red-600">*</span>
            </label>
            <select
              value={idMonHoc}
              onChange={(e) => {
                setIdMonHoc(e.target.value);
                setTuanBaoNghi("");
              }}
              className="w-full border border-[#aaa] px-1.5 py-1 text-[12px] bg-white"
            >
              <option value="">-- Chọn môn học --</option>
              {dsMonHoc.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.monHoc} - {m.lop}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#555] mb-0.5 font-semibold">
              Tuần báo nghỉ: <span className="text-red-600">*</span>
            </label>
            <select
              value={tuanBaoNghi}
              onChange={(e) => setTuanBaoNghi(e.target.value)}
              className="w-full border border-[#aaa] px-1.5 py-1 text-[12px] bg-white disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
              disabled={!idMonHoc}
            >
              <option value="">-- Chọn tuần --</option>
              {cacTuanChuaBaoNghi.map((t) => (
                <option key={t.tuan} value={t.tuan}>
                  Tuần {t.tuan} ({t.batDau} đến {t.ketThuc}) — {t.duKien} tiết
                </option>
              ))}
            </select>
            {idMonHoc && cacTuanChuaBaoNghi.length === 0 && (
              <p className="text-orange-600 mt-0.5">
                Không còn tuần nào có thể báo nghỉ.
              </p>
            )}
          </div>

          <div>
            <label className="block text-[#555] mb-0.5 font-semibold">
              Lý do: <span className="text-red-600">*</span>
            </label>
            <select
              value={lyDo}
              onChange={(e) => setLyDo(e.target.value)}
              className="w-full border border-[#aaa] px-1.5 py-1 text-[12px] bg-white"
            >
              <option value="">-- Chọn lý do --</option>
              {LY_DO_MAU.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-[#555] mb-0.5 font-semibold">
              Ghi chú thêm:
            </label>
            <textarea
              value={ghiChu}
              onChange={(e) => setGhiChu(e.target.value)}
              rows={3}
              className="w-full border border-[#aaa] px-1.5 py-1 text-[12px] resize-none outline-gray-400"
              placeholder="Nhập ghi chú (nếu có)..."
            />
          </div>
        </div>

        <button
          onClick={handleGui}
          className="mt-3 bg-[#243A83] text-white px-5 py-1.5 text-[12px] cursor-pointer hover:bg-[#2e4bac] transition-colors"
        >
          Gửi đơn báo nghỉ
        </button>
      </div>

      {/* Danh sách đơn đã gửi */}
      <div className="mt-4">
        <SectionHeader title="DANH SÁCH ĐƠN ĐÃ GỬI" />
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[600px] border-collapse text-[12px] border border-gray-300 mt-1">
            <thead>
              <tr className="bg-[#6a9bbf] text-white">
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  STT
                </th>
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  Môn học
                </th>
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  Lớp
                </th>
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  Tuần
                </th>
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  Thời gian
                </th>
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  Lý do
                </th>
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  Ngày gửi
                </th>
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {dsBaoNghiCuaGV.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-4 text-gray-500 border border-gray-300"
                  >
                    Chưa có đơn báo nghỉ nào.
                  </td>
                </tr>
              ) : (
                dsBaoNghiCuaGV.map((d, i) => (
                  <tr
                    key={d.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#f5f5e8]"}
                  >
                    <td className="px-2 py-1 border border-gray-300 text-center">
                      {i + 1}
                    </td>
                    <td className="px-2 py-1 border border-gray-300">
                      {d.tenMon}
                    </td>
                    <td className="px-2 py-1 border border-gray-300 text-center">
                      {d.lop}
                    </td>
                    <td className="px-2 py-1 border border-gray-300 text-center">
                      Tuần {d.tuan}
                    </td>
                    <td className="px-2 py-1 border border-gray-300 text-center text-[11px]">
                      {d.tuanInfo}
                    </td>
                    <td className="px-2 py-1 border border-gray-300">
                      {d.lyDo}
                    </td>
                    <td className="px-2 py-1 border border-gray-300 text-center">
                      {d.ngayGui}
                    </td>
                    <td className="px-2 py-1 border border-gray-300 text-center">
                      {trangThaiLabel(d.trangThai)}
                      {d.ghiChuTK && (
                        <p className="text-[11px] text-gray-500 mt-0.5 italic">
                          ({d.ghiChuTK})
                        </p>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
