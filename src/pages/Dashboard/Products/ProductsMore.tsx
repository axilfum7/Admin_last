import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { ProductType } from "../../../@types"
import { IconButton, Loading, Modal } from "../../../components"
import { Trash2 } from "lucide-react"
import Button from "../../../components/Button"
import { DeleteFn, GetById } from "../../../services"

const ProductsMore = () => {
  const { id } = useParams()
  const [moreData, setMoreData] = useState<ProductType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [delModal, setDelModal] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => GetById(`/products/${id}`, setMoreData), [])
  const money = (n: number | undefined) => `$${Number(n).toFixed(2)}`;
  const fmt = (iso: any) => new Date(iso).toLocaleString();

  // Delete Product
  function handleDeleteProduct(){
    setLoading(true)
    DeleteFn(`/products/${id}`,setLoading, setDelModal, "Mahsulot o'chirildi", navigate)
  }
  return (
    <div className="min-h-[calc(100vh-24px)] w-full">
      <div className="sticky top-0 z-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs text-white/60">Products / #{moreData?.id}</p>
            <h1 className="truncate text-lg font-semibold text-white sm:text-xl">{moreData?.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <IconButton onClick={() => setDelModal(true)} extraClass="!size-[0px] !w-[80px] !h-[45px]"> <Trash2 /> </IconButton>
            <Button onClick={() => navigate('update')} extraClass="!mt-0" type="button">Tahrirlash</Button>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="aspect-16/10 w-full overflow-hidden">
              <img src={moreData?.images?.[0]} alt={moreData?.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex gap-3 p-4">
              {moreData?.images?.slice(0, 3).map((src) => (
                <div key={src} className="aspect-square w-16 overflow-hidden rounded-xl border border-white/10 bg-black/20" >
                  <img onError={(evt) => (evt.target as HTMLImageElement).src = "https://picsum.photos/id/10/100/100"} src={src} alt="moreData" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-white/60">Price</p>
                  <p className="text-2xl font-semibold text-white">{money(moreData?.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60">Slug</p>
                  <p className="max-w-55 truncate text-sm text-white/85">{moreData?.slug}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">ID: {moreData?.id}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">Category: {moreData?.category?.name}</span>
              </div>
            </div>
            {/* Description */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/60">Description</p>
              <p className="mt-2 text-sm leading-6 text-white/85">{moreData?.description}</p>
            </div>

            {/* Category */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/60">Category</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-black/20">
                  <img src={moreData?.category?.image} alt={moreData?.category?.name} className="h-full w-full object-cover" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {moreData?.category?.name}
                  </p>
                  <p className="truncate text-xs text-white/60">
                    {moreData?.category?.slug}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid gap-2 text-xs text-white/70">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/50">Created</span>
                  <span className="truncate">{fmt(moreData?.category.creationAt)}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/50">Updated</span>
                  <span className="truncate">{fmt(moreData?.category?.updatedAt)}</span>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/60">Meta</p>
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
          </div>
        </div>
      </div>

      <Modal open={delModal} onClose={() => setDelModal(false)} title="Mahsulotni ochirmoqchimisiz!">
        <div className="flex gap-5">
          <Button showBg={true} onClick={() => setDelModal(false)} extraClass="!text-white/80 !bg-white/20 !ring-1 !ring-white/10 hover:!bg-white/10 hover:!text-white" type="button">Bekor qilish</Button>
          <Button onClick={handleDeleteProduct} extraClass="!bg-gradient-to-r !from-orange-500 !to-pink-500 !shadow-[0_0_18px_rgba(255,80,0,0.35)] hover:!brightness-110 hover:!shadow-[0_0_30px_rgba(255,80,0,0.5)]" type="button">
            {loading ? <Loading /> : "O'chirish"}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ProductsMore