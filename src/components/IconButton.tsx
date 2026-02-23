import { type FC, type MouseEventHandler, type ReactNode } from "react";

interface IconButtonType {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const IconButton: FC<IconButtonType> = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid size-8 place-items-center rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition"
      aria-label="Close"
    >
      {children}
    </button>
  );
};

export default IconButton;