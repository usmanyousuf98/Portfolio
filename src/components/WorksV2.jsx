import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "../data";
import SignalEyebrow from "./SignalEyebrow";

// Deterministic per-title seed → a tiny PRNG, so each project's generative
// glyph is unique but stable across renders/reloads (never random noise).
function seededRandoms(str, n) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  const rand = () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  return Array.from({ length: n }, rand);
}

const ease = [0.22, 1, 0.36, 1];

// The "no-image" visual: a per-category Signal glyph seeded from the title.
// The generator is chosen BY category so the mark encodes what the project is.
// Drawn on mount (inside the expanded drawer), lime-on-void, sparing accent.
function SignalGlyph({ category, seed }) {
  const r = useMemo(() => seededRandoms(seed, 32), [seed]);
  const W = 132;
  const H = 60;

  // Backend → audio waveform / sparkline that draws left-to-right.
  if (/back/i.test(category)) {
    const pts = r.slice(0, 12).map((v, i) => {
      const x = (i / 11) * W;
      const y = H / 2 + (v - 0.5) * H * 0.82;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[60px] w-[132px] overflow-visible">
        <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="var(--color-void-line)" strokeWidth="1" />
        <motion.polyline
          points={pts.join(" ")}
          fill="none"
          stroke="var(--color-signal)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease }}
        />
      </svg>
    );
  }

  // ML / Computer Vision → dot-field with dashed lime detection boxes.
  if (/vision|ml|cv/i.test(category)) {
    const dots = r.slice(0, 20).map((v, i) => ({
      x: 6 + v * (W - 12),
      y: 6 + r[(i + 7) % 32] * (H - 12),
    }));
    const boxes = [
      { x: 8 + r[0] * 40, y: 8 + r[1] * 18, w: 34, h: 24 },
      { x: 70 + r[2] * 30, y: 20 + r[3] * 16, w: 30, h: 20 },
    ];
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[60px] w-[132px] overflow-visible">
        {dots.map((d, i) => (
          <motion.circle
            key={i}
            cx={d.x}
            cy={d.y}
            r="1"
            fill="var(--color-cream-dim)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.02 }}
          />
        ))}
        {boxes.map((b, i) => (
          <motion.rect
            key={`b${i}`}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth="1.25"
            strokeDasharray="3 3"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.15, ease }}
            style={{ transformOrigin: `${b.x + b.w / 2}px ${b.y + b.h / 2}px` }}
          />
        ))}
      </svg>
    );
  }

  // Full-Stack (and default) → layered node/wire schematic that draws in.
  const rows = [12, 30, 48];
  const nodes = rows.flatMap((y, ri) =>
    r.slice(ri * 4, ri * 4 + 4).map((v, i) => ({
      x: 12 + i * 36 + (v - 0.5) * 10,
      y,
      lime: (ri * 4 + i) % 5 === 0,
    }))
  );
  const wires = [];
  for (let i = 0; i < 4; i++) {
    wires.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[i + 4].x, y2: nodes[i + 4].y });
    wires.push({ x1: nodes[i + 4].x, y1: nodes[i + 4].y, x2: nodes[i + 8].x, y2: nodes[i + 8].y });
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-[60px] w-[132px] overflow-visible">
      {wires.map((w, i) => (
        <motion.line
          key={`w${i}`}
          x1={w.x1}
          y1={w.y1}
          x2={w.x2}
          y2={w.y2}
          stroke="var(--color-void-line)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.04, ease }}
        />
      ))}
      {nodes.map((nd, i) => (
        <motion.circle
          key={`n${i}`}
          cx={nd.x}
          cy={nd.y}
          r={nd.lime ? 2.4 : 1.6}
          fill={nd.lime ? "var(--color-signal)" : "var(--color-cream-dim)"}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: nd.lime ? 1 : 0.7, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.35 + i * 0.02 }}
        />
      ))}
    </svg>
  );
}

// One index row. Collapsed it's a scannable spec line; active (hover on
// desktop, tap/focus on touch+keyboard) it indents, lights lime, dims its
// siblings, and drops a detail drawer with the description + a generative glyph.
function WorkRow({ project, index, active, dimmed, isLive, onActivate, onClear, onToggle }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <li
      className={`relative border-t border-void-line transition-opacity duration-300 ${
        dimmed ? "opacity-40" : "opacity-100"
      }`}
      onMouseEnter={onActivate}
      onMouseLeave={onClear}
    >
      {/* Left tick — persistent faint on featured, bright + full on active */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-full w-0.5 origin-bottom transition-transform duration-300 ${
          active ? "scale-y-100 bg-signal" : project.featured ? "scale-y-100 bg-signal/30" : "scale-y-0 bg-signal/30"
        }`}
      />

      <button
        type="button"
        onFocus={onActivate}
        onBlur={onClear}
        onClick={onToggle}
        aria-expanded={active}
        className={`grid w-full grid-cols-[2rem_1fr_1.5rem] items-baseline gap-x-4 py-5 pr-1 text-left transition-[padding] duration-300 md:grid-cols-[3rem_minmax(0,1fr)_10rem_10rem_3.5rem_1.75rem] md:gap-x-6 ${
          active ? "pl-5 md:pl-7" : "pl-4 md:pl-5"
        }`}
      >
        {/* NO. */}
        <span
          className={`font-mono text-lg tabular-nums transition-colors duration-300 ${
            active ? "text-signal" : "text-void-line"
          }`}
        >
          {num}
        </span>

        {/* PROJECT */}
        <span className="min-w-0">
          <span className="flex items-center gap-2.5">
            {project.featured && <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />}
            <span
              className={`truncate font-display-2 text-2xl font-bold tracking-tight transition-colors duration-300 md:text-3xl ${
                active ? "text-cream" : "text-cream/85"
              }`}
            >
              {project.title}
            </span>
          </span>
          {/* Mobile-only meta line (columns are hidden on small screens) */}
          <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-wider text-cream-dim md:hidden">
            {project.name} · {project.category} · {project.year}
          </span>
        </span>

        {/* ORG / CATEGORY / YR — desktop columns */}
        <span className="hidden font-mono text-sm text-cream-dim md:block">{project.name}</span>
        <span className="hidden font-mono text-[11px] uppercase tracking-wider text-cream-dim md:block">
          {project.category}
        </span>
        <span className="hidden font-mono text-sm tabular-nums text-cream-dim md:block">{project.year}</span>

        {/* Arrow */}
        <span
          className={`justify-self-end text-lg transition-all duration-300 ${
            active ? "translate-x-1 text-signal" : "text-void-line"
          }`}
        >
          →
        </span>
      </button>

      {/* Detail drawer */}
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-6 pb-7 pl-4 pr-2 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10 md:pl-[3.5rem]">
              <div>
                <p className="max-w-[60ch] leading-relaxed text-cream">{project.description}</p>
                <span
                  className={`mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider ${
                    isLive ? "text-signal" : "text-cream-dim"
                  }`}
                >
                  {isLive ? "View case →" : "Internal · production"}
                </span>
              </div>
              <div className="shrink-0 rounded-xl border border-void-line bg-void p-3">
                <SignalGlyph category={project.category} seed={project.title} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function WorksV2() {
  const [active, setActive] = useState(null);
  const featuredCount = PROJECTS.filter((p) => p.featured).length;

  return (
    <section id="Works" className="bg-void py-24 md:py-32">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SignalEyebrow num="04">Selected work</SignalEyebrow>
            <h2 className="display-2 mt-4 text-cream text-6xl md:text-8xl">Works</h2>
          </div>
          <div className="flex max-w-sm flex-col gap-3">
            <p className="text-lg leading-snug text-cream-dim">
              Things I've shipped in production — not toy demos. Pulled straight
              from the day job.
            </p>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-dim">
              {String(PROJECTS.length).padStart(2, "0")} entries / {featuredCount} featured
            </span>
          </div>
        </div>

        {/* The index — one hairline-ruled catalog panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
          className="mt-14 overflow-hidden rounded-2xl border border-void-line bg-void-soft"
        >
          {/* Spec-sheet column header (desktop) */}
          <div className="hidden grid-cols-[3rem_minmax(0,1fr)_10rem_10rem_3.5rem_1.75rem] gap-x-6 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim md:grid">
            <span>No.</span>
            <span>Project</span>
            <span>Org</span>
            <span>Category</span>
            <span>Yr</span>
            <span />
          </div>

          <ul>
            {PROJECTS.map((project, i) => {
              const isLive = project.href && project.href !== "#";
              return (
                <WorkRow
                  key={project.title}
                  project={project}
                  index={i}
                  isLive={isLive}
                  active={active === i}
                  dimmed={active !== null && active !== i}
                  onActivate={() => setActive(i)}
                  onClear={() => setActive(null)}
                  onToggle={() => setActive((cur) => (cur === i ? null : i))}
                />
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
