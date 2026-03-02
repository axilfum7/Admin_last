import { useNavigate } from "react-router-dom";
import type { CategoryType } from "../@types";

interface Props {
  item: CategoryType;
}

const CategoryCard = ({ item }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/categories/${item.id}`)}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-[0_18px_55px_rgba(0,0,0,0.35)] transition duration-300chover:-translate-y-1 hover:bg-white/[0.07] hover:border-white/20 cursor-pointer" >
      {/* glow */}
      <div
        className="pointer-events-none absolute -inset-16 opacity-0 blur-3xl transition duration-300 group-hover:opacity-100 bg-[radial-gradient(420px_circle_at_30%_20%,rgba(255,106,0,0.18),transparent_60%),radial-gradient(420px_circle_at_80%_60%,rgba(255,46,81,0.14),transparent_55%)]"/>
      {/* image */}
      <div className="relative overflow-hidden rounded-xl border border-white/10">
        <img
          src={item?.image}
          alt="image"
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(7,20,39,0.75),transparent_55%)]" />
      </div>

      {/* content */}
      <div className="relative mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white/90">
            {item?.name}
          </h3>
          <p className="mt-1 text-xs text-white/55">Category</p>
        </div>
      </div>

      {/* bottom shine */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,106,0,0.6),rgba(255,46,81,0.55),transparent)] opacity-0 transition group-hover:opacity-100" />
    </div>
  );
};

export default CategoryCard;
