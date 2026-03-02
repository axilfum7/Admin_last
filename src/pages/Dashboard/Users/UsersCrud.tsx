import { useEffect, useState } from "react";
import { FiUser, FiMail, FiLock, FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Loading } from "../../../components";
import { instance } from "../../../Hooks";
import { CrudFn } from "../../../services";

const UserCrud = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (!id) return;

    instance()
      .get(`/users/${id}`)
      .then((res) => {
        setName(res.data?.name ?? "");
        setEmail(res.data?.email ?? "");
        setAvatar(res.data?.avatar ?? "");
        setPassword(""); 
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSave = () => {
    const data: Record<string, any> = { name, email,password, avatar };
    CrudFn(
      id,
      id ? `/users/${id}` : "/users",
      data,
      setLoading,
      navigate,
      id ? "User tahrirlandi" : "User yaratildi"
    );
  };

  return (
    <div className="min-h-[calc(100vh-84px)] px-2 py-2">
      <div className="mx-auto w-full rounded-3xl border border-white/10 bg-[#0B1220]/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-xs uppercase text-white/40">Users</p>
            <h1 className="text-3xl font-semibold text-white">
              {id ? "Foydalanuvchini tahrirlash" : "Foydalanuvchi qo‘shish"}
            </h1>
          </div>

          <Button onClick={handleSave} extraClass="!w-[120px] !h-[48px]" type="button">
            {loading ? <Loading /> : "Saqlash"}
          </Button>
        </div>

        {/* Content */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="text-sm text-white/70">Foydalanuvchi nomi</label>
            <div className="relative mt-2">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="h-12 w-full pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none" placeholder="John"/>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-white/70">Email</label>
            <div className="relative mt-2">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 w-full pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none" placeholder="john@gmail.com"/>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-white/70">
              Parol {id ? "(ixtiyoriy)" : "(majburiy)"}
            </label>
            <div className="relative mt-2">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 w-full pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none" placeholder={id ? "Yangi parol (agar o'zgartirmoqchi bo'lsangiz)" : "1234"}/>
            </div>
          </div>

          {/* Avatar */}
          <div>
            <label className="text-sm text-white/70">Avatar URL</label>
            <div className="relative mt-2">
              <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="url" value={avatar} onChange={(e) => setAvatar(e.target.value)} className="h-12 w-full pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none" placeholder="https://picsum.photos/800"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCrud;