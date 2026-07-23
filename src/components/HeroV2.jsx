import { motion } from "framer-motion";
import { ROLE_TAG } from "../data";
import SignalName from "./SignalName";
import SignalBars from "./SignalBars";

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
          <SignalBars className="ml-1 h-3.5" />
        </motion.div>

        {/* Name (interactive particle field) on the left, the pitch on the
            right — two columns on desktop, stacked on mobile. */}
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-8 md:mt-4 md:grid-cols-2">
          <SignalName />

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-7 border-t border-void-line pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0"
          >
            <p className="font-display-2 text-2xl font-medium leading-tight tracking-tight text-cream sm:text-3xl md:text-[2rem]">
              {ROLE_TAG} building production web &amp; mobile apps that{" "}
              <span className="text-signal">ship and scale</span>.
            </p>

            {/* Focus strip — real specialties, keeps the column from reading empty */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cream-dim">
              {["Web", "Mobile", "Performance"].map((f, idx) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-signal">{String(idx + 1).padStart(2, "0")}</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href="#Contact"
                className="group relative overflow-hidden rounded-full bg-signal px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-void transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span
                  aria-hidden="true"
                  className="signal-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                />
                <span className="relative">Get in touch →</span>
              </a>
              <a
                href="#Works"
                className="rounded-full border border-void-line px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-cream transition-colors duration-200 hover:border-cream"
              >
                See work
              </a>
            </div>
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
