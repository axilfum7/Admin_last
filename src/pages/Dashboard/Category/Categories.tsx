import { useEffect, useState, type ChangeEvent } from "react";
import { CategoryCard, Input, PATH } from "../../../components";
import Button from "../../../components/Button";
import type { CategoryType} from "../../../@types";
import { GetById } from "../../../services";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../Hooks";


const Category = () => {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [search, setSearch] = useState<string>("")

  const navigete = useNavigate()

  const debounce = useDebounce(search,1000);

  function changeInput(e:ChangeEvent<HTMLInputElement>){
    setSearch(e.target.value)
  }

  const filteredCategories = categories.filter((c: any) => 
    c.name?.toLowerCase().includes(debounce.trim().toLowerCase())
  );

  useEffect(() => {
    GetById("/categories",setCategories)
  },[setCategories])
  

  return (
    <section className="relative w-full p-3 sm:p-4">
      {/* page bg */}
      <div className="absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1100px_circle_at_20%_20%,rgba(217,70,239,0.18),transparent_60%),radial-gradient(1100px_circle_at_85%_65%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(900px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />

      <div className="h-full overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_12px_55px_rgba(0,0,0,0.55)]">
        {/* top neon line */}
        <div className="h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />

        <div className="h-full bg-white/5 backdrop-blur-2xl flex flex-col">
          {/* Header row (screenshotga yaqin) */}
          <div className="p-3 sm:p-4">

            {/* Search + create */}
            <div className="mt-4 flex flex-col lg:flex-row lg:items-center gap-3 rounded-3xl bg-white/5 ring-1 ring-white/10 p-3 shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                <Input
                  value={search}
                  onChange={changeInput}
                  extraClass="!mt-0 !w-full sm:!max-w-[320px] !border !border-white/10 !bg-white/5 !text-white placeholder:!text-white/40 !px-4 !rounded-2xl"
                  name="search"
                  placeholder="Kategoriya qidirish..."
                  type="text"
                />
              </div>

              <Button onClick={() => navigete(PATH.categoriesCreate)} showBg={false} extraClass="!w-[120px]" type="button">Yaratish</Button>
            </div>

            {/* title */}
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-white text-lg font-semibold">Kategoriyalar</p>
                <p className="text-white/50 text-xs sm:text-sm">
                  Test data bilan ko‘rinishi
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-3 sm:px-4 pb-4 flex-1 overflow-auto">
            {categories.length === 0 ? (
              <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-10 text-center text-white/60">
                Kategoriya topilmadi
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredCategories.map((c: any) => (
                  <CategoryCard key={c.id} item={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;






