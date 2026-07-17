import { motion } from "framer-motion";
import { ROLE_TAG } from "../data";
import SignalName from "./SignalName";

export default function HeroV2() {
  return (
    <section id="top" className="relative min-h-svh overflow-hidden bg-void pt-32 md:pt-36">
      {/* Faint grid — signature "engineered" texture behind the type */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f4f4ef 1px, transparent 1px), linear-gradient(to bottom, #f4f4ef 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="container-px relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
          </span>
          <span className="eyebrow-2 text-cream-dim">Available for new roles — 2026</span>
        </motion.div>

        {/* Name as an interactive three.js particle field */}
        <SignalName />

        <div className="mt-10 flex flex-col gap-8 border-t border-void-line pt-9 md:mt-16 md:pt-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="max-w-3xl font-display-2 text-2xl font-medium leading-tight tracking-tight text-cream sm:text-3xl md:text-4xl"
          >
            {ROLE_TAG} building production web &amp; mobile apps that{" "}
            <span className="text-signal">ship and scale</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#Contact"
              className="group relative overflow-hidden rounded-full bg-signal px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-void transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Get in touch →
            </a>
            <a
              href="#Works"
              className="rounded-full border border-void-line px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-cream transition-colors duration-200 hover:border-cream"
            >
              See work
            </a>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#About"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream-dim transition-colors hover:text-cream md:inline-flex"
        >
          <span className="relative flex h-9 w-5 justify-center overflow-hidden rounded-full border border-void-line">
            <span className="mt-1.5 h-1.5 w-0.5 animate-bounce rounded-full bg-signal" />
          </span>
          Scroll to explore
        </motion.a>
      </div>
    </section>
  );
}
