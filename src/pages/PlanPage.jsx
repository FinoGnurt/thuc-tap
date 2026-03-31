import Breadcrumb from "@/components/Breadcrumb";
import SectionHeader from "@/components/common/SectionHeader";

const keHoachData = [
  {
    id: 1,
    tenKH: "Kế hoạch giảng dạy HK2 2025-2026",
    namHoc: "2025-2026",
    hocKy: "HK2",
    thoiGian: "01/01/2026 - 30/06/2026",
    ghiChu: "",
  },
  {
    id: 2,
    tenKH: "Kế hoạch giảng dạy HK1 2025-2026",
    namHoc: "2025-2026",
    hocKy: "HK1",
    thoiGian: "01/07/2025 - 31/12/2025",
    ghiChu: "",
  },
  {
    id: 3,
    tenKH: "Kế hoạch giảng dạy HK2 2024-2025",
    namHoc: "2024-2025",
    hocKy: "HK2",
    thoiGian: "01/01/2025 - 30/06/2025",
    ghiChu: "",
  },
  {
    id: 4,
    tenKH: "Kế hoạch giảng dạy HK1 2024-2025",
    namHoc: "2024-2025",
    hocKy: "HK1",
    thoiGian: "01/07/2024 - 31/12/2024",
    ghiChu: "",
  },
];

export default function PlanPage() {
  return (
    <div className="bg-white p-2 sm:p-3">
      <Breadcrumb currentTitle="Xem kế hoạch" />

      <SectionHeader title="XEM KẾ HOẠCH GIẢNG DẠY" />

      <div className="border border-[#ccc] border-t-0 p-3 text-sm mb-3 flex flex-wrap gap-2 sm:gap-3 items-center">
        <label className="text-gray-700">Năm học:</label>
        <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[130px]">
          <option>2025-2026</option>
          <option>2024-2025</option>
          <option>2023-2024</option>
        </select>
        <label className="text-gray-700">Học kỳ:</label>
        <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[80px]">
          <option>HK1</option>
          <option>HK2</option>
        </select>
        <button className="bg-[#337ab7] hover:bg-[#286090] text-white text-sm px-4 py-1 rounded transition-colors">
          Xem
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[500px] border-collapse text-sm border border-gray-300">
          <thead>
            <tr className="bg-[#6a9bbf]">
              <th className="py-2 px-3 text-white font-bold border border-[#5a8aae] text-center w-[5%]">
                STT
              </th>
              <th className="py-2 px-3 text-white font-bold border border-[#5a8aae] text-center">
                Tên kế hoạch
              </th>
              <th className="py-2 px-3 text-white font-bold border border-[#5a8aae] text-center w-[12%]">
                Năm học
              </th>
              <th className="py-2 px-3 text-white font-bold border border-[#5a8aae] text-center w-[10%]">
                Học kỳ
              </th>
              <th className="py-2 px-3 text-white font-bold border border-[#5a8aae] text-center w-[20%]">
                Thời gian
              </th>
              <th className="py-2 px-3 text-white font-bold border border-[#5a8aae] text-center w-[10%]">
                Ghi chú
              </th>
              <th className="py-2 px-3 text-white font-bold border border-[#5a8aae] text-center w-[10%]">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            {keHoachData.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2 px-3 border border-gray-300 text-center text-gray-700">
                  {index + 1}
                </td>
                <td className="py-2 px-3 border border-gray-300 text-gray-800">
                  {item.tenKH}
                </td>
                <td className="py-2 px-3 border border-gray-300 text-center text-gray-800">
                  {item.namHoc}
                </td>
                <td className="py-2 px-3 border border-gray-300 text-center text-gray-800">
                  {item.hocKy}
                </td>
                <td className="py-2 px-3 border border-gray-300 text-center text-gray-800 whitespace-nowrap">
                  {item.thoiGian}
                </td>
                <td className="py-2 px-3 border border-gray-300 text-center text-gray-800">
                  {item.ghiChu}
                </td>
                <td className="py-2 px-3 border border-gray-300 text-center">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-[#337ab7] hover:underline"
                  >
                    Xem
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
