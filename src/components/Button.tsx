import type { FC, MouseEventHandler, ReactNode } from "react";

interface ButtonType {
  children: ReactNode;
  type?: "button" | "submit";
  extraClass?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  showBg?:boolean
}

const Button: FC<ButtonType> = ({ onClick, type, extraClass, children, showBg }) => {
  return (
    <button
      style={showBg? {}: {"--darkBlue": "#071427", "--darkRed": "#FF2E51", "darkOrange": "#FF6A00",} as React.CSSProperties}
      type={type}
      onClick={onClick}
      className={`${extraClass} relative w-full py-3 rounded-xl bg-linear-to-r from-[#7f1d1d] via-[#1e3a8a] to-[#ea580c] text-white font-semibold tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 overflow-hidden group`}
    >
      {/* Gradient shine effect */}
      <span className="pointer-events-none absolute inset-0 w-2/3 bg-[linear-gradient(to_right,rgba(255,255,255,0.2),transparent,rgba(255,255,255,0.2))] blur-sm opacity-0 transition-all duration-500 group-hover:opacity-100"></span>

      {children}
    </button>
  );
};

export default Button;