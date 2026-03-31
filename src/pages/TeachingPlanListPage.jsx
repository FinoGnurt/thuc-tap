import Breadcrumb from "@/components/Breadcrumb";
import SectionHeader from "@/components/common/SectionHeader";
import { UserContext } from "@/contexts/UserContext";
import { useLoading } from "@/hooks/useLoading";
import { getDanhSachKeHoach } from "@/services/monHocService";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function TeachingPlanListPage() {
  const { user } = useContext(UserContext);

  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [danhSach, setDanhSach] = useState([]);
  const [anCu, setAnCu] = useState(true);

  // Filter states
  const [filterLop, setFilterLop] = useState("");
  const [filterMonHoc, setFilterMonHoc] = useState("");
  const [filterBuoi, setFilterBuoi] = useState("");
  const [filterHocKy, setFilterHocKy] = useState("");
  const [filterNamHoc, setFilterNamHoc] = useState("");
  const [filterTrangThai, setFilterTrangThai] = useState("");

  useEffect(() => {
    (async () => {
      showLoading();
      const res = await getDanhSachKeHoach();
      hideLoading();
      setApiData(res);
      setDanhSach(res.data || []);
    })();
  }, []);

  const handleTimKiem = () => {
    let result = apiData?.data || [];
    if (filterLop) result = result.filter((m) => m.lop === filterLop);
    if (filterMonHoc)
      result = result.filter((m) => m.monHoc.includes(filterMonHoc));
    if (filterBuoi) result = result.filter((m) => m.buoi === filterBuoi);
    if (filterHocKy)
      result = result.filter((m) => String(m.hocKy) === filterHocKy);
    if (filterNamHoc) result = result.filter((m) => m.namHoc === filterNamHoc);
    if (filterTrangThai)
      result = result.filter((m) => m.trangThai === filterTrangThai);
    setDanhSach(result);
  };

  // Lấy unique values cho dropdowns
  const allData = apiData?.data || [];
  const danhSachLop = [...new Set(allData.map((m) => m.lop))];
  const danhSachMonHoc = [...new Set(allData.map((m) => m.monHoc))];
  const danhSachNamHoc = [...new Set(allData.map((m) => m.namHoc))];

  const danhSachHienThi = anCu
    ? danhSach
    : danhSach.filter((m) => m.trangThai !== "Đã kết thúc");

  console.log(danhSachHienThi);

  return (
    <div className="bg-white p-2 sm:p-3">
      <Breadcrumb currentTitle="Kế hoạch giảng dạy" />
      <SectionHeader title="DANH SÁCH KẾ HOẠCH GIẢNG DẠY" />

      {/* Bộ lọc */}
      <div className="mt-3 text-[12px]">
        <div className="flex flex-wrap gap-2 mb-2">
          {/* Lớp */}
          <select
            value={filterLop}
            onChange={(e) => setFilterLop(e.target.value)}
            className="border border-[#ccc] px-2 py-1 text-[12px] min-w-[130px]"
          >
            <option value="">Lớp</option>
            {danhSachLop.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          {/* Môn học */}
          <select
            value={filterMonHoc}
            onChange={(e) => setFilterMonHoc(e.target.value)}
            className="border border-[#ccc] px-2 py-1 text-[12px] flex-1 min-w-[200px]"
          >
            <option value="">Môn học</option>
            {danhSachMonHoc.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Dạy lớp buổi */}
          <select
            value={filterBuoi}
            onChange={(e) => setFilterBuoi(e.target.value)}
            className="border border-[#ccc] px-2 py-1 text-[12px] min-w-[110px]"
          >
            <option value="">Dạy lớp buổi</option>
            <option value="Sáng">Sáng</option>
            <option value="Chiều">Chiều</option>
            <option value="Tối">Tối</option>
          </select>

          {/* Học kỳ */}
          <select
            value={filterHocKy}
            onChange={(e) => setFilterHocKy(e.target.value)}
            className="border border-[#ccc] px-2 py-1 text-[12px] min-w-[90px]"
          >
            <option value="">Học kỳ</option>
            <option value="1">Học kỳ 1</option>
            <option value="2">Học kỳ 2</option>
          </select>

          {/* Năm học */}
          <select
            value={filterNamHoc}
            onChange={(e) => setFilterNamHoc(e.target.value)}
            className="border border-[#ccc] px-2 py-1 text-[12px] min-w-[110px]"
          >
            <option value="">Năm học</option>
            {danhSachNamHoc.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          {/* Trạng thái */}
          <select
            value={filterTrangThai}
            onChange={(e) => setFilterTrangThai(e.target.value)}
            className="border border-[#ccc] px-2 py-1 text-[12px] min-w-[110px]"
          >
            <option value="">Trạng thái</option>
            <option value="Đang dạy">Đang dạy</option>
            <option value="Đã kết thúc">Đã kết thúc</option>
          </select>

          {/* Tìm kiếm */}
          <button
            onClick={handleTimKiem}
            className="ml-auto bg-[#243A83] text-white px-5 py-1 text-[12px] cursor-pointer hover:bg-[#1a2d6b]"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Dòng tóm tắt */}
      <div className="mt-2 mb-3 flex flex-wrap items-center gap-2 text-[12px]">
        <span className="text-[#333]">
          Có <span className="font-bold">{danhSachHienThi.length}</span> kế
          hoạch giảng dạy.
        </span>

        <button
          onClick={() => setAnCu((v) => !v)}
          className="bg-[#243A83] text-white px-2 py-0.5 text-[11px] cursor-pointer hover:bg-[#1a2d6b]"
        >
          {anCu ? "Ẩn" : "Hiện"}
        </button>
        <span className="text-[#555]">Kế hoạch cũ</span>

        {apiData && (
          <span className="text-[#555] italic">
            (Tổng số tiết:{" "}
            <span className="text-[#0000cc] font-semibold">
              {apiData.tongSoTiet}
            </span>{" "}
            - Đã dạy:{" "}
            <span className="text-[#0000cc] font-semibold">
              {apiData.daDayTong}
            </span>{" "}
            - Chưa dạy:{" "}
            <span className="text-red-600 font-semibold">
              {apiData.chuaDayTong}
            </span>
            )
          </span>
        )}
      </div>

      {/* Bảng */}
      <table className="w-full border-collapse text-[12px] border border-gray-400">
        <thead>
          <tr className="bg-[#243A83] text-white">
            <th className="border border-gray-400 px-3 py-1.5 text-center w-[160px]">
              Tên giảng viên
            </th>
            <th className="border border-gray-400 px-3 py-1.5 text-center">
              Giảng dạy
            </th>
            <th className="border border-gray-400 px-3 py-1.5 text-center w-[190px]">
              Ngày
            </th>
          </tr>
        </thead>
        <tbody>
          {danhSachHienThi.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="border border-gray-300 text-center py-4 text-[#999] italic"
              >
                Không có kế hoạch nào.
              </td>
            </tr>
          ) : (
            danhSachHienThi.map((mon, idx) => {
              console.log(mon);
              return (
                <tr
                  key={mon.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"}
                >
                  {/* Tên giảng viên */}
                  <td className="border border-gray-300 px-3 py-1.5 text-center">
                    <button
                      onClick={() =>
                        navigate(`/KeHoachDay/${mon.id}`, { state: { mon } })
                      }
                      className="text-[#0000cc] hover:underline cursor-pointer font-medium"
                    >
                      {/* {mon.tenGiangVien || "Phạm Thế Trí"} */}
                      {user.name || mon.tenGiangVien || "Phạm Thế Trí"}
                    </button>
                  </td>

                  {/* Giảng dạy */}
                  <td className="border border-gray-300 px-3 py-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span>
                          Môn học:{" "}
                          <span className="font-semibold">{mon.monHoc}</span>{" "}
                          <span className="text-[#0066cc]">
                            ({mon.loaiGiangVien})
                          </span>
                        </span>
                        <br />
                        <span>
                          Lớp: <span className="font-semibold">{mon.lop}</span>{" "}
                          ({mon.buoi}) - Học kỳ:{" "}
                          <span className="font-semibold">{mon.hocKy}</span> -
                          Năm học:{" "}
                          <span className="font-semibold">{mon.namHoc}</span>
                        </span>
                        <br />
                        <span>
                          Số tiết:{" "}
                          <span className="font-semibold">{mon.soTiet}</span>{" "}
                          (LT: {mon.lyThuyet} - TH: {mon.thucHanh}) - Đã dạy:{" "}
                          <span className="text-red-600 font-bold">
                            {mon.daDay}
                          </span>
                        </span>
                      </div>
                      {mon.trangThai === "Đã kết thúc" && (
                        <span className="text-red-600 font-semibold whitespace-nowrap text-[11px] mt-0.5">
                          Đã kết thúc
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Ngày */}
                  <td className="border border-gray-300 px-3 py-1.5 text-[11px]">
                    <div>
                      Bắt đầu:{" "}
                      <span className="font-semibold">{mon.batDau}</span>
                    </div>
                    <div>
                      Kết thúc:{" "}
                      <span className="font-semibold">
                        {mon.ketThuc || "---"}
                      </span>
                    </div>
                    {mon.ketThucDuKien && (
                      <div className="italic text-[#555]">
                        (Kết thúc dự kiến:{" "}
                        <span className="font-semibold text-[#333]">
                          {mon.ketThucDuKien}
                        </span>
                        )
                      </div>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-1 text-right text-[12px] text-[#243A83] pr-1">
        {"<< 1 >>"}
      </div>
    </div>
  );
}
