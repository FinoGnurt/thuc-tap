import newGif from "@/assets/images/new.gif";

/**
 * ExamTable - Bảng danh sách lịch thi
 *
 * Props:
 *  - data: ExamItem[]  — dữ liệu trang hiện tại
 */
export default function ExamTable({ data }) {
  const thClass =
    "py-2 px-2 text-white font-bold border border-[#5a8aae] text-center whitespace-nowrap";

  if (data.length === 0) {
    return (
      <table className="w-full border-collapse text-sm border border-gray-300">
        <tbody>
          <tr>
            <td colSpan={7} className="text-center py-8 text-gray-500">
              Không có dữ liệu
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full min-w-[600px] border-collapse text-sm border border-gray-300">
        <thead>
          <tr className="bg-[#6a9bbf]">
            <th className={thClass}>
              Thời gian
              <br />
              kiểm tra
            </th>
            <th className={thClass}>Phòng</th>
            <th className={`${thClass} whitespace-normal`}>Môn học/mô đun</th>
            <th className={thClass}>Mã lớp</th>
            <th className={thClass}>
              Giảng viên
              <br />
              giảng dạy
            </th>
            <th className={thClass}>
              Hình thức
              <br />
              kiểm tra
            </th>
            <th className={thClass}>
              Thời gian
              <br />
              làm bài
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="py-2 px-2 border border-gray-300 text-center text-red-700 whitespace-nowrap">
                <div>{item.thoiGian}</div>
                {item.isNew && (
                  <div className="flex justify-center mt-0.5">
                    <img src={newGif} alt="Mới" className="h-3.5" />
                  </div>
                )}
              </td>
              <td className="py-2 px-2 border border-gray-300 text-center whitespace-nowrap">
                <span className="text-[#337ab7]">{item.phong}</span>{" "}
              </td>
              <td className="py-2 px-3 border border-gray-300 text-center text-gray-800">
                {item.monHoc}
              </td>
              <td className="py-2 px-2 border border-gray-300 text-center">
                <span className="text-[#337ab7]">{item.maLop}</span>
              </td>
              <td className="py-2 px-2 border border-gray-300 text-center text-gray-800 whitespace-nowrap">
                {item.giangVien}
              </td>
              <td className="py-2 px-2 border border-gray-300 text-center text-gray-800 whitespace-nowrap">
                {item.hinhThuc}
              </td>
              <td className="py-2 px-2 border border-gray-300 text-center text-red-600 font-semibold whitespace-nowrap">
                {item.thoiGianLamBai}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
