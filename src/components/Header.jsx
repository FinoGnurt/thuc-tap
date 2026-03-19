import headerImg from "@/assets/images/header.jpg";

export default function Header() {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full overflow-hidden">
        <img
          src={headerImg}
          alt="Trường Cao Đẳng Nghề TP.HCM - Khoa CNTT"
          className="w-full object-cover object-top"
          style={{ maxHeight: "150px" }}
        />
      </div>
    </div>
  );
}
