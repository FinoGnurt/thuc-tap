import { useMemo, useState } from "react";

import Pagination from "@/components/common/Pagination";
import SectionHeader from "@/components/common/SectionHeader";
import ExamFilterBar from "@/components/exam/ExamFilterBar";
import ExamResultSummary from "@/components/exam/ExamResultSummary";
import ExamTable from "@/components/exam/ExamTable";
import examData from "@/data/examSchedule.json";

export default function ExamPage() {
  const [tuNgay, setTuNgay] = useState("");
  const [denNgay, setDenNgay] = useState("");
  const [filterGV, setFilterGV] = useState("");
  const [filterLop, setFilterLop] = useState("");
  const [results, setResults] = useState(examData);
  const [currentPage, setCurrentPage] = useState(1);

  const EXAM_ITEMS_PER_PAGE = 60;

  const totalPages = Math.ceil(results.length / EXAM_ITEMS_PER_PAGE);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * EXAM_ITEMS_PER_PAGE;
    return results.slice(start, start + EXAM_ITEMS_PER_PAGE);
  }, [results, currentPage]);

  const handleSearch = () => {
    // TODO: thay bằng gọi API thực tế với tuNgay, denNgay, filterGV, filterLop
    let filtered = examData;
    if (filterGV) filtered = filtered.filter((d) => d.giangVien === filterGV);
    if (filterLop) filtered = filtered.filter((d) => d.maLop === filterLop);
    setResults(filtered);
    setCurrentPage(1);
  };

  return (
    <div>
      <SectionHeader title="LỊCH THI" />

      <ExamFilterBar
        tuNgay={tuNgay}
        denNgay={denNgay}
        filterGV={filterGV}
        filterLop={filterLop}
        onTuNgay={setTuNgay}
        onDenNgay={setDenNgay}
        onFilterGV={setFilterGV}
        onFilterLop={setFilterLop}
        onSearch={handleSearch}
      />

      <ExamTable data={pageData} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ExamResultSummary
        currentPage={currentPage}
        itemsPerPage={EXAM_ITEMS_PER_PAGE}
        totalItems={results.length}
      />
    </div>
  );
}
