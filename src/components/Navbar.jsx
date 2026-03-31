import loginGif from "@/assets/images/login.gif";
import logOut from "@/assets/images/logout.png";
import userAccount from "@/assets/images/user.png";
import { UserContext } from "@/contexts/UserContext";
import { useLoading } from "@/hooks/useLoading";
import { resetBaoNghi } from "@/services/baoNghiService";
import { resetMonHoc } from "@/services/monHocService";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

const baseNavItems = [
  { label: "TRANG CHỦ", to: "/" },
  { label: "THỜI KHOÁ BIỂU", to: "/ThoiKhoaBieu" },
  { label: "LỊCH THI", to: "/LichThi" },
];

// ─── Icon Settings (SVG inline) ───────────────────────────────────────────────
function IconSettings({ spinning }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-4 h-4 transition-transform duration-500 ease-in-out ${
        spinning ? "rotate-90" : "rotate-0"
      }`}
    >
      <path
        fillRule="evenodd"
        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── Settings Dropdown ────────────────────────────────────────────────────────
function SettingsDropdown({ onResetDB, onClearStorage }) {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const wrapRef = useRef(null);

  // Click ngoài → đóng
  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setSpinning(false);
      }
    };
    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [open]);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    setSpinning(next);
  };

  return (
    <div ref={wrapRef} className="relative">
      {/* Icon button */}
      <button
        onClick={handleToggle}
        title="Cài đặt"
        className="flex items-center justify-center w-6 h-6 rounded text-[#0B1D6B] hover:text-[#1E5CD1] cursor-pointer transition-colors"
      >
        <IconSettings spinning={spinning} />
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute top-full left-0 mt-1.5 z-[9999]
          bg-white border border-[#ccc] rounded shadow-lg
          min-w-[170px] overflow-hidden
          transition-all duration-200 ease-out origin-top-left
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        {/* Tiêu đề */}
        <div className="px-3 py-1.5 text-[10px] font-bold text-[#888] uppercase tracking-wider border-b border-[#eee] bg-[#f7f7f7]">
          Cài đặt hệ thống
        </div>

        {/* Reset DB */}
        <button
          onClick={() => {
            setOpen(false);
            setSpinning(false);
            onResetDB();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#333] hover:bg-[#fff3f3] hover:text-red-600 cursor-pointer transition-colors text-left"
        >
          {/* Icon reload */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset DB
        </button>

        {/* Clear Local Storage */}
        <button
          onClick={() => {
            setOpen(false);
            setSpinning(false);
            onClearStorage();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#333] hover:bg-[#fff3f3] hover:text-red-600 cursor-pointer transition-colors text-left border-t border-[#f0f0f0]"
        >
          {/* Icon trash */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Clear Local Storage
        </button>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const { user } = useContext(UserContext);
  const userName = user?.name;
  const role = user?.role;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  // Menu theo role
  const navItems = [...baseNavItems];
  if (role === "Giảng viên") {
    navItems.splice(1, 0, { label: "KẾ HOẠCH DẠY", to: "/KeHoachDay" });
    navItems.splice(2, 0, { label: "BÁO NGHỈ DẠY", to: "/BaoNghiDay" });
  } else if (role === "Trưởng khoa") {
    navItems.splice(1, 0, { label: "XEM KẾ HOẠCH", to: "/XemKeHoach" });
    navItems.splice(2, 0, { label: "DUYỆT BÁO NGHỈ", to: "/DuyetBaoNghi" });
  } else {
    navItems.splice(1, 0, { label: "XEM KẾ HOẠCH", to: "/XemKeHoach" });
  }

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    navigate(0);
  };

  const handleResetDB = async () => {
    showLoading();
    await resetBaoNghi();
    await resetMonHoc();
    hideLoading();
    navigate(0);
  };

  const handleClearStorage = () => {
    localStorage.clear();
    navigate(0);
  };

  return (
    <div className="flex flex-col">
      {/* Thanh đăng nhập */}
      <div className="flex justify-between items-center px-3 py-1 text-[12px] h-[31px] bg-linear-to-b from-[#A9C4E5] to-[#698FC8] via-[#698FC8] via-90% relative rounded-t-[10px] mt-0.25">
        <div className="flex gap-3 items-center">
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

          {/* Icon setting thay thế 2 button cũ */}
          <SettingsDropdown
            onResetDB={handleResetDB}
            onClearStorage={handleClearStorage}
          />
        </div>

        {/* Khu vực đăng nhập / đăng xuất */}
        <div className="flex justify-end flex-1">
          {userName ? (
            <div className="flex sm:gap-3 gap-2 justify-center items-center">
              <p className="hidden xs:block">
                Xin chào, <span className="font-semibold">{userName}</span>
              </p>
              <p className="xs:hidden">
                Xin chào, <span className="font-semibold">{userName}</span>
              </p>
              <button
                className="sm:border border-black rounded-md sm:px-1.5 px-1 sm:py-0.5 py-1 sm:bg-red-500 text-white cursor-pointer font-semibold flex gap-1.5 items-center"
                onClick={handleLogout}
              >
                <img src={logOut} alt="" className="sm:w-3 w-4 sm:invert" />
                <span className="sm:block hidden">Đăng xuất</span>
              </button>

              <Link to="/ThongTinTaiKhoan">
                <button className="sm:border border-black rounded-md sm:px-1.5 px-1 sm:py-0.5 py-1 sm:bg-blue-500 text-white cursor-pointer font-semibold flex gap-1.5 items-center">
                  <img
                    src={userAccount}
                    alt=""
                    className="sm:w-3 w-4.5 sm:invert"
                  />
                  <span className="sm:block hidden">Thông tin tài khoản</span>
                </button>
              </Link>
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
