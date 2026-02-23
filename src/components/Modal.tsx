import { useEffect } from "react";
import IconButton from "./IconButton";
import { CloseIcon } from "../assets/icons";

type ModalProps = { open: boolean; onClose: () => void; title?: string; children: React.ReactNode;
};

const Modal = ({ open, onClose, title = "Modal", children,
}: ModalProps) => {

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; 
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center">

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-md mx-4 rounded-3xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-6"
      >

        {title && (
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white text-lg font-semibold">
              {title}
            </h2>

            <IconButton onClick={onClose}>
                <CloseIcon/>          
            </IconButton>

          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;