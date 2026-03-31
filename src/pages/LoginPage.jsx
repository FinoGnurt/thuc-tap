import Breadcrumb from "@/components/Breadcrumb";
import { UserContext } from "@/contexts/UserContext";
import { user } from "@/data/user";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [information, setInformation] = useState("");
  const [modalLoginFast, setModalLoginFast] = useState(false);
  const [selectLoginFast, setSelectLoginFast] = useState("");

  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    const userLogin = user.find((u) => u.username === userName);

    if (!userLogin) {
      setInformation("Sai tài khoản hoặc mật khẩu!");
      return;
    }

    if (password !== userLogin.password) {
      setInformation("Sai tài khoản hoặc mật khẩu!");
      return;
    }

    const { password: _, ...safeUser } = userLogin;
    login(safeUser);
    navigate("/");
  };

  const handleKeyDown = (e) => e.key === "Enter" && handleLogin();

  const handleLoginFast = () => {
    if (!selectLoginFast) return;

    let usernameMap = {
      "Giảng viên": "giangvien",
      "Trưởng khoa": "truongkhoa",
    };

    const userLogin = user.find(
      (u) => u.username === usernameMap[selectLoginFast],
    );
    if (!userLogin) return;

    const { password: _, ...safeUser } = userLogin;
    login(safeUser);
    navigate("/");
  };

  const ROLE_OPTIONS = ["Giảng viên", "Trưởng khoa"];

  return (
    <div className="bg-white p-2 sm:p-3">
      <Breadcrumb currentTitle="Đăng nhập" />

      <div className="bg-linear-to-b from-[#D9D9D9] to-[#B2B2B2] mt-2 mb-4">
        <p className="px-3 py-1.5 font-bold text-[13px] text-[#333]">
          ĐĂNG NHẬP
        </p>
      </div>

      <div className="bg-[#FFFFF0] border border-[#E1E1E1] flex items-center justify-center py-8 sm:py-12 text-[12px]">
        <div className="w-full max-w-[220px] px-4 sm:px-0">
          <div className="mb-2">
            <p className="text-[#555555] mb-0.5">Tên đăng nhập:</p>
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setInformation("");
              }}
              onKeyDown={handleKeyDown}
              className="w-full border px-1.5 py-1 text-[12px]"
            />
          </div>

          <div className="mb-3">
            <p className="text-[#555555] mb-0.5">Mật khẩu:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setInformation("");
              }}
              onKeyDown={handleKeyDown}
              className="w-full border px-1.5 py-1 text-[12px]"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <button
              onClick={handleLogin}
              className="w-full sm:w-auto bg-[#243A83] text-white px-4 py-1.5 text-[12px] cursor-pointer"
            >
              Đăng nhập
            </button>

            <button
              onClick={() => {
                setSelectLoginFast("");
                setModalLoginFast(true);
              }}
              className="w-full sm:w-auto text-black text-[12px] cursor-pointer hover:text-red-400 font-semibold"
            >
              Đăng nhập nhanh
            </button>
          </div>

          {information && <p className="mt-2 text-red-500">{information}</p>}
        </div>
      </div>

      {/* Modal Đăng Nhập Nhanh */}
      {modalLoginFast && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setModalLoginFast(false)}
        >
          <div
            className="bg-white border border-[#ccc] shadow-lg w-[280px] text-[12px] rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-linear-to-b from-[#D9D9D9] to-[#B2B2B2] flex items-center justify-between px-3 py-1.5 rounded-t-md">
              <p className="font-bold text-[13px] text-[#333]">
                ĐĂNG NHẬP NHANH
              </p>
              <button
                onClick={() => setModalLoginFast(false)}
                className="text-[#555] hover:text-red-500 text-[16px] leading-none cursor-pointer transition-transform duration-300 hover:rotate-180"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              <p className="text-[#555555] mb-2">Chọn vai trò:</p>
              <div className="flex flex-col gap-2">
                {ROLE_OPTIONS.map((role) => (
                  <label
                    key={role}
                    className={`flex items-center gap-2 px-3 py-2 border cursor-pointer transition-colors ${
                      selectLoginFast === role
                        ? "border-[#243A83] bg-[#EEF1FB]"
                        : "border-[#E1E1E1] hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="loginFastRole"
                      value={role}
                      checked={selectLoginFast === role}
                      onChange={() => setSelectLoginFast(role)}
                      className="accent-[#243A83]"
                    />
                    <span className="text-[#333]">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-4 pb-4">
              <button
                onClick={() => setModalLoginFast(false)}
                className="px-4 py-1.5 border border-[#ccc] text-[#555] hover:bg-gray-100 cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setModalLoginFast(false);
                  handleLoginFast();
                }}
                disabled={!selectLoginFast}
                className={`px-4 py-1.5 text-white transition-colors ${
                  selectLoginFast
                    ? "bg-[#243A83] hover:bg-[#1a2d6b] cursor-pointer"
                    : "bg-[#aaa] cursor-not-allowed"
                }`}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
