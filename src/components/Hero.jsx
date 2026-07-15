import { motion } from "framer-motion";
import { LOCATION, NAME, PROFILE_IMG } from "../data";

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

export default function Hero() {
  const [first, ...rest] = NAME.split(" ");
  return (
    <section id="top" className="relative min-h-svh bg-paper pt-28 md:pt-32">
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-coral" />
          <span className="eyebrow text-ink">Open to opportunities — 2026</span>
        </motion.div>

        <h1 className="display mt-6 text-ink text-[16vw] leading-[0.86] md:text-[11.5vw] lg:text-[10vw]">
          <Line i={0}>{first}</Line>
          <Line i={1}>
            <span className="text-ink">{rest.join(" ")}</span>
            <span className="text-coral">.</span>
          </Line>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-8 border-t-2 border-ink pt-8 md:mt-14 md:grid-cols-12 md:gap-10">
          {/* Portrait in a pine-green block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="order-2 md:order-1 md:col-span-4"
          >
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-accent">
              <img
                src={PROFILE_IMG}
                alt={`Portrait of ${NAME}`}
                loading="eager"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 22%" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="absolute bottom-3 left-3 eyebrow bg-coral px-2 py-1 text-bone">
                {LOCATION}
              </span>
            </div>
          </motion.div>

          {/* Statement + CTAs */}
          <div className="order-1 flex flex-col justify-between gap-8 md:order-2 md:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="max-w-2xl font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl md:text-4xl"
            >
              I build production web &amp; mobile apps end to end — from React
              interfaces to Node.js APIs that <span className="text-accent">ship and scale</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            >
              <div className="flex flex-wrap gap-3">
                <a
                  href="#Contact"
                  className="group relative overflow-hidden rounded-full bg-ink px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-bone"
                >
                  <span className="relative z-10">Get in touch →</span>
                  <span className="absolute inset-0 z-0 origin-left scale-x-0 bg-coral transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100" />
                </a>
                <a
                  href="#Works"
                  className="rounded-full border-2 border-ink px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-bone"
                >
                  See work
                </a>
              </div>

              <div className="font-mono text-xs uppercase leading-relaxed tracking-wider text-warm-gray">
                <div>{LOCATION} · Remote</div>
                <div>3+ yrs · Full-Stack</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
