import { useContext } from "react";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserContext } from "./contexts/UserContext";
import MainLayout from "./layouts/MainLayout";
import AccountPage from "./pages/AccountPage";
import ApproveLeavePage from "./pages/ApproveLeavePage";
import ExamPage from "./pages/ExamPage";
import HomePage from "./pages/HomePage";
import LeaveReportPage from "./pages/LeaveReportPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PlanPage from "./pages/PlanPage";
import TeachingPlanListPage from "./pages/TeachingPlanListPage";
import TeachingPlanPage from "./pages/TeachingPlanPage";
import TimetablePage from "./pages/TimetablePage";

function App() {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public */}
        <Route index element={<HomePage />} />
        <Route path="/DangNhap" element={<LoginPage />} />

        {/* Giảng viên */}
        <Route element={<ProtectedRoute roles={["Giảng viên"]} user={user} />}>
          <Route path="/KeHoachDay" element={<TeachingPlanListPage />} />
          <Route path="/KeHoachDay/:id" element={<TeachingPlanPage />} />
          <Route path="/BaoNghiDay" element={<LeaveReportPage />} />
        </Route>

        {/* Trưởng khoa */}
        <Route element={<ProtectedRoute roles={["Trưởng khoa"]} user={user} />}>
          <Route path="/DuyetBaoNghi" element={<ApproveLeavePage />} />
        </Route>

        {/* Trưởng khoa + Phòng đào tạo */}
        <Route
          element={
            <ProtectedRoute roles={["Giảng viên", "Trưởng khoa"]} user={user} />
          }
        >
          <Route path="/XemKeHoach" element={<PlanPage />} />
          <Route path="/ThongTinTaiKhoan" element={<AccountPage />} />
        </Route>

        {/* Public */}
        <Route path="/ThoiKhoaBieu" element={<TimetablePage />} />
        <Route path="/LichThi" element={<ExamPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
