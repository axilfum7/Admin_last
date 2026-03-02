import { useEffect, useState, type SubmitEvent } from "react"
import { Input, Loading, Select } from "../../../components"
import Button from "../../../components/Button"
import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../../Hooks"
import { CrudFn } from "../../../services"

const ProductCrud = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [categoryId, setCategoryId] = useState<string | number>("")
  const [images, setImages] = useState<string>("")

  function handleSubmit(evt: SubmitEvent<HTMLFormElement>) {
    setLoading(true)
    evt.preventDefault()
    const data = { title, price, description, categoryId, images:[images] }
    CrudFn(id, "/products", data, setLoading, navigate, `Mahsulot ${id ? "tahrirlandi" : "qoshildi"}`)
  }
  useEffect(() => {
    if(id) {
      instance().get(`/products/${id}`).then(res => {
        setTitle(res.data.title)
        setPrice(res.data.price)
        setDescription(res.data.description)
        setCategoryId(res.data.category.id)
        setImages(res.data.images[0])
      })
    }
  },[])
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-white font-bold text-[25px]">Mahsulot {id ? "tahrirlash" : "qo'shish"}</h1>
        <Button extraClass="!w-[100px] !h-[48px] cursor-pointer" type="submit">
          {loading ? <Loading /> : "Saqlash"}
        </Button>
      </div>
      <div className="flex justify-center gap-10 mt-6">
        <div className="w-[45%] flex flex-col gap-5">
          <label className="flex gap-4 items-center"> 
            <span className="text-white pl-2">Mahsulot nomi:</span>
            <Input value={title} setValue={setTitle} extraClass="border pl-3" type="text" name="title" placeholder="Mahsulot nomini kiriting" required />
          </label>
          <label className="flex gap-4 items-center">
            <span className="text-white pl-2">Mahsulot narxi:</span>
            <Input value={price} setValue={setPrice} extraClass="border pl-3" type="text" name="price" placeholder="Mahsulot narxini kiriting" required />
          </label>
          <label className="flex gap-4 items-center">
            <span className="text-white pl-2">Mahsulot haqida:</span>
            <Input value={description} setValue={setDescription} extraClass="border pl-3" type="text" name="description" placeholder="Mahsulot haqida..." required />
          </label>
        </div>
        <div className="w-[45%] flex flex-col gap-5">
          <label className="flex flex-col gap-4">
            <span className="text-white pl-2">Kategoriya tanlang:</span>
            <Select extraClass="w-full !py-[13px] bg-[#0b1220]!" value={categoryId} setValue={setCategoryId} URL="/categories" />
          </label>
          <label className="flex gap-4 items-center">
            <span className="text-white pl-2">Mahsulot rasmi:</span>
            <Input value={images} setValue={setImages} extraClass="border pl-3" type="text" name="images" placeholder="Mahsulot rasmini kiriting" required />
          </label>
        </div>
      </div>
    </form>
  )
}

export default ProductCrud