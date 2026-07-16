import { motion } from "framer-motion";
import { PROJECTS } from "../data";

export default function WorksV3() {
  return (
    <section id="Works" className="bg-abyss py-24 md:py-32">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow-3 text-pulse">Selected work</span>
            <h2 className="display-3 mt-4 text-frost text-6xl md:text-8xl">Works</h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-frost-dim">
            Things I've shipped in production — not toy demos. Pulled
            straight from the day job.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
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
                className={`group relative flex flex-col justify-between gap-10 overflow-hidden rounded-2xl border border-abyss-line bg-abyss-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:border-pulse/60 md:p-8 ${
                  isLive ? "cursor-pointer" : ""
                }`}
              >
                {/* Corner glow revealed on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, rgba(84,224,255,0.35), transparent 70%)" }}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="font-mono text-4xl font-bold text-abyss-line transition-colors duration-300 group-hover:text-pulse md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-abyss-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-frost-dim transition-colors duration-300 group-hover:border-pulse/50 group-hover:text-frost">
                    {project.category}
                  </span>
                </div>

                <div className="relative">
                  <p className="font-mono text-xs uppercase tracking-wider text-frost-dim">
                    {project.name} · {project.year}
                  </p>
                  <h3 className="mt-2 flex items-center gap-2 font-display-3 text-2xl font-bold tracking-tight text-frost md:text-3xl">
                    {project.title}
                    {isLive && (
                      <span className="text-pulse transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 max-w-[46ch] leading-relaxed text-frost-dim">
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
