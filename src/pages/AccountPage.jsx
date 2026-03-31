import Breadcrumb from "@/components/Breadcrumb";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useState } from "react";

const AccountPage = () => {
  const { user: currentUser } = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [information, setInformation] = useState("");

  console.log("first", currentUser);

  const handleUpdate = () => {
    if (!oldPassword || !newPassword) {
      setInformation("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (oldPassword !== currentUser.password) {
      setInformation("Mật khẩu cũ không đúng!");
      return;
    }
    // TODO: cập nhật mật khẩu
    setInformation("Cập nhật thành công!");
    setOldPassword("");
    setNewPassword("");
  };

  const roleLabel = {
    giangvien: "Giảng viên",
    truongkhoa: "Trưởng khoa",
  };

  return (
    <div className="bg-white p-2 sm:p-3">
      <Breadcrumb currentTitle="Tài khoản" />

      <div className="bg-linear-to-b from-[#D9D9D9] to-[#B2B2B2] mt-2 mb-4">
        <p className="px-3 py-1.5 font-bold text-[13px] text-[#333]">
          THÔNG TIN TÀI KHOẢN
        </p>
      </div>

      <div className="bg-[#FFFFF0] border border-[#E1E1E1] flex items-center justify-center py-8 sm:py-12 text-[12px]">
        <div className="flex flex-col items-center gap-1 w-full max-w-[260px]">
          {/* Avatar */}
          <div className="w-[70px] h-[75px] border border-[#ccc] bg-white mb-2 overflow-hidden flex items-center justify-center">
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[#ccc] text-[10px]">No image</span>
            )}
          </div>

          {/* User info */}
          <p className="text-[#333]">Họ tên: {currentUser?.name}</p>
          <p className="text-[#333]">
            Phân quyền:{" "}
            <span className="font-bold">
              {roleLabel[currentUser?.role] || currentUser?.role}
            </span>
          </p>

          {/* Password fields */}
          <div className="w-full mt-2">
            <div className="flex items-center mb-1.5">
              <label className="text-[#555555] w-[90px] shrink-0">
                Mật khẩu cũ:
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  setInformation("");
                }}
                className="border border-[#999] px-1.5 py-0.5 text-[12px] flex-1"
              />
            </div>

            <div className="flex items-center mb-3">
              <label className="text-[#555555] w-[90px] shrink-0">
                Mật khẩu mới:
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setInformation("");
                }}
                className="border border-[#999] px-1.5 py-0.5 text-[12px] flex-1"
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className="px-5 py-1.5 text-[12px] cursor-pointer hover:bg-[#3a5ccc] w-full sm:w-auto bg-[#243A83] text-white"
          >
            Cập nhật
          </button>

          {information && (
            <p
              className={`mt-2 ${
                information.includes("thành công")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {information}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
