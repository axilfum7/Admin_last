import type { FC } from "react";

interface Props {
  spinClass?: string;
  borderClass?: string;
  wrapperClass?: string;
};

const Loading: FC<Props> = ({ spinClass = "", borderClass = "", wrapperClass = "" }) => {
  return (
    <span className={`inline-flex items-center justify-center ${wrapperClass}`}>
      {/* Glow */}
      <span className="relative">
        <span className="pointer-events-none absolute -inset-3 rounded-full blur-xl opacity-40" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,106,0,0.45), transparent 55%), radial-gradient(circle at 70% 70%, rgba(255,46,81,0.35), transparent 55%)", }}/>
        {/* Spinner */}
        <span
          className={`relative grid place-items-center h-6 w-6 rounded-full ${borderClass}`} style={{ background: "rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 10px 30px rgba(0,0,0,0.35)", }} >
          <span className="absolute inset-0 rounded-full animate-spin" style={{ background: "conic-gradient(from 210deg, rgba(255,255,255,0.25) 0deg, var(--darsOrange) 120deg, var(--darsRed) 260deg, rgba(255,255,255,0.25) 360deg)", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)", mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)", }} />
          <span className="absolute inset-0.75 rounded-full" style={{ background: "rgba(7,20,39,0.55)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)", }} />
          <span className={`relative h-1.5 w-1.5 rounded-full ${spinClass} animate-pulse`} style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 0 10px rgba(255,255,255,0.35), 0 0 18px rgba(255,106,0,0.28), 0 0 22px rgba(255,46,81,0.18)", }} />
        </span>
      </span>
    </span>
  );
};

export default Loading;