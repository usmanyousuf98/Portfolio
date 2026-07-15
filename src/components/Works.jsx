import { motion } from "framer-motion";
import { PROJECTS } from "../data";

export default function Works() {
  return (
    <section id="Works" className="bg-accent py-20 text-bone md:py-28">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-bone/70">(Selected work)</span>
            <h2 className="display mt-4 text-bone text-6xl md:text-8xl">
              Works
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-bone/80">
            Things I've shipped in production — not toy demos. Pulled straight
            from the day job.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {PROJECTS.map((project, i) => {
            const isLive = project.href && project.href !== "#";
            const Wrapper = isLive ? motion.a : motion.div;
            const linkProps = isLive
              ? { href: project.href, target: "_blank", rel: "noreferrer" }
              : {};
            return (
              <Wrapper
                key={project.title}
                {...linkProps}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.05 }}
                className={`group flex flex-col justify-between gap-8 bg-bone p-7 text-ink transition-colors duration-300 hover:bg-ink hover:text-bone md:p-8 ${
                  isLive ? "cursor-pointer" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-4xl font-bold text-accent transition-colors duration-300 group-hover:text-coral md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-current px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-wider opacity-60">
                    {project.name} · {project.year}
                  </p>
                  <h3 className="mt-2 flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                    {project.title}
                    {isLive && (
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        ↗
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 max-w-[46ch] leading-relaxed opacity-80">
                    {project.description}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
