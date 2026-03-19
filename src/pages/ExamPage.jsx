import ExamPageContent from "@/components/exam/ExamPage";
import Breadcrumb from "@/components/Breadcrumb";

export default function ExamPage() {
  return (
    <div className="bg-white p-2">
      <Breadcrumb currentTitle="Lịch thi" />
      <ExamPageContent />
    </div>
  );
}
