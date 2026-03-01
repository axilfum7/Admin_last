import { useNavigate } from "react-router-dom"
import type { CategoryType } from "../@types"
import { FiEdit2, FiTrash2 } from "react-icons/fi"

interface Props {
  item: CategoryType
  onDelete?: (id: number) => void
}

const CategoryCard = ({ item, onDelete }: Props) => {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/categories/${item.id}`)} className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 hover:ring-orange-400/40 transition-all duration-300 p-4 group">

      <div className="group relative mx-auto max-w-7xl px-6 py-10">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-white text-lg font-semibold line-clamp-1">
          {item.name}
        </h3>

        <p className="text-white/60 text-sm line-clamp-2">{item.slug}</p>
      </div>

      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button className="p-2 rounded-lg bg-linear-to-r from-red-500 to-pink-500 text-white hover:brightness-110 transition">
          <FiEdit2 size={16} />
        </button>

        <button  onClick={(e) => {e.stopPropagation(); onDelete?.(item.id)}} className="p-2 rounded-lg bg-linear-to-r from-red-500 to-pink-500 text-white hover:brightness-110 transition">
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default CategoryCard