import { useEffect, useState, type ChangeEvent } from "react";
import type { UserType } from "../../../@types";
import { instance, useDebounce } from "../../../Hooks";
import { Button, Input, PATH, UsersCard } from "../../../components";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const debounce = useDebounce(search, 1000);

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  useEffect(() => {
    setLoading(true);
    instance()
      .get(PATH.users)
      .then((res) => setUsers(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error("Users fetch error:", err);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const q = (debounce || "").trim().toLowerCase();

  const filteredUsers = users.filter((u) => {
    const fullname = (name ?? "").toLowerCase();
    const email = (u.email ?? "").toLowerCase();
    return !q || fullname.includes(q) || email.includes(q);
  });

  return (
    <section className="relative h-[95%] overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_12px_55px_rgba(0,0,0,0.55)]">
      {/* Header */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 rounded-3xl bg-white/5 ring-1 ring-white/10 p-4">
          <div className="flex flex-col gap-2">
            <p className="text-white/45 text-xs tracking-[0.22em] uppercase">Users</p>
            <h2 className="text-white text-lg sm:text-xl font-semibold">
              Foydalanuvchilar ro‘yxati
            </h2>
            <p className="text-white/50 text-sm">
              {filteredUsers.length} ta foydalanuvchi topildi
            </p>
          </div>

          <div className="flex gap-2.5 w-full lg:w-90">
            <Input value={search} onChange={changeInput} type="text" placeholder="Search users..."/>
            <Button onClick={() => navigate(PATH.usersCreate)} showBg={false} extraClass="!w-[120px]" type="button">
              Yaratish
            </Button>
          </div>
        </div>
      </div>

      {/* Users */}
      <div className="px-4 sm:px-5 pb-5 flex-1 overflow-auto">
        {loading ? (
          <div className="min-h-55 grid place-items-center rounded-3xl bg-white/5 ring-1 ring-white/10 text-white/70">
            Loading...
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredUsers.map((u) => (
              <UsersCard u={u} key={u.id} />
            ))}
          </div>
        ) : (
          <div className="min-h-55 grid place-items-center rounded-3xl bg-white/5 ring-1 ring-white/10">
            <div className="text-center">
              <p className="text-white/80 text-lg font-medium">Foydalanuvchi topilmadi</p>
              <p className="mt-1 text-white/45 text-sm">Qidiruvni o‘zgartirib ko‘ring</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Users;