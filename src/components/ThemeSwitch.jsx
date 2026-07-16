import { useTheme, THEMES } from "../ThemeContext";

// One entry per template: the dot color (its signature accent) and label.
const TEMPLATES = [
  { key: THEMES.BLOCK, label: "Block", dot: "#cf4e2a" },
  { key: THEMES.SIGNAL, label: "Signal", dot: "#d4ff3f" },
  { key: THEMES.ORBIT, label: "Orbit", dot: "#54e0ff" },
];

// Pill chrome per active theme so the control blends into whichever
// template is showing.
const SHELL = {
  [THEMES.BLOCK]: "border-ink bg-paper/90 text-ink hover:border-coral",
  [THEMES.SIGNAL]: "border-void-line bg-void-soft/90 text-cream hover:border-signal",
  [THEMES.ORBIT]: "border-abyss-line bg-abyss-soft/90 text-frost hover:border-pulse",
};

export default function ThemeSwitch() {
  const { theme, cycleTheme } = useTheme();
  const active = TEMPLATES.find((t) => t.key === theme) ?? TEMPLATES[0];
  const next = TEMPLATES[(TEMPLATES.indexOf(active) + 1) % TEMPLATES.length];

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Template: ${active.label}. Switch to ${next.label}.`}
      title={`Template: ${active.label} — click for ${next.label}`}
      className={`group fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-full border-2 py-2 pl-3.5 pr-4 font-mono text-[11px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md transition-colors duration-300 md:bottom-7 md:right-7 ${SHELL[theme]}`}
    >
      <span className="flex items-center gap-1.5">
        {TEMPLATES.map((t) => {
          const isActive = t.key === theme;
          return (
            <span
              key={t.key}
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? "1.15rem" : "0.4rem",
                height: "0.4rem",
                backgroundColor: t.dot,
                opacity: isActive ? 1 : 0.35,
              }}
            />
          );
        })}
      </span>
      <span className="tabular-nums">{active.label}</span>
    </button>
  );
}
