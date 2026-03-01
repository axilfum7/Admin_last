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
    <div className="min-h-screen bg-[#0b1220] relative">
      <div className="absolute inset-0 -z-10  bg-[radial-gradient(900px_circle_at_20%_25%,rgba(255,115,0,0.18),transparent_60%), radial-gradient(900px_circle_at_85%_70%,rgba(255,0,107,0.12),transparent_55%), radial-gradient(800px_circle_at_50%_120%,rgba(96,165,250,0.10),transparent_55%)]" />
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-5">
          <Input value={search} setLoading={setLoading} setValue={setSearch} extraClass="border !px-3 !w-75" name="search" placeholder="Qidirish" type="text" />
          <Select setLoading={setLoading} value={categoryId} setValue={setCategoryId} URL="/categories" />
        </div>
        <Button onClick={() => navigate(PATH.productsCreate)} showBg={false} extraClass="!w-[100px]" type="button">Yaratish</Button>
      </div>
      <div className="relative px-5 group grid gap-5 grid-cols-4">
  {loading ? (<Loading wrapperClass="!absolute !top-20 !left-0 !right-0" borderClass="!w-15 !h-15" spinClass="!w-3 !h-3"/>) : (
    products.map((item: ProductType) => (
      <ProductCard key={item.id} item={item} />
    ))
  )}
     </div>
    </div>


  )
}

export default Products