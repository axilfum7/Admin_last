import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CategoryType } from "../../../@types";
import { IconButton, Loading, Modal } from "../../../components";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import Button from "../../../components/Button";
import { DeleteFn, GetById } from "../../../services";

const CategoriesMore = () => {
  const { id } = useParams();
  const [moreData, setMoreData] = useState<CategoryType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [delModal, setDelModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    GetById(`/categories/${id}`, setMoreData);
  }, [id]);

  function handleDeleteCategory() {
    if (!id) return;
    setLoading(true);
    DeleteFn(`/categories/${id}`, setLoading, setDelModal, "Kategoriya o'chirildi", navigate);
  }

  return (
    <div className="relative min-h-[calc(100vh-24px)] w-full">
      {/* bg */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80 blur-3xl
        bg-[radial-gradient(900px_circle_at_10%_0%,rgba(255,106,0,0.18),transparent_55%),radial-gradient(900px_circle_at_95%_30%,rgba(255,46,81,0.14),transparent_55%),radial-gradient(900px_circle_at_50%_120%,rgba(96,165,250,0.10),transparent_55%)]"
      />

      {/* Header */}
      <div className="sticky top-0 z-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden">
          <div className="h-px w-full bg-[linear-gradient(to_right,transparent,rgba(255,106,0,0.75),rgba(255,46,81,0.65),transparent)]" />

          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80
                           transition hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
                title="Back"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="min-w-0">
                <p className="text-xs text-white/55">Categories • #{moreData?.id ?? "-"}</p>
                <h1 className="mt-0.5 truncate text-xl font-semibold text-white/90">
                  {moreData?.name ?? "Loading..."}
                </h1>
                <p className="mt-1 text-xs text-white/45 truncate">
                  {moreData?.slug ? `/${moreData.slug}` : "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IconButton
                onClick={() => setDelModal(true)}
                extraClass="!h-[44px] !w-[44px] !rounded-2xl !border !border-white/10 !bg-white/5 hover:!bg-white/10 hover:!border-white/20 active:!scale-[0.98]"
              >
                <Trash2 size={18} />
              </IconButton>

              <Button
                onClick={() => navigate("update")}
                type="button"
                extraClass="!mt-0 !h-[44px] rounded-2xl !px-4 !text-sm !font-semibold border border-white/10 bg-[linear-gradient(135deg,rgba(255,106,0,0.85),rgba(255,46,81,0.75))] shadow-[0_18px_50px_rgba(255,46,81,0.12)] transition hover:brightness-110 active:scale-[0.98]" >
                <span className="inline-flex items-center gap-2">
                  <Pencil size={16} />
                  Tahrirlash
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-6 grid gap-5 lg:grid-cols-12">
        {/* Image */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            <div className="aspect-16/10 w-full overflow-hidden">
              <img
                src={moreData?.image}
                alt={moreData?.name}
                className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                onError={(e) => (e.currentTarget.src = "https://picsum.photos/id/10/600/400")}
              />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(7,20,39,0.78),transparent_60%)]" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-white/55">Slug</p>
                  <p className="truncate text-sm font-semibold text-white/90">
                    {moreData?.slug ?? "-"}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  ID: {moreData?.id ?? "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 grid gap-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            <p className="text-sm font-semibold text-white/85">Category info</p>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/50">Name</p>
                <p className="mt-1 truncate text-sm text-white/85">{moreData?.name ?? "-"}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/50">Slug</p>
                <p className="mt-1 truncate text-sm text-white/85">{moreData?.slug ?? "-"}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/50">Image URL</p>
                <p className="mt-1 break-all text-sm text-white/75">{moreData?.image ?? "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal open={delModal} onClose={() => setDelModal(false)} title="Kategoriya o'chirilsinmi?">
        <div className="space-y-4">
          <p className="text-sm text-white/70">
            <span className="font-semibold text-white/90">{moreData?.name ?? "Kategoriya"}</span> o‘chiriladi.
            Bu amalni ortga qaytarib bo‘lmaydi.
          </p>

          <div className="flex gap-3">
            <Button
              showBg={true}
              onClick={() => setDelModal(false)}
              extraClass="!text-white/85 !bg-white/10 !ring-1 !ring-white/10 hover:!bg-white/15 active:scale-[0.98]"
              type="button"
            >
              Bekor qilish
            </Button>

            <Button
              onClick={handleDeleteCategory}
              extraClass="!bg-gradient-to-r !from-orange-500 !to-pink-500 !shadow-[0_0_18px_rgba(255,80,0,0.35)]
                         hover:!brightness-110 hover:!shadow-[0_0_30px_rgba(255,80,0,0.5)] active:scale-[0.98]"
              type="button"
            >
              {loading ? <Loading /> : "O'chirish"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesMore;