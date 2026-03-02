import { useEffect, useState } from "react";
import { FiTrash2, FiUser, FiMail,} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteFn, GetById } from "../../../services";
import type { UserType } from "../../../@types";
import { Button, Loading, MiniButton, Modal } from "../../../components";
import { Pencil } from "lucide-react";

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
              <h1 className="mt-1 text-2xl md:text-4xl font-semibold text-white">{user?.name || "Loading..."}</h1>
              <p className="mt-1 text-sm text-white/45">Foydalanuvchi haqida ma’lumot</p>
            </div>
            <div className="flex gap-3 items-center">
              <MiniButton type="button" onClick={() => setDelModal(true)} extraClass="flex items-center w-10 h-10 rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/70 hover:bg-white/10 hover:text-white transition">
                <FiTrash2 />
              </MiniButton>
              <Button
                onClick={() => navigate("update")}
                type="button"
                extraClass="!mt-0 !h-[44px] rounded-2xl !px-4 !text-sm !font-semibold border border-white/10 bg-[linear-gradient(135deg,rgba(255,106,0,0.85),rgba(255,46,81,0.75))] shadow-[0_18px_50px_rgba(255,46,81,0.12)] transition hover:brightness-110 active:scale-[0.98]" >
                <span className="inline-flex items-center gap-2">
                  <Pencil size={16} />
                  Tahrirlash
                </span>
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.55fr_1fr]">
            {/* LEFT: Avatar Preview */}
            <div className="relative  overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              {user?.avatar && <img src={user.avatar} alt={user.name || "avatar"} className="absolute inset-0 w-full h-full object-cover" />}
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
                    <p className="mt-2 text-xl font-semibold text-white">{user?.name || "-"}</p>
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