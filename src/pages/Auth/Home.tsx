import { FiTrendingUp, FiUsers, FiBox, FiGrid, FiPlus, FiRefreshCw } from "react-icons/fi";

type StatCardProps = {
  title: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
};

const StatCard = ({ title, value, hint, icon }: StatCardProps) => (
  <div className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition hover:bg-white/[0.07]">
    {/* glow */}
    <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-white/60">{title}</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
        <p className="mt-2 text-xs text-white/45">{hint}</p>
      </div>

      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/85">
        {icon}
      </div>
    </div>
  </div>
);

type ActionCardProps = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const ActionCard = ({ title, desc, icon, onClick }: ActionCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative w-full overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 p-5 text-left shadow-[0_18px_55px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition hover:bg-white/[0.07]"
  >
    <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
      <div className="absolute -left-24 -top-24 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-24 -bottom-24 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
    </div>

    <div className="relative flex items-start gap-4">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/85">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs text-white/55">{desc}</p>
      </div>
      <div className="ml-auto mt-1 h-8 w-8 rounded-2xl bg-white/5 ring-1 ring-white/10 opacity-60 transition group-hover:opacity-100" />
    </div>
  </button>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70 ring-1 ring-white/10">
    {children}
  </span>
);

const Home = () => {
  // demo data (xohlasangiz API’dan keltirib qo‘yib beraman)
  const stats = [
  { title: "Jami mahsulotlar", value: "1,248", hint: "+12% oxirgi 7 kunda", icon: <FiBox size={20} /> },
  { title: "Kategoriya", value: "38", hint: "+2 ta yangi", icon: <FiGrid size={20} /> },
  { title: "Foydalanuvchilar", value: "9,541", hint: "+5% haftalik o‘sish", icon: <FiUsers size={20} /> },
  { title: "Savdo trendi", value: "↑ 23%", hint: "So‘nggi 30 kun", icon: <FiTrendingUp size={20} /> },
];

  const recent = [
    { name: "iPhone 15 Pro", type: "Product", time: "2 daqiqa oldin", status: "Updated" },
    { name: "Audio & Gadgets", type: "Category", time: "1 soat oldin", status: "Created" },
    { name: "John Doe", type: "User", time: "3 soat oldin", status: "Registered" },
    { name: "MacBook Air M3", type: "Product", time: "Kecha", status: "Created" },
  ];

  return (
    <div className="min-h-[calc(100vh-88px)] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">Asosiy</h2>
            <Badge>Admin Panel</Badge>
            <Badge>Live</Badge>
          </div>
          <p className="mt-2 text-sm text-white/55">
            Tezkor ko‘rsatkichlar, so‘nggi faoliyat va boshqaruv amallari.
            </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <input
              placeholder="Search… (products, users, category)"
              className="w-full sm:w-80 rounded-2xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-white/20"
            />
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/40">
              ⌘K
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/8"
          >
            <FiRefreshCw />
            Yangilash
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-orange-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(249,115,22,0.25)] transition hover:brightness-110"
          >
            <FiPlus />
            Yangi qo‘shish
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} title={s.title} value={s.value} hint={s.hint} icon={s.icon} />
        ))}
      </div>

      {/* Main grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Chart / Overview */}
        <div className="relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">Overview</p>
              <p className="mt-1 text-xs text-white/55">So‘nggi 14 kunlik ko‘rsatkichlar (demo)</p>
            </div>
            <Badge>Last 14 days</Badge>
          </div>

          {/* Fake chart */}
          <div className="mt-5 grid gap-4">
            <div className="grid grid-cols-7 items-end gap-2">
              {[30, 40, 22, 55, 44, 60, 48].map((h, i) => (
                <div key={i} className="h-24 rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                  <div
                    className="w-full rounded-2xl bg-linear-to-t from-white/25 to-white/5"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge>Conversion: 3.2%</Badge>
              <Badge>Avg. order: $42.10</Badge>
              <Badge>Bounce: 28%</Badge>
              <Badge>New users: +214</Badge>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-28 -right-28 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Quick actions */}
        <div className="grid gap-4">
          <ActionCard
            title="Mahsulot qo‘shish"
            desc="Yangi product yaratish va rasm yuklash."
            icon={<FiBox size={20} />}
            onClick={() => console.log("add product")}
          />
          <ActionCard
            title="Kategoriya boshqaruvi"
            desc="Kategoriya yaratish, o‘zgartirish va tartiblash."
            icon={<FiGrid size={20} />}
            onClick={() => console.log("category")}
          />
          <ActionCard
            title="Foydalanuvchilar"
            desc="Role, status va profil ma’lumotlari."
            icon={<FiUsers size={20} />}
            onClick={() => console.log("users")}
          />
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-6 overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3 p-5">
          <div>
            <p className="text-sm font-semibold text-white">So‘nggi faoliyat</p>
            <p className="mt-1 text-xs text-white/55">Oxirgi harakatlar ro‘yxati</p>
          </div>
          <button
            type="button"
            className="rounded-2xl bg-white/5 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/8"
          >
            Barchasi
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-white/3">
              <tr className="text-left text-xs text-white/55">
                <th className="px-5 py-3 font-medium">Nomi</th>
                <th className="px-5 py-3 font-medium">Turi</th>
                <th className="px-5 py-3 font-medium">Vaqt</th>
                <th className="px-5 py-3 font-medium">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recent.map((r) => (
                <tr key={r.name} className="text-sm text-white/80 hover:bg-white/3">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-2xl bg-white/5 ring-1 ring-white/10" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">{r.name}</p>
                        <p className="truncate text-xs text-white/45">ID: #{Math.floor(Math.random() * 9000 + 1000)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-white/65">{r.type}</td>
                  <td className="px-5 py-4 text-white/65">{r.time}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/75 ring-1 ring-white/10">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-5 text-xs text-white/45">
          Tip: Sidebar bilan bir xil “glass” effekt chiqishi uchun parent container’da `bg-white/5 ring-white/10 backdrop-blur` ishlatildi.
        </div>
      </div>
    </div>
  );
};

export default Home;