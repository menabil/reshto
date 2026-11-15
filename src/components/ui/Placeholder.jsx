import { cn } from "@/lib/utils";

const tones = {
  brand: "from-brand-400 via-brand-500 to-brand-700",
  amber: "from-amber-300 via-orange-400 to-rose-500",
  green: "from-emerald-300 via-teal-400 to-cyan-500",
  violet: "from-violet-400 via-purple-500 to-indigo-600",
  rose: "from-rose-300 via-pink-400 to-fuchsia-500",
  slate: "from-slate-300 via-slate-400 to-slate-600",
};

const toneKeys = Object.keys(tones);

/**
 * Gradient / placeholder tile used in place of the (missing) original images.
 */
export const Placeholder = ({
  icon = "ri-restaurant-2-line",
  label,
  tone,
  className = "",
  iconClassName = "text-3xl",
}) => {
  const seed = (label || icon).length;
  const selected = tone || toneKeys[seed % toneKeys.length];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-linear-to-br",
        tones[selected] || tones.brand,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,#fff_0,transparent_45%),radial-gradient(circle_at_80%_70%,#fff_0,transparent_40%)]" />
      <div className="relative flex flex-col items-center gap-2 text-white">
        <i className={cn(icon, iconClassName, "drop-shadow")} />
        {label ? (
          <span className="px-3 text-center text-xs font-semibold uppercase tracking-wide opacity-90">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Placeholder;
