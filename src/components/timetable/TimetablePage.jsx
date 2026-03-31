import { useState } from "react";

import Pagination from "@/components/common/Pagination";
import SectionHeader from "@/components/common/SectionHeader";
import TimetableFilterBar from "@/components/timetable/TimetableFilterBar";
import TimetableNote from "@/components/timetable/TimetableNote";
import TimetableTable from "@/components/timetable/TimetableTable";
import allSchedules from "@/data/timetable.json";

export default function TimetablePage() {
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const TIMETABLE_ITEMS_PER_PAGE = 20;

  const totalPages = Math.ceil(allSchedules.length / TIMETABLE_ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * TIMETABLE_ITEMS_PER_PAGE;
  const pageData = allSchedules.slice(
    startIndex,
    startIndex + TIMETABLE_ITEMS_PER_PAGE,
  );

  const handleView = () => {
    // TODO: gọi API lấy thời khóa biểu theo tuần + lớp
    console.log("Xem:", { selectedWeek, selectedClass });
  };

  const handleViewItem = (item) => {
    // TODO: navigate đến chi tiết thời khóa biểu
    console.log("Chi tiết:", item);
  };

  return (
    <div>
      <SectionHeader title="DANH SÁCH THỜI KHÓA BIỂU" />

      <TimetableFilterBar
        selectedWeek={selectedWeek}
        selectedClass={selectedClass}
        onWeekChange={setSelectedWeek}
        onClassChange={setSelectedClass}
        onView={handleView}
      />

      <TimetableTable
        data={pageData}
        startIndex={startIndex}
        onView={handleViewItem}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <TimetableNote />
    </div>
  );
}
