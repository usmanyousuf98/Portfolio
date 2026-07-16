import { motion } from "framer-motion";
import { ABOUT_PARAGRAPHS, EDUCATION, NAME, PROFILE_IMG, SKILLS } from "../data";

export default function AboutV3() {
  return (
    <section id="About" className="bg-abyss-soft py-24 md:py-32">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow-3 text-pulse">About me</span>
            <h2 className="display-3 mt-4 text-frost text-6xl md:text-8xl">About</h2>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-abyss-line bg-abyss">
              <img
                src={PROFILE_IMG}
                alt={`Portrait of ${NAME}`}
                loading="lazy"
                className="h-full w-full object-cover grayscale"
                style={{ objectPosition: "50% 22%" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(80% 60% at 50% 100%, rgba(84,224,255,0.14), transparent 70%)" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-8 md:col-span-8"
          >
            <p className="max-w-2xl font-display-3 text-2xl font-medium leading-tight tracking-tight text-frost sm:text-3xl">
              I care about the craft underneath the interface — the logic,
              the edge cases, and the speed that make software feel effortless.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {ABOUT_PARAGRAPHS.map((p, idx) => (
                <p key={idx} className="leading-relaxed text-frost-dim">
                  {p}
                </p>
              ))}
            </div>

            <div className="border-t border-abyss-line pt-5">
              <span className="eyebrow-3 text-frost-dim">Education</span>
              <p className="mt-2 font-display-3 text-xl font-bold text-frost">{EDUCATION.degree}</p>
              <p className="text-frost-dim">
                {EDUCATION.school} · <span className="font-mono text-sm">{EDUCATION.dates}</span>
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-2xl border border-abyss-line bg-abyss p-8 md:mt-10 md:p-12"
        >
          <div className="flex items-baseline justify-between">
            <span className="eyebrow-3 text-pulse">Toolbox</span>
            <span className="font-display-3 text-lg font-bold text-frost/30">Skills</span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            {SKILLS.map((group) => (
              <div key={group.title}>
                <h3 className="border-b border-abyss-line pb-2 font-mono text-xs uppercase tracking-wider text-frost-dim">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-frost/90">
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
