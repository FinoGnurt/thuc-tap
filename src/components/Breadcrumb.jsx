import { Link } from "react-router";

/**
 * Breadcrumb
 * Props:
 *  - items: { label, to? }[]   — optional, defaults to just "Trang chủ > currentTitle"
 *  - currentTitle: string
 */
export default function Breadcrumb({ items, currentTitle }) {
  const crumbs = items ?? [{ label: "Trang chủ", to: "/" }];

  return (
    <nav className="text-[12px] text-[#333] mb-1">
      {crumbs.map((c, i) => (
        <span key={i}>
          {c.to ? (
            <Link to={c.to} className="text-[#1a3a7c] hover:underline">
              {c.label}
            </Link>
          ) : (
            <span>{c.label}</span>
          )}
          <span className="mx-1 text-gray-500">&gt;</span>
        </span>
      ))}
      <span className="text-[#333]">{currentTitle}</span>
    </nav>
  );
}
