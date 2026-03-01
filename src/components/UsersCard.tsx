import type { FC } from "react";
import type { UserType } from "../@types";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface UsersCardProps {
  u: UserType;
}

const UsersCard: FC<UsersCardProps> = ({ u }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/users/${u.id}`)}
      className="cursor-pointer group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)] transition duration-300 hover:bg-white/[0.07] hover:-translate-y-0.5"
    >
      {/* Glow effect */}
      <div className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100 bg-[radial-gradient(280px_circle_at_20%_25%,rgba(34,211,238,0.16),transparent_60%),radial-gradient(300px_circle_at_80%_80%,rgba(217,70,239,0.12),transparent_60%)]" />

      {/* Header */}
      <div className="relative p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={u.image}
              alt={u.fullname}
              className="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/10 bg-white/5"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/120x120?text=User";
              }}
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 via-pink-500 to-indigo-500 ring-2 ring-[#060B18]" />
          </div>

          {/* Name & Email */}
          <div className="min-w-0">
            <p className="text-white font-semibold truncate">{u.fullname}</p>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-white/55 truncate">
              <FiMail className="shrink-0" />
              <span className="truncate">{u.email}</span>
            </div>
          </div>
        </div>

        {/* Role & ID */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-3">
            <p className="text-[11px] text-white/45">Role</p>
            <span
              className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${
                u.role === "Admin"
                  ? "bg-white/10 text-white ring-white/15"
                  : "bg-white/5 text-white/80 ring-white/10"
              }`}
            >
              <HiOutlineShieldCheck className="text-[13px]" />
              {u.role}
            </span>
          </div>

          <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-3">
            <p className="text-[11px] text-white/45">User ID</p>
            <p className="mt-2 text-sm font-medium text-white/90">#{u.id}</p>
          </div>
        </div>

        <div className="mt-4 h-px bg-white/10" />
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between text-[11px] text-white/45">
          <span>Status</span>
          <span className="inline-flex items-center gap-2 text-white/85 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
            Active
          </span>
        </div>

        <div className="mt-3 h-0.5 w-16 rounded-full bg-linear-to-r from-cyan-400 via-pink-500 to-indigo-500 opacity-75" />
      </div>
    </div>
  );
};

export default UsersCard;