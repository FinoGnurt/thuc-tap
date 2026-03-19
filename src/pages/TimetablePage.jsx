import Breadcrumb from "@/components/Breadcrumb";
import TimetablePageContent from "@/components/timetable/TimetablePage";

export default function TimetablePage() {
  return (
    <div className="bg-white p-2">
      <Breadcrumb currentTitle="Danh sách thời khóa biểu" />
      <TimetablePageContent />
    </div>
  );
}
