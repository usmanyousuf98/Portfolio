import { motion } from "framer-motion";
import { NAME, ROLE_TAG } from "../data";
import OrbitCanvas from "./OrbitCanvas";

const rise = {
  hidden: { opacity: 0, y: "110%" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

function Line({ children, i }) {
  return (
    <span className="block overflow-hidden">
      <motion.span className="block" custom={i} initial="hidden" animate="visible" variants={rise}>
        {children}
      </motion.span>
    </span>
  );
}

export default function HeroV3() {
  const [first, ...rest] = NAME.split(" ");
  return (
    <section id="top" className="relative min-h-svh overflow-hidden bg-abyss pt-32 md:pt-36">
      {/* Live 3D particle field */}
      <OrbitCanvas />

      {/* CSS glow — atmosphere on its own, and the graceful fallback if
          WebGL is unavailable. Also darkens the lower half so the
          statement + CTAs keep contrast over the particles. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, rgba(84,224,255,0.16), transparent 70%), linear-gradient(to bottom, transparent 40%, rgba(6,8,16,0.85) 92%)",
        }}
      />

      <div className="container-px relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-pulse shadow-[0_0_12px_2px_rgba(84,224,255,0.6)]" />
          <span className="eyebrow-3 text-frost-dim">Available for new roles — 2026</span>
        </motion.div>

        {/* Name on the left, the pitch on the right — two columns on desktop */}
        <div className="mt-7 grid grid-cols-1 items-center gap-x-12 gap-y-8 md:mt-10 md:grid-cols-2">
          <h1 className="display-3 text-frost text-[15vw] leading-[0.9] md:text-[7.5vw]">
            <Line i={0}>{first}</Line>
            <Line i={1}>
              <span className="text-frost">{rest.join(" ")}</span>
              <span className="text-pulse">.</span>
            </Line>
          </h1>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-7 border-t border-abyss-line pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0"
          >
            <p className="font-display-3 text-2xl font-medium leading-tight tracking-tight text-frost sm:text-3xl md:text-[2rem]">
              {ROLE_TAG} building production web &amp; mobile apps that{" "}
              <span className="text-pulse">ship and scale</span>.
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-frost-dim">
              {["Web", "Mobile", "Performance"].map((f, idx) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-pulse">{String(idx + 1).padStart(2, "0")}</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href="#Contact"
                className="rounded-full bg-pulse px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-abyss shadow-[0_0_24px_-4px_rgba(84,224,255,0.6)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Get in touch →
              </a>
              <a
                href="#Works"
                className="rounded-full border border-abyss-line px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-frost transition-colors duration-200 hover:border-pulse"
              >
                See work
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
