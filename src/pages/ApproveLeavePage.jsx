import Breadcrumb from "@/components/Breadcrumb";
import SectionHeader from "@/components/common/SectionHeader";
import { useLoading } from "@/hooks/useLoading";
import {
  danhDauDaGuiEmail,
  duyetBaoNghi,
  getDanhSachBaoNghi,
  tuChoiBaoNghi,
} from "@/services/baoNghiService";
import { taoNoiDungEmail } from "@/utils/emailTemplate";
import { sendEmail } from "@/utils/sendEmail";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

// Tìm email phòng đào tạo từ data user

// Giả lập gửi email (log ra console + hiển thị popup)

export default function ApproveLeavePage() {
  const [dsBaoNghi, setDsBaoNghi] = useState([]);
  const [ghiChuTK, setGhiChuTK] = useState({});
  const [emailPopup, setEmailPopup] = useState(null); // { to, subject, body }
  const [thongBao, setThongBao] = useState(null);
  const [sendMailExample, setSendMailExample] = useState(
    localStorage.getItem("mailExample") || "",
  );
  const { showLoading, hideLoading } = useLoading();
  const [popupMode, setPopupMode] = useState("sent");

  const navigate = useNavigate();
  const hasPrompted = useRef(false);

  useEffect(() => {
    // Nhập mail fake
    const inputMailFake = () => {
      if (sendMailExample || hasPrompted.current) return;
      hasPrompted.current = true;

      let email = "";

      while (true) {
        email = prompt("Nhập email để gửi phòng đào tạo (email thật):");

        // user bấm cancel
        if (email === null) {
          navigate(-1);
          return;
        }

        email = email.trim();

        // rỗng thì nhập lại
        if (!email) continue;

        // validate đúng
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!isValid) {
          alert("Email không hợp lệ!");
          continue;
        }

        break; // hợp lệ thì thoát loop
      }

      localStorage.setItem("mailExample", email);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSendMailExample(email);
    };

    // lấy danh sách báo nghỉ
    const initData = async () => {
      showLoading();
      const dsBaoNghi = await getDanhSachBaoNghi();
      setDsBaoNghi(dsBaoNghi);
      hideLoading();
    };

    initData();
    inputMailFake();
  }, []);

  const handleDuyet = async (donBaoNghi, donId) => {
    showLoading();
    const res = await duyetBaoNghi(donId, donBaoNghi, ghiChuTK[donId] || "");
    if (res) {
      await danhDauDaGuiEmail(donId);
      const emailInfo = taoNoiDungEmail(res, sendMailExample);
      setEmailPopup({ ...emailInfo, emailDaGui: true });
      setPopupMode("sent");
      sendEmail(res, sendMailExample);
      setThongBao({
        loai: "success",
        noi: `Đã duyệt đơn của ${res.tenGV} và gửi thông báo đến phòng đào tạo.`,
      });
      setDsBaoNghi(dsBaoNghi.map((d) => (d.id === donId ? res : d)));
    }
    hideLoading();
  };

  const handleTuChoi = async (donTuChoi, donId) => {
    if (!ghiChuTK[donId]?.trim()) {
      setThongBao({ loai: "error", noi: "Vui lòng nhập lý do từ chối!" });
      return;
    }
    showLoading();
    const resData = await tuChoiBaoNghi(donId, donTuChoi, ghiChuTK[donId]);
    if (resData)
      setDsBaoNghi(dsBaoNghi.map((d) => (d.id === donId ? resData : d)));
    setThongBao({ loai: "error", noi: "Đã từ chối đơn báo nghỉ." });
    hideLoading();
  };

  const choDuyet = dsBaoNghi.filter((d) => d.trangThai === "cho_duyet");
  const daXuLy = dsBaoNghi.filter((d) => d.trangThai !== "cho_duyet");

  const trangThaiLabel = (tt) => {
    if (tt === "da_duyet")
      return <span className="text-green-700 font-semibold">Đã duyệt</span>;
    if (tt === "tu_choi")
      return <span className="text-red-600 font-semibold">Từ chối</span>;
    return null;
  };

  return (
    <div className="bg-white p-2 sm:p-3">
      <Breadcrumb currentTitle="Duyệt báo nghỉ dạy" />

      {/* Email popup */}
      {emailPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-400 shadow-xl w-[95vw] sm:w-[520px] text-[12px]">
            <div className="bg-[#243A83] text-white px-4 py-2 font-bold flex justify-between items-center">
              {/* Tiêu đề popup */}
              <span>
                📧{" "}
                {popupMode === "sent"
                  ? "Đã gửi email thông báo đến Phòng Đào Tạo"
                  : "Chi tiết"}
              </span>
              <button
                onClick={() => setEmailPopup(null)}
                className="text-white hover:text-gray-300 text-lg leading-none cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-2">
              <div>
                <span className="font-semibold text-gray-600">Đến:</span>{" "}
                <span className="text-blue-700">{emailPopup.to}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Tiêu đề:</span>{" "}
                {emailPopup.subject}
              </div>
              <div>
                <span className="font-semibold text-gray-600">Nội dung:</span>
                <pre className="mt-1 bg-[#f9f9f0] border border-gray-200 p-2 whitespace-pre-wrap text-[11px] leading-relaxed max-h-48 overflow-y-auto">
                  {emailPopup.body}
                </pre>
              </div>
              {/* Footer note */}
              {popupMode === "sent" && (
                <div className="text-[11px] text-gray-500 italic">
                  * Đây là email tự động gửi đến phòng đào tạo.
                </div>
              )}
              {popupMode === "detail" && (
                <div
                  className={`text-[11px] italic font-semibold ${emailPopup.emailDaGui ? "text-green-600" : "text-red-500"}`}
                >
                  {emailPopup.emailDaGui
                    ? "Đã email đến phòng đào tạo thành công!"
                    : "Có lỗi xảy ra trong quá trình gửi email"}
                </div>
              )}
              <button
                onClick={() => setEmailPopup(null)}
                className="mt-1 bg-[#243A83] text-white px-4 py-1 cursor-pointer hover:bg-[#2e4bac]"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {thongBao && (
        <div
          className={`mb-3 px-3 py-2 border text-[12px] ${
            thongBao.loai === "success"
              ? "bg-green-50 border-green-400 text-green-800"
              : "bg-red-50 border-red-400 text-red-800"
          }`}
        >
          {thongBao.noi}
          <button
            onClick={() => setThongBao(null)}
            className="ml-3 underline cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Chờ duyệt */}
      <SectionHeader title={`ĐANG CHỜ DUYỆT (${choDuyet.length})`} />
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[700px] border-collapse text-[12px] border border-gray-300 mt-1">
          <thead>
            <tr className="bg-[#6a9bbf] text-white">
              <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                STT
              </th>
              <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                Giảng viên
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
                Ghi chú GV
              </th>
              <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                Ngày gửi
              </th>
              <th className="px-2 py-1.5 border border-[#5a8aae] text-center w-[200px]">
                Ghi chú / Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {choDuyet.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-4 text-gray-500 border border-gray-300"
                >
                  Không có đơn nào chờ duyệt.
                </td>
              </tr>
            ) : (
              choDuyet.map((d, i) => (
                <tr
                  key={d.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#f5f5e8]"}
                >
                  <td className="px-2 py-1 border border-gray-300 text-center">
                    {i + 1}
                  </td>
                  <td className="px-2 py-1 border border-gray-300 font-semibold text-[#1a3a5c]">
                    {d.tenGV}
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
                  <td className="px-2 py-1 border border-gray-300">{d.lyDo}</td>
                  <td className="px-2 py-1 border border-gray-300">
                    {d.ghiChuGV?.trim() || (
                      <span className="text-gray-400">(Không có)</span>
                    )}
                  </td>
                  <td className="px-2 py-1 border border-gray-300 text-center">
                    {d.ngayGui}
                  </td>
                  <td className="px-2 py-1 border border-gray-300">
                    <textarea
                      placeholder="Ghi chú (bắt buộc khi từ chối)..."
                      value={ghiChuTK[d.id] || ""}
                      onChange={(e) =>
                        setGhiChuTK((prev) => ({
                          ...prev,
                          [d.id]: e.target.value,
                        }))
                      }
                      rows={2}
                      className="w-full border border-gray-300 px-1 py-0.5 text-[11px] resize-none mb-1"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDuyet(d, d.id)}
                        className="flex-1 bg-green-700 text-white px-2 py-1 text-[11px] cursor-pointer hover:bg-green-800"
                      >
                        ✓ Duyệt
                      </button>
                      <button
                        onClick={() => handleTuChoi(d, d.id)}
                        className="flex-1 bg-red-600 text-white px-2 py-1 text-[11px] cursor-pointer hover:bg-red-700"
                      >
                        ✗ Từ chối
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Đã xử lý */}
      <div className="mt-5">
        <SectionHeader title={`ĐÃ XỬ LÝ (${daXuLy.length})`} />
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[650px] border-collapse text-[12px] border border-gray-300 mt-1">
            <thead>
              <tr className="bg-[#6a9bbf] text-white">
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  STT
                </th>
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  Giảng viên
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
                  Lý do
                </th>
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  Ngày duyệt
                </th>
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  Trạng thái
                </th>
                <th className="px-2 py-1.5 border border-[#5a8aae] text-center">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {daXuLy.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-4 text-gray-500 border border-gray-300"
                  >
                    Chưa có.
                  </td>
                </tr>
              ) : (
                daXuLy.map((d, i) => {
                  return (
                    <tr
                      key={d.id}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#f5f5e8]"}
                    >
                      <td className="px-2 py-1 border border-gray-300 text-center">
                        {i + 1}
                      </td>
                      <td className="px-2 py-1 border border-gray-300 font-semibold text-[#1a3a5c]">
                        {d.tenGV}
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
                      <td className="px-2 py-1 border border-gray-300">
                        {d.lyDo}
                      </td>
                      <td className="px-2 py-1 border border-gray-300 text-center">
                        {d.ngayDuyet}
                      </td>
                      <td className="px-2 py-1 border border-gray-300 text-center max-w-52">
                        {trangThaiLabel(d.trangThai)}
                        {d.ghiChuTK && (
                          <p className="text-[11px] text-gray-500 italic">
                            ({d.ghiChuTK})
                          </p>
                        )}
                      </td>
                      <td className="px-2 py-1 border border-gray-300 text-center max-w-17">
                        <button
                          onClick={() => {
                            setEmailPopup({
                              ...taoNoiDungEmail(d, sendMailExample),
                              emailDaGui: d.emailDaGui,
                            });
                            setPopupMode("detail");
                          }}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded cursor-pointer border transition-colors ${
                            d.emailDaGui
                              ? "text-green-700 border-green-300 bg-green-50 hover:bg-green-100"
                              : "text-gray-400 border-gray-300 bg-gray-50 hover:bg-gray-100"
                          }`}
                          title="Xem chi tiết email"
                        >
                          {d.emailDaGui ? "✉ Đã gửi" : "✉ Chưa gửi"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
