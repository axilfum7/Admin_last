import { useEffect, useState } from "react"
import { Input, Loading, Select, ProductCard, PATH } from "../../../components"
import Button from "../../../components/Button"
import { useDebounce, instance } from "../../../Hooks"
import type { ProductType } from "../../../@types"
import { useNavigate } from "react-router-dom"


const Products = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const title = useDebounce(search, 1000)
  const [categoryId, setCategoryId] = useState<string | number>("")

  const [loading, setLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<ProductType[]>([])


  useEffect(() => {
    instance().get("/products", {
      params: { title, categoryId }
    }).then(res => setProducts(res.data.slice(0, 12))).finally(() => setLoading(false))
  }, [title, categoryId])

  return (
  <div className="min-h-screen relative overflow-hidden ">
    {/* background */}
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_25%,rgba(255,115,0,0.18),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(255,0,107,0.12),transparent_55%),radial-gradient(800px_circle_at_50%_120%,rgba(96,165,250,0.10),transparent_55%)]" />

    <div className="mx-auto w-full px-4 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white/90">Products</h1>
          <p className="mt-1 text-sm text-white/55">
            Mahsulotlarni qidirish va filtrlash.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          {/* Search */}
          <div className="group relative w-full sm:w-[320px]">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-white/45 transition group-focus-within:text-white/80">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_55px_rgba(0,0,0,0.35)] transition hover:bg-white/[0.07] hover:border-white/20 focus-within:border-white/25 focus-within:ring-1 focus-within:ring-white/20">
              <Input value={search} setLoading={setLoading} setValue={setSearch} name="search" placeholder="Qidirish..." type="text" extraClass="w-full bg-transparent py-3 pl-4 pr-4 text-white placeholder:text-white/35 outline-none !border-0 !shadow-none" />
            </div>
          </div>

          {/* Select */}
          <div className="w-full sm:w-55 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_55px_rgba(0,0,0,0.35)] transition hover:bg-white/[0.07] hover:border-white/20">
            <Select setLoading={setLoading} value={categoryId} setValue={setCategoryId} URL="/categories" extraClass="!w-full !bg-white/5 !text-white border-white/5"/>
          </div>

          {/* Create */}
          <Button onClick={() => navigate(PATH.productsCreate)} showBg={false} extraClass="!w-[120px]" type="button">Yaratish</Button>
        </div>
      </div>

      {/* Content */}
      <div className="relative mt-6">
        {/* grid */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!loading &&
            products.map((item: ProductType) => (
              <ProductCard key={item.id} item={item} />
            ))}
        </div>

        {/* loading overlay */}
        {loading && (
          <div className="absolute inset-0 grid place-items-center rounded-3xl">
            <div className="absolute inset-0 rounded-3xl bg-black/20 backdrop-blur-[2px]" />
            <Loading borderClass="!w-14 !h-14" spinClass="!w-3 !h-3" />
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default Products