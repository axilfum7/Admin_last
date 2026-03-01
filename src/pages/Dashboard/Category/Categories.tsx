import { useEffect, useState } from "react"
import { Input, Loading, PATH, CategoryCard } from "../../../components"
import Button from "../../../components/Button"
import { debounce, instance } from "../../../Hooks"
import type { CategoryType } from "../../../@types"
import { useNavigate } from "react-router-dom"

const Categories = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const name = debounce(search, 1000)


  const [loading, setLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<CategoryType[]>([])

  useEffect(() => {
    setLoading(true)
    instance()
      .get("/categories", { params: { name } })
      .then(res => setCategories(res.data.slice(0, 12)))
      .finally(() => setLoading(false))
  }, [name])

  const handleDelete = (id: number) => {
    if (!confirm("Kategoriya o'chirilsinmi?")) return

    setLoading(true)
    instance()
      .delete(`/categories/${id}`)
      .then(() => {
        setCategories(prev => prev.filter(item => item.id !== id))
        alert("Kategoriya o'chirildi")
      })
      .finally(() => setLoading(false))
  }  

  return (
    <div className="min-h-screen bg-[#0b1220] relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_25%,rgba(255,115,0,0.18),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(255,0,107,0.12),transparent_55%),radial-gradient(800px_circle_at_50%_120%,rgba(96,165,250,0.10),transparent_55%)]" />

      <div className="flex items-center justify-between p-4">
        <Input
          value={search}
          setValue={setSearch}
          extraClass="border !px-3 !w-75"
          name="search"
          placeholder="Qidirish"
          type="text"
        />

        <Button
          onClick={() => navigate(PATH.categoriesCreate)}
          showBg={false}
          extraClass="!w-[100px]"
          type="button"
        >
          Yaratish
        </Button>
      </div>

      <div className="relative px-5 group grid gap-5 grid-cols-4">
        {loading ? (
          <Loading
            wrapperClass="!absolute !top-20 !left-0 !right-0"
            borderClass="!w-15 !h-15"
            spinClass="!w-3 !h-3"
          />
        ) : (
          categories.map((item) => (
            <CategoryCard
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)} 
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Categories