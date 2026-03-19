import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-[#6890C7] via-[#6890C7] via-20% to-[#A9C3E4] py-1.5 text-[12px] text-black flex justify-center sm:justify-end items-center rounded-b-lg">
      <p className="mr-0 sm:mr-4 text-center px-2">
        © Copyright{" "}
        <Link to="/" className="hover:underline font-bold">
          Khoa CNTT - Trường Cao đẳng nghề TP.HCM
        </Link>
      </p>
    </footer>
  );
}
