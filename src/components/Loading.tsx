import type { FC } from "react";


const Loading:FC<{spinClass?:string, borderClass?:string, wrapperClass?:string}> = ({spinClass, borderClass, wrapperClass}) => {
  return (
    <span className={`flex ${wrapperClass} items-center justify-center`} >
      <span className={`relative h-6 w-6 ${borderClass}`}>
        <span
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background:
              "conic-gradient(from 180deg, #ffffff 0deg, var(--darkOrange) 120deg, var(--darkRed) 260deg, #ffffff 360deg)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)",
            mask:
              "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)",
          }}
        >
          <span className="absolute inset-0 flex items-center justify-center">
            <span className={`h-1.5 w-1.5 ${spinClass} rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]`}>
            </span>
          </span>
        </span>
      </span>
    </span>
  );
};

export default Loading;