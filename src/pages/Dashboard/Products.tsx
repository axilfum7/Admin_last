import { useEffect, useState } from "react"
import { Input, Select } from "../../components"
import Button from "../../components/Button"
import { instance } from "../../Hooks"
import type { ProductType } from "../../@types"
import ProductCard from "../../components/ProductCard"

const Products = () => {
  const [search, setSearch] = useState("")
  const [categoryId, setCategoryId] = useState<string | number>("")
  const [products, setProducts] = useState([])

  useEffect(() => {
    instance().get("/products").then(res => setProducts(res.data.splica()))
  }, [])
  console.log(search);

  return (
    <div className="h-[95%] bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 -z-10 bg-[#0b1220]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_25%,rgba(255,115,0,0.18),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(255,0,107,0.12),transparent_55%),radial-gradient(800px_circle_at_50%_120%,rgba(96,165,250,0.10),transparent_55%)]" />

      <div className="flex items-center justify-between p-4">
        <div className="flex gap-5">
          <Input onChange={e => setSearch(e.target.value)} extraClass="border !px-3 !w-75" name="search" placeholder="Qidirish" type="text"/>
          <Select value={categoryId} setValue={setCategoryId} URL="/categories"/>
        </div>
        <Button showBg={false} extraClass="!w-[100px]" type="button">Yaratish</Button>
      </div>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {products.map((item:ProductType) => <ProductCard key={item.id} item={item}/>)}
      </div>
    </div>
  )
}

export default Products