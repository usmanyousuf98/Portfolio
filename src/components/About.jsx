import { motion } from "framer-motion";
import {
  ABOUT_PARAGRAPHS,
  ABOUT_PRINCIPLES,
  EDUCATION,
  EXPERIENCE,
  LOCATION,
  METRICS,
  NAME,
  PROFILE_IMG,
  ROLE_TAG,
  SKILLS,
} from "../data";

// Staggered reveal — children animate in sequence once the block scrolls in,
// instead of every element fading up at the same instant.
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const current = EXPERIENCE[0];

  return (
    <section id="About" className="bg-paper py-20 md:py-28">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-accent">(About me)</span>
            <h2 className="display mt-4 text-ink text-6xl md:text-8xl">About</h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-warm-gray">
            The person behind the commits — how I think about building software.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Portrait + metrics — a sticky left rail that fills the column
              height, so the tall text column no longer leaves dead space. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 md:col-span-4 md:sticky md:top-24 md:self-start"
          >
            <div className="group relative aspect-[4/5] w-full overflow-hidden bg-accent">
              <img
                src={PROFILE_IMG}
                alt={`Portrait of ${NAME}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                style={{ objectPosition: "50% 22%" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* Photo-credit caption pinned to the bottom of the image */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-10">
                <p className="font-display text-lg font-bold leading-none text-bone">{NAME}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-bone/70">
                  {ROLE_TAG} · {LOCATION}
                </p>
              </div>
            </div>

            {/* Metrics — real numbers, previously unused on this page */}
            <dl className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line">
              {METRICS.map((m) => (
                <div key={m.label} className="flex flex-col gap-1 bg-paper p-4">
                  <dt className="font-display text-3xl font-extrabold leading-none text-accent">{m.value}</dt>
                  <dd className="text-sm leading-snug text-warm-gray">{m.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Statement + single-column story + principles + education */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-8 md:col-span-8"
          >
            <motion.p
              variants={item}
              className="max-w-2xl font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl"
            >
              I care about the craft underneath the interface — the logic,
              the edge cases, and the speed that make software feel effortless.
            </motion.p>

            {ABOUT_PARAGRAPHS.map((p, idx) => (
              <motion.p key={idx} variants={item} className="max-w-2xl leading-relaxed text-warm-gray">
                {p}
              </motion.p>
            ))}

            {/* Principles — the substance, as an editorial list, not columns.
                A hover accent bar and full-width rows keep them from reading thin. */}
            <motion.ul variants={item} className="flex flex-col border-t border-line">
              {ABOUT_PRINCIPLES.map((p, idx) => (
                <motion.li
                  key={p.title}
                  variants={item}
                  className="group grid grid-cols-[auto_1fr] gap-x-4 border-b border-line py-5 transition-colors duration-300 hover:bg-paper-dim sm:gap-x-6"
                >
                  <span className="font-mono text-sm font-semibold text-accent tabular-nums transition-transform duration-300 group-hover:translate-x-1">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-warm-gray">{p.body}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:gap-10">
              <div>
                <span className="eyebrow text-warm-gray">(Currently)</span>
                <p className="mt-2 font-display text-lg font-bold text-ink">{current.role}</p>
                <p className="text-warm-gray">{current.company}</p>
              </div>
              <div className="sm:border-l-2 sm:border-ink sm:pl-10">
                <span className="eyebrow text-warm-gray">(Education)</span>
                <p className="mt-2 font-display text-lg font-bold text-ink">{EDUCATION.degree}</p>
                <p className="text-warm-gray">
                  {EDUCATION.school} · <span className="font-mono text-sm">{EDUCATION.dates}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills — ink color block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-ink p-8 text-bone md:mt-10 md:p-12"
        >
          <div className="flex items-baseline justify-between">
            <span className="eyebrow text-coral">(Toolbox)</span>
            <span className="font-display text-lg font-bold text-bone/40">Skills</span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            {SKILLS.map((group) => (
              <div key={group.title}>
                <h3 className="border-b border-bone/25 pb-2 font-mono text-xs uppercase tracking-wider text-bone/60">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-bone/90">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
