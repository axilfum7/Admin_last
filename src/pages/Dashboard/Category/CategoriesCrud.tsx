import { useEffect, useState, type SubmitEvent } from "react"
import { Input, Loading} from "../../../components"
import Button from "../../../components/Button"
import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../../Hooks"
import { CrudFn } from "../../../services"

const CategoriesCrud = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  function handleSubmit(evt: SubmitEvent<HTMLFormElement>) {
    evt.preventDefault()
    setLoading(true)

    const data = { name,image }

    CrudFn(id, "/categories", 
    data,
      setLoading,
      navigate,
      `Categotiya ${id ? "tahrirlandi" : "qo'shildi"}`
    )
  }

  useEffect(() => {
    if (id) {
      instance().get(`/categories/${id}`).then(res => {
        setName(res.data.name)
        setImage(res.data.image)
      })
    }
  }, [id])

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-white font-bold text-[25px]">{id ? "Category tahrirlash" : "Category qo'shish"}</h1>
        <Button extraClass="!w-[100px] !h-[48px] cursor-pointer" type="submit">
          {loading ? <Loading /> : "Saqlash"}
        </Button>
      </div>

      <div className="flex justify-center gap-10 mt-6">
        <div className="w-[45%] flex flex-col gap-5">
          <label className="flex items-center gap-4">
            <span className="text-white pl-2">Category nomi:</span>
            <Input value={name} setValue={setName} extraClass="w-[400px] border pl-3" type="text" name="title" placeholder="Category nomini kiriting" required />
          </label>
        </div>

        <div className="w-[45%] flex flex-col gap-5">
          <label className="flex items-center gap-4">
            <span className="text-white pl-2">Category rasmi:</span>
            <Input value={image} setValue={setImage} extraClass="w-[400px] border pl-3" type="text" name="images" placeholder="Category rasmini kiriting" required />
          </label>
        </div>
      </div>
    </form>
  )
}

export default CategoriesCrud
