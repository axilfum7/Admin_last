import { useEffect, useState } from "react";
import { FiTrash2, FiUser, FiShield, FiHash, FiMail, FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteFn, GetById } from "../../../services";
import type { UserType } from "../../../@types";
import { Button, Loading, MiniButton, Modal } from "../../../components";

const UserMore = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => { if(id) GetById(`users/${id}`, setUser); }, [id]);

  const handleDelete = () => {
    setLoading(true);
    DeleteFn(`users/${id}`, setLoading, setDelModal, "User deleted", navigate);
  };

  return (
    <div className="mx-auto w-full min-h-[calc(100vh-84px)] px-2 py-2">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220]/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
        {/* glow background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_10%_10%,rgba(217,70,239,0.12),transparent_55%),radial-gradient(700px_circle_at_90%_85%,rgba(34,211,238,0.10),transparent_55%)]" />

        <div className="relative p-4">
          {/* Header */}
          <div className="mb-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-white/40">User Details</p>
              <h1 className="mt-1 text-2xl md:text-4xl font-semibold text-white">{user?.fullname || "Loading..."}</h1>
              <p className="mt-1 text-sm text-white/45">Foydalanuvchi haqida ma’lumot</p>
            </div>
            <div className="flex gap-3 items-center">
              <MiniButton type="button" onClick={() => setDelModal(true)} extraClass="flex items-center w-12 h-12 rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/70 hover:bg-white/10 hover:text-white transition">
                <FiTrash2 />
              </MiniButton>
              <Button type="button" onClick={() => navigate(`/users/${id}/update`)} extraClass="inline-flex items-center gap-2 h-12 px-6 rounded-2xl text-white font-semibold bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 hover:opacity-90 transition shadow-[0_10px_30px_rgba(99,102,241,.2)]">Tahrirlash</Button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.55fr_1fr]">
            {/* LEFT: Avatar Preview */}
            <div className="relative h-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              {user?.image && <img src={user.image} alt={user.fullname || "avatar"} className="absolute inset-0 w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,18,32,0.25),rgba(11,18,32,0.65))]" />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/10 backdrop-blur">
                  <FiHash className="text-[12px]" /> ID: {user?.id ?? "-"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/10 backdrop-blur">
                  <FiShield className="text-[12px]" /> {user?.role || "-"}
                </span>
              </div>
            </div>

            {/* RIGHT: Info */}
            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="mb-4 text-[11px] tracking-[0.22em] uppercase text-white/45">Asosiy ma’lumot</p>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                    <p className="text-xs text-white/45">ID</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{user?.id ?? "-"}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                    <div className="flex items-center gap-2 text-white/55 text-xs"><FiUser /> Nomi</div>
                    <p className="mt-2 text-xl font-semibold text-white">{user?.fullname || "-"}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                    <div className="flex items-center gap-2 text-white/55 text-xs"><FiMail /> Email</div>
                    <p className="mt-2 text-lg font-semibold text-white break-all">{user?.email || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal open={delModal} onClose={() => setDelModal(false)} title="Userni ochirmoqchimisiz!">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-4">
          <Button type="button" onClick={() => setDelModal(false)} extraClass="w-[150px]">Bekor qilish</Button>
          <Button type="button" onClick={handleDelete} extraClass="w-[150px]">
            {loading ? <Loading /> : "O'chirish"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserMore;