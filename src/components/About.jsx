import { motion } from "framer-motion";
import { ABOUT_PARAGRAPHS, EDUCATION, NAME, PROFILE_IMG, SKILLS } from "../data";

export default function About() {
  return (
    <section id="About" className="bg-paper py-20 md:py-28">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-accent">(About me)</span>
            <h2 className="display mt-4 text-ink text-6xl md:text-8xl">About</h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4"
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-accent">
              <img
                src={PROFILE_IMG}
                alt={`Portrait of ${NAME}`}
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 22%" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </motion.div>

          {/* Statement + paragraphs + education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-8 md:col-span-8"
          >
            <p className="max-w-2xl font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
              I'm a software engineer who turns ideas into clean, intuitive
              digital experiences.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {ABOUT_PARAGRAPHS.map((p, idx) => (
                <p key={idx} className="leading-relaxed text-warm-gray">
                  {p}
                </p>
              ))}
            </div>

            <div className="border-t-2 border-ink pt-5">
              <span className="eyebrow text-warm-gray">(Education)</span>
              <p className="mt-2 font-display text-xl font-bold text-ink">
                {EDUCATION.degree}
              </p>
              <p className="text-warm-gray">
                {EDUCATION.school} · <span className="font-mono text-sm">{EDUCATION.dates}</span>
              </p>
            </div>
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
