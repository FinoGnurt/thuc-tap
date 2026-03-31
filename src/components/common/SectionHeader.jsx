/**
 * SectionHeader - Thanh tiêu đề xanh dùng chung cho các trang
 *
 * Props:
 *  - title : string — nội dung tiêu đề
 */
export default function SectionHeader({ title }) {
  return (
    <div className="bg-[#c8d8e8] border border-[#aabfcf] px-4 py-2 font-bold text-sm text-[#1a3a5c] tracking-wide">
      {title}
    </div>
  );
}
