import loginGif from "@/assets/images/login.gif";
import { UserContext } from "@/contexts/UserContext";
import { useLoading } from "@/hooks/useLoading";
import { resetBaoNghi } from "@/services/baoNghiService";
import { resetMonHoc } from "@/services/monHocService";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";

const baseNavItems = [
  { label: "TRANG CHỦ", to: "/" },
  { label: "THỜI KHOÁ BIỂU", to: "/ThoiKhoaBieu" },
  { label: "LỊCH THI", to: "/LichThi" },
];

export default function Navbar() {
  const { user } = useContext(UserContext);
  const userName = user?.name;
  const role = user?.role;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  // Menu theo role
  const navItems = [...baseNavItems];
  if (role === "Giáo viên") {
    navItems.splice(1, 0, { label: "KẾ HOẠCH DẠY", to: "/KeHoachDay" });
    navItems.splice(2, 0, { label: "BÁO NGHỈ DẠY", to: "/BaoNghiDay" });
  } else if (role === "Trưởng khoa") {
    navItems.splice(1, 0, { label: "XEM KẾ HOẠCH", to: "/XemKeHoach" });
    navItems.splice(2, 0, { label: "DUYỆT BÁO NGHỈ", to: "/DuyetBaoNghi" });
  } else {
    // Chưa đăng nhập
    navItems.splice(1, 0, { label: "XEM KẾ HOẠCH", to: "/XemKeHoach" });
  }

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    // localStorage.removeItem("mailExample");
    navigate(0);
  };

  const handleResetDB = async () => {
    showLoading();
    await resetBaoNghi();
    await resetMonHoc();
    hideLoading();
    navigate(0);
  };

  return (
    <div className="flex flex-col">
      {/* Thanh đăng nhập */}
      <div className="flex justify-between items-center px-3 py-1 text-[12px] h-[31px] bg-linear-to-b from-[#A9C4E5] to-[#698FC8] via-[#698FC8] via-90% relative rounded-t-[10px] mt-0.25">
        <div className="flex gap-3">
          {/* Hamburger button - chỉ hiện trên mobile */}
          <button
            className="sm:hidden flex flex-col gap-1 p-1 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-[#0B1D6B] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#0B1D6B] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#0B1D6B] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </button>

          <button
            className="hover:underline cursor-pointer active:underline"
            onClick={handleResetDB}
          >
            Reset DB
          </button>
        </div>

        {/* Khu vực đăng nhập / đăng xuất */}
        <div className="flex justify-end flex-1">
          {userName ? (
            <div className="flex gap-3 justify-center items-center">
              <p className="hidden xs:block">
                Xin chào, <span className="font-semibold">{userName}</span>
              </p>
              <p className="xs:hidden font-semibold">{userName}</p>
              <button
                className="border border-black rounded-md px-1.5 py-0.5 bg-red-500 text-white cursor-pointer font-semibold"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div>
              <Link
                to="/DangNhap"
                className="flex items-center gap-2 font-bold hover:text-white"
              >
                <img src={loginGif} alt="" className="w-2.5" />
                <span>Đăng nhập</span>
              </Link>
              <hr className="absolute left-0 right-0 bottom-0.25 text-[#0B1D6B]" />
            </div>
          )}
        </div>
      </div>

      {/* Thanh menu - Desktop: ngang, Mobile: ẩn/hiện dọc */}
      <nav className="w-full bg-linear-to-b from-[#0A1D68] to-[#040E51]">
        {/* Desktop menu */}
        <ul className="hidden sm:flex m-0 p-0 list-none h-[45px]">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                end={item.to === "/"}
                className="px-2.75 py-2.5 text-[13px] font-semibold tracking-wide no-underline text-white hover:bg-[#1E5CD1] border-r border-[#4D4D4D] h-full flex items-center justify-center"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu - dropdown */}
        <ul
          className={`sm:hidden flex flex-col m-0 p-0 list-none overflow-hidden transition-all duration-200 ${
            menuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          {navItems.map((item) => (
            <li key={item.to} className="border-b border-[#1a3080]">
              <Link
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 text-[13px] font-semibold tracking-wide no-underline text-white hover:bg-[#1E5CD1]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
