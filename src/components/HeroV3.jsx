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

        <h1 className="display-3 mt-7 text-frost text-[15vw] leading-[0.9] md:text-[10.5vw] lg:text-[9vw]">
          <Line i={0}>{first}</Line>
          <Line i={1}>
            <span className="text-frost">{rest.join(" ")}</span>
            <span className="text-pulse">.</span>
          </Line>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-abyss-line pt-9 md:mt-16 md:grid-cols-12 md:gap-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="max-w-2xl font-display-3 text-2xl font-medium leading-tight tracking-tight text-frost sm:text-3xl md:col-span-8 md:text-4xl"
          >
            {ROLE_TAG} building production web &amp; mobile apps that{" "}
            <span className="text-pulse">ship and scale</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-3 md:col-span-4 md:items-end"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
