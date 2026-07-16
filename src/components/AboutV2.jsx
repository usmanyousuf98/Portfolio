import { motion } from "framer-motion";
import { ABOUT_PARAGRAPHS, EDUCATION, EXPERIENCE, LOCATION, SKILLS } from "../data";

// The hero already carries the portrait, so About stays typographic:
// statement + story on the left, a quick-facts rail on the right, and the
// toolbox as tag chips below.
export default function AboutV2() {
  const current = EXPERIENCE[0];

  return (
    <section id="About" className="bg-void-soft py-24 md:py-32">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow-2 text-signal">About me</span>
            <h2 className="display-2 mt-4 text-cream text-6xl md:text-8xl">About</h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-cream-dim">
            The person behind the commits — how I think about building software.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Statement + story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8 md:col-span-7"
          >
            <p className="font-display-2 text-2xl font-medium leading-tight tracking-tight text-cream sm:text-3xl">
              I care about the craft underneath the interface — the logic, the
              edge cases, and the speed that make software feel{" "}
              <span className="text-signal">effortless</span>.
            </p>

            <div className="flex max-w-prose flex-col gap-5">
              {ABOUT_PARAGRAPHS.map((p, idx) => (
                <p key={idx} className="leading-relaxed text-cream-dim">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Quick-facts rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 md:col-start-9"
          >
            <dl className="flex flex-col divide-y divide-void-line border-y border-void-line">
              <div className="flex flex-col gap-1.5 py-5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-cream-dim">
                  Currently
                </dt>
                <dd className="text-cream">
                  {current.role} · {current.company}
                </dd>
              </div>
              <div className="flex flex-col gap-1.5 py-5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-cream-dim">
                  Education
                </dt>
                <dd className="text-cream">{EDUCATION.degree}</dd>
                <dd className="text-cream-dim">
                  {EDUCATION.school} ·{" "}
                  <span className="font-mono text-sm">{EDUCATION.dates}</span>
                </dd>
              </div>
              <div className="flex flex-col gap-1.5 py-5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-cream-dim">
                  Based in
                </dt>
                <dd className="text-cream">{LOCATION} · open to remote</dd>
              </div>
            </dl>
          </motion.div>
        </div>

        {/* Toolbox */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 border-t border-void-line pt-10"
        >
          <div className="flex items-baseline justify-between">
            <span className="eyebrow-2 text-signal">Toolbox</span>
            <span className="font-display-2 text-lg font-bold text-cream/30">Skills</span>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map((group) => (
              <div key={group.title}>
                <h3 className="font-mono text-xs uppercase tracking-wider text-cream-dim">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-void-line px-3 py-1 text-sm text-cream/85"
                    >
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
