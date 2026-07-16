import { motion } from "framer-motion";
import { EXPERIENCE } from "../data";

export default function ExperienceV3() {
  return (
    <section id="Experience" className="bg-abyss-soft py-24 md:py-32">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow-3 text-pulse">Where I've worked</span>
            <h2 className="display-3 mt-4 text-frost text-6xl md:text-8xl">Experience</h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-frost-dim">
            Three years shipping features that move real numbers — load
            times, storage, adoption.
          </p>
        </div>

        {/* Timeline: a cyan spine on the left with pulsing nodes per role. */}
        <div className="mt-16 flex flex-col gap-0">
          {EXPERIENCE.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative grid grid-cols-1 gap-6 border-l border-abyss-line py-8 pl-8 md:grid-cols-12 md:gap-8 md:pl-12"
            >
              <span className="absolute left-0 top-9 h-3 w-3 -translate-x-1/2 rounded-full bg-pulse shadow-[0_0_12px_2px_rgba(84,224,255,0.55)]" />
              <div className="md:col-span-5">
                <span className="font-mono text-sm text-pulse">({job.index})</span>
                <h3 className="mt-1 font-display-3 text-3xl font-bold tracking-tight text-frost md:text-4xl">
                  {job.role}
                </h3>
                <p className="mt-1 text-frost-dim">
                  {job.company} · {job.location}
                </p>
                <p className="mt-3 inline-block rounded-full border border-abyss-line px-3 py-1 font-mono text-xs uppercase tracking-wider text-frost">
                  {job.dates}
                </p>
              </div>

              <ul className="flex flex-col gap-3 md:col-span-7">
                {job.items.map((item) => (
                  <li key={item} className="flex gap-3 text-frost/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pulse" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
