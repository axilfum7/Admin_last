import { useEffect, useState } from "react";
import { FiUser, FiMail } from "react-icons/fi";
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
    if (id) {
      instance()
        .get(`/users/${id}`)
        .then((res) => {
          setName(res.data.name || "");
          setEmail(res.data.email || "");
          setPassword(res.data.password || "");
          setAvatar(res.data.avatar || "");
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleSave = () => {
    const data = { name, email, password, avatar };

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
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-white/40">Users</p>
            <h1 className="text-3xl font-semibold text-white">
              {id ? "Foydalanuvchini tahrirlash" : "Foydalanuvchi qo‘shish"}
            </h1>
          </div>

          <Button
            onClick={handleSave}
            type="button"
            extraClass="h-12 px-6 rounded-2xl text-white font-semibold bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500"
          >
            {loading ? <Loading /> : "Saqlash"}
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* FORM */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm text-white/70">Foydalanuvchi nomi</label>
              <div className="relative mt-2">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 w-full pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
                  placeholder="John"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-white/70">Email</label>
              <div className="relative mt-2">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
                  placeholder="john@gmail.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-white/70">Parol</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full px-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none mt-2"
                placeholder="1234"
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="text-sm text-white/70">Avatar URL</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="h-12 w-full px-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none mt-2"
                placeholder="https://picsum.photos/800"
              />
            </div>
          </div>

          {/* PREVIEW */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col items-center justify-center">
            <div className="w-40 h-40 rounded-3xl overflow-hidden border border-white/10 bg-black/20">
              {avatar ? (
                <img
                  src={avatar}
                  alt="preview"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/400x400?text=User")
                  }
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40">
                  Avatar Preview
                </div>
              )}
            </div>

            <p className="mt-4 text-white font-semibold text-lg">
              {name || "User Name"}
            </p>
            <p className="text-white/50 text-sm">
              {email || "user@email.com"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCrud;