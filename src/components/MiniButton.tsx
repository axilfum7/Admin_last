import { type FC, type ReactNode, type MouseEventHandler } from "react";

interface MiniButtonType {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  extraClass?: string;
  type?: "button" | "submit";
}

const MiniButton: FC<MiniButtonType> = ({
  children,
  onClick,
  extraClass,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 py-1 rounded-lg text-sm transition ${extraClass}`}
    >
      {children}
    </button>
  );
};

export default MiniButton;