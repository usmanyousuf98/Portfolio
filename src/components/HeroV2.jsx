import { motion } from "framer-motion";
import { LOCATION, NAME, PROFILE_IMG, ROLE_TAG } from "../data";
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

        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-void-line pt-9 md:mt-16 md:grid-cols-12 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="order-2 md:order-1 md:col-span-4"
          >
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-void-line bg-void-soft">
              <img
                src={PROFILE_IMG}
                alt={`Portrait of ${NAME}`}
                loading="eager"
                className="h-full w-full object-cover grayscale"
                style={{ objectPosition: "50% 22%" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-void/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-cream backdrop-blur-sm">
                {LOCATION}
              </span>
            </div>
          </motion.div>

          <div className="order-1 flex flex-col justify-start gap-8 md:order-2 md:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="max-w-2xl font-display-2 text-2xl font-medium leading-tight tracking-tight text-cream sm:text-3xl md:text-4xl"
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
        </div>
      </div>
    </section>
  );
}
