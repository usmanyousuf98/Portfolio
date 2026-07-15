import { motion } from "framer-motion";
import { EXPERIENCE } from "../data";

export default function Experience() {
  return (
    <section id="Experience" className="bg-ink py-20 text-bone md:py-28">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-coral">(Where I've worked)</span>
            <h2 className="display mt-4 text-bone text-6xl md:text-8xl">
              Experience
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-bone/60">
            Three years shipping features that move real numbers — load times,
            storage, adoption.
          </p>
        </div>

        <div className="mt-14 border-t border-bone/25">
          {EXPERIENCE.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="grid grid-cols-1 gap-6 border-b border-bone/25 py-10 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-5">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-accent">({job.index})</span>
                  <div>
                    <h3 className="font-display text-3xl font-extrabold tracking-tight text-bone md:text-4xl">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-bone/60">
                      {job.company} · {job.location}
                    </p>
                    <p className="mt-3 inline-block bg-accent px-2 py-1 font-mono text-xs uppercase tracking-wider text-bone">
                      {job.dates}
                    </p>
                  </div>
                </div>
              </div>

              <ul className="flex flex-col gap-3 md:col-span-7">
                {job.items.map((item) => (
                  <li key={item} className="flex gap-3 text-bone/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-coral" />
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
