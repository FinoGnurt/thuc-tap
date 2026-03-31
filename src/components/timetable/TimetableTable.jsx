import newGif from "@/assets/images/new.gif";
import { Link } from "react-router";

/**
 * TimetableTable - Bảng danh sách thời khóa biểu
 *
 * Props:
 *  - data      : { id, date, isNew? }[]  — dữ liệu trang hiện tại
 *  - startIndex: number                  — STT bắt đầu (để tính đúng số thứ tự)
 *  - onView    : (item) => void          — callback khi nhấn "Xem"
 */
export default function TimetableTable({ data, startIndex, onView }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full min-w-[380px] border-collapse text-sm border border-gray-300">
        <thead>
          <tr className="bg-[#6a9bbf]">
            <th className="w-[15%] py-2 text-white font-bold border border-[#5a8aae] text-center">
              STT
            </th>
            <th className="w-[55%] py-2 text-white font-bold border border-[#5a8aae] text-center">
              Ngày áp dụng
            </th>
            <th className="w-[30%] py-2 text-white font-bold border border-[#5a8aae] text-center">
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="text-center py-2 px-3 border border-gray-300 text-gray-700">
                {startIndex + index + 1}
              </td>
              <td className="text-center py-2 px-3 border border-gray-300">
                <div className="text-red-700">{item.date}</div>
                {item.isNew && (
                  <div className="flex justify-center items-center">
                    <img src={newGif} alt="Mới" className="h-4" />
                  </div>
                )}
              </td>
              <td className="text-center py-2 px-3 border border-gray-300">
                <Link
                  to={item.link}
                  onClick={(e) => {
                    // e.preventDefault();
                    onView?.(item);
                  }}
                  className="text-[#337ab7] hover:underline"
                >
                  Xem
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
