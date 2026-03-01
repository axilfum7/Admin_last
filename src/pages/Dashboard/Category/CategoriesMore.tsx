import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { CategoryType} from "../../../@types"
import { IconButton, Loading, Modal } from "../../../components"
import { Trash2 } from "lucide-react"
import Button from "../../../components/Button"
import { DeleteFn, GetById } from "../../../services"

const CategoriesMore = () => {
  const { id } = useParams()
  const [moreData, setMoreData] = useState<CategoryType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [delModal, setDelModal] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return
    GetById(`/categories/${id}`, setMoreData)
  }, [id])

  const fmt = (iso: string | undefined) => iso ? new Date(iso).toLocaleString() : "-"

  function handleDeleteCategory() {
    if (!id) return
    setLoading(true)
    DeleteFn(`/categories/${id}`, setLoading, setDelModal, "Kategoriya o'chirildi", navigate)
  }

  return (
    <div className="min-h-[calc(100vh-24px)] w-full">
      {/* Header */}
      <div className="sticky top-0 z-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs text-white/60">Categories / #{moreData?.id}</p>
            <h1 className="truncate text-lg font-semibold text-white sm:text-xl">{moreData?.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <IconButton onClick={() => setDelModal(true)} extraClass="!w-[80px] !h-[45px]">
              <Trash2 />
            </IconButton>
            <Button onClick={() => navigate('update')} extraClass="!mt-0" type="button">Tahrirlash</Button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="aspect-16/10 w-full overflow-hidden">
              <img
                src={moreData?.image}
                alt={moreData?.name}
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.src = "https://picsum.photos/id/10/600/400")}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid gap-4">
          {/* Meta */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60">Slug</p>
            <p className="truncate mt-1 text-sm text-white/85">{moreData?.slug}</p>
            <div className="mt-3 grid gap-2 text-xs text-white/70">
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/50">Created</span>
                <span className="truncate">{fmt(moreData?.creationAt)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/50">Updated</span>
                <span className="truncate">{fmt(moreData?.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60">Description</p>
            <p className="mt-2 text-sm leading-6 text-white/85">{moreData?.description || "-"}</p>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal open={delModal} onClose={() => setDelModal(false)} title="Kategoriya o'chirilsinmi?">
        <div className="flex gap-5">
          <Button
            showBg={true}
            onClick={() => setDelModal(false)}
            extraClass="!text-white/80 !bg-white/20 !ring-1 !ring-white/10 hover:!bg-white/10 hover:!text-white"
            type="button"
          >
            Bekor qilish
          </Button>
          <Button
            onClick={handleDeleteCategory}
            extraClass="!bg-gradient-to-r !from-orange-500 !to-pink-500 !shadow-[0_0_18px_rgba(255,80,0,0.35)] hover:!brightness-110 hover:!shadow-[0_0_30px_rgba(255,80,0,0.5)]"
            type="button"
          >
            {loading ? <Loading /> : "O'chirish"}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default CategoriesMore