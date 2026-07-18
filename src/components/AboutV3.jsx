import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ABOUT_PARAGRAPHS,
  ABOUT_PRINCIPLES,
  EDUCATION,
  LOCATION,
  METRICS,
  NAME,
  PROFILE_IMG,
  ROLE_TAG,
  SKILLS,
} from "../data";

const ease = [0.22, 1, 0.36, 1];
const STATEMENT = "I care about the craft underneath the interface — the logic, the edge cases, and the speed that make software feel";

const treeContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const treeRow = { hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } } };

// Toolbox — the stack rendered as a developer's dependency tree: hairline
// connectors that draw in, category branches, and skill tokens that light up
// on hover. Reads like a real toolchain, not a tag soup.
function Toolbox() {
  const total = SKILLS.reduce((n, g) => n + g.items.length, 0);
  return (
    <div className="relative mt-6 border-t border-abyss-line pt-6">
      <div className="flex items-center justify-between">
        <span className="eyebrow-3 text-pulse">Toolbox</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-frost-dim">
          {total} packages · {SKILLS.length} groups
        </span>
      </div>

      <motion.div
        variants={treeContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-5"
      >
        {SKILLS.map((g, gi) => {
          const isFirst = gi === 0;
          const isLast = gi === SKILLS.length - 1;
          return (
            <motion.div key={g.title} variants={treeRow} className="grid grid-cols-[1.25rem_1fr] gap-x-2 py-3">
              {/* Tree connector — vertical spine segment + horizontal elbow */}
              <div className="relative" aria-hidden="true">
                <span
                  className="absolute left-0 w-px bg-abyss-line"
                  style={{ top: isFirst ? "18px" : 0, bottom: isLast ? "calc(100% - 18px)" : 0 }}
                />
                <span className="absolute left-0 top-[18px] h-px w-3 bg-abyss-line" />
              </div>
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="w-24 shrink-0 font-mono text-xs font-bold uppercase tracking-[0.15em] text-pulse">
                  {g.title}
                </span>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="cursor-default font-mono text-[13px] text-frost/75 transition-colors duration-200 hover:text-pulse"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// Statement reveals word-by-word with a blur-focus pull — a premium, distinct
// beat that reads sharper than a plain fade.
function BlurStatement({ reduced }) {
  const words = STATEMENT.split(" ");
  const wv = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, filter: "blur(10px)", y: 6 },
        show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5, ease } },
      };
  return (
    <motion.p
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.028 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20%" }}
      className="display-3 text-frost text-2xl sm:text-3xl md:text-[2.5rem]"
      style={{ lineHeight: 1.15 }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={wv} className="inline-block">
          {w}&nbsp;
        </motion.span>
      ))}
      <motion.span variants={wv} className="inline-block text-pulse">
        effortless.
      </motion.span>
    </motion.p>
  );
}

// Portrait that tilts toward the cursor in 3D, with animated corner brackets
// and a grayscale→color pull on hover.
function TiltPortrait({ reduced }) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], reduced ? [0, 0] : [7, -7]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], reduced ? [0, 0] : [-7, 7]), { stiffness: 150, damping: 15 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const bracket = "pointer-events-none absolute h-5 w-5 border-pulse/70 transition-all duration-300 group-hover:h-6 group-hover:w-6";

  return (
    <div className="group [perspective:900px]" onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-2xl border border-abyss-line bg-abyss"
      >
        <img
          src={PROFILE_IMG}
          alt={`Portrait of ${NAME}`}
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
          style={{ objectPosition: "50% 20%" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Corner brackets */}
        <span className={`${bracket} left-2.5 top-2.5 border-l-2 border-t-2`} />
        <span className={`${bracket} right-2.5 top-2.5 border-r-2 border-t-2`} />
        <span className={`${bracket} bottom-2.5 left-2.5 border-b-2 border-l-2`} />
        <span className={`${bracket} bottom-2.5 right-2.5 border-b-2 border-r-2`} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss via-abyss/70 to-transparent p-4 pt-12">
          <p className="font-display-3 text-lg font-bold leading-none text-frost">{NAME}</p>
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-pulse">{ROLE_TAG}</p>
        </div>
      </motion.div>
    </div>
  );
}

// Interactive principle chips — hovering one reveals its full body below, so
// the substance stays available without adding a stack of cards.
function Principles() {
  const [active, setActive] = useState(0);
  return (
    <div className="relative border-t border-abyss-line pt-6">
      <div className="flex flex-wrap gap-2.5">
        {ABOUT_PRINCIPLES.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-300 ${
              active === i
                ? "border-pulse bg-pulse/10 text-frost"
                : "border-abyss-line text-frost-dim hover:border-frost-dim/50"
            }`}
          >
            <span className={active === i ? "text-pulse" : "text-frost-dim"}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {p.title}
          </button>
        ))}
      </div>
      <div className="mt-4 min-h-[2.75rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease }}
            className="max-w-2xl text-sm leading-relaxed text-frost-dim"
          >
            {ABOUT_PRINCIPLES[active].body}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function CountUp({ to, suffix, reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, { duration: 1, ease: "easeOut", delay: 0.15 });
    return () => controls.stop();
  }, [inView, reduced, to, mv]);
  return (
    <motion.span ref={ref} className="text-pulse">
      {text}
    </motion.span>
  );
}

function FactsRow({ reduced }) {
  const eduShort = `${EDUCATION.degree.replace("Bachelor's in ", "BS ")}, DHA Suffa ’23`;
  const facts = [
    <>
      <span className="text-frost">{METRICS[0].value}</span> yrs shipping
    </>,
    <>
      <span className="text-frost">{METRICS[1].value}</span> projects
    </>,
    <>
      <CountUp to={50} suffix="%" reduced={reduced} /> faster mobile
    </>,
    <>{eduShort}</>,
    <>{LOCATION} · open to remote</>,
  ];
  return (
    <div className="relative mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-abyss-line pt-6 font-mono text-sm text-frost-dim">
      {facts.map((f, i) => (
        <span key={i} className="flex items-center gap-4">
          {i > 0 && <span className="text-abyss-line">·</span>}
          <span>{f}</span>
        </span>
      ))}
    </div>
  );
}

// About — one interactive panel: a cursor spotlight over a 3D-tilt portrait,
// a blur-focus statement, interactive principle chips, and a facts line.
export default function AboutV3() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${mx}px ${my}px, rgba(84,224,255,0.10), transparent 45%)`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section id="About" className="bg-abyss-soft py-16 md:py-20">
      <div className="container-px">
        <motion.div
          onMouseMove={onMove}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="relative overflow-hidden rounded-3xl border border-abyss-line bg-abyss p-6 md:p-10"
        >
          {/* Cursor spotlight */}
          <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
          {/* Faint engineered grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #eef1fa 1px, transparent 1px), linear-gradient(to bottom, #eef1fa 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative flex items-center justify-between">
            <span className="eyebrow-3 text-pulse">About me</span>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-frost-dim">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pulse" />
              </span>
              Available
            </span>
          </div>

          <div className="relative mt-8 grid grid-cols-1 items-center gap-8 md:grid-cols-[280px_1fr] md:gap-12">
            <TiltPortrait reduced={reduced} />
            <div>
              <BlurStatement reduced={reduced} />
              <p className="mt-6 max-w-2xl leading-relaxed text-frost-dim">{ABOUT_PARAGRAPHS[0]}</p>
            </div>
          </div>

          <div className="relative mt-8">
            <Principles />
          </div>

          <FactsRow reduced={reduced} />

          <Toolbox />
        </motion.div>
      </div>
    </section>
  );
}
