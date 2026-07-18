import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { EXPERIENCE } from "../data";

// Pull a display year (and a "present" flag) out of a "Feb 2024 — Present" string.
function parseSpan(dates) {
  const [start, end] = dates.split("—").map((s) => s.trim());
  const startYear = (start.match(/\d{4}/) || [""])[0];
  const isPresent = /present/i.test(end || "");
  const endYear = isPresent ? "NOW" : (end.match(/\d{4}/) || [""])[0];
  return { startYear, endYear, isPresent };
}

// One node on the spine. Its dot ignites (fills pulse + rings) once it scrolls
// into view; the card slides in from the side it sits on.
function TimelineEntry({ job, index }) {
  const { startYear, endYear, isPresent } = parseSpan(job.dates);
  const side = index % 2 === 0 ? "right" : "left"; // alternate on desktop

  return (
    <div className="relative pb-16 last:pb-0 md:grid md:grid-cols-2 md:gap-x-16">
      {/* Node on the spine (left on mobile, center on desktop) */}
      <motion.span
        initial={{ scale: 0, backgroundColor: "#0c1020" }}
        whileInView={{ scale: 1, backgroundColor: "#54e0ff" }}
        viewport={{ once: true, margin: "-45% 0px -45% 0px" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[7px] top-1.5 z-10 h-4 w-4 rounded-full ring-4 ring-abyss-soft md:left-1/2 md:-ml-2"
      >
        {isPresent && <span className="absolute inset-0 animate-ping rounded-full bg-pulse opacity-75" />}
      </motion.span>

      {/* Card — offset to the correct side on desktop */}
      <motion.article
        initial={{ opacity: 0, x: side === "right" ? 40 : -40, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative ml-10 md:ml-0 ${
          side === "right" ? "md:col-start-2" : "md:col-start-1 md:text-right"
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-abyss-line bg-abyss p-6 transition-colors duration-500 hover:border-pulse/50 md:p-8">
          {/* Giant ghosted year in the corner */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -top-6 select-none font-display-3 text-[7rem] font-bold leading-none text-frost/[0.04] md:text-[9rem] ${
              side === "right" ? "-right-3" : "-left-3"
            }`}
          >
            {isPresent ? "24" : startYear.slice(2)}
          </span>

          <div className={`relative flex flex-col ${side === "left" ? "md:items-end" : ""}`}>
            <div className={`flex items-center gap-3 ${side === "left" ? "md:flex-row-reverse" : ""}`}>
              <span className="font-mono text-sm font-bold text-pulse">{job.index}</span>
              <span className="rounded-full border border-abyss-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-frost-dim">
                {startYear} → {endYear}
              </span>
            </div>

            <h3 className="mt-4 font-display-3 text-3xl font-bold leading-tight tracking-tight text-frost md:text-4xl">
              {job.role}
            </h3>
            <p className="mt-1.5 font-medium text-pulse-deep">
              {job.company} <span className="text-frost-dim">· {job.location}</span>
            </p>

            <ul className={`mt-6 flex flex-col gap-3 ${side === "left" ? "md:items-end" : ""}`}>
              {job.items.map((item) => (
                <li
                  key={item}
                  className={`flex max-w-md gap-3 text-frost/85 ${
                    side === "left" ? "md:flex-row-reverse md:text-right" : ""
                  }`}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pulse" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ExperienceV3() {
  const spineRef = useRef(null);
  // Track scroll through the timeline; drive the spine fill from it.
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start 60%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const fillHeight = useTransform(fill, [0, 1], ["0%", "100%"]);

  return (
    <section id="Experience" className="bg-abyss-soft py-24 md:py-32">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow-3 text-pulse">Where I've worked</span>
            <h2 className="display-3 mt-4 text-frost text-6xl md:text-8xl">Experience</h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-frost-dim">
            Three years shipping features that move real numbers — load times,
            storage, adoption.
          </p>
        </div>

        {/* Timeline — a live spine you travel down */}
        <div ref={spineRef} className="relative mt-20">
          {/* Rail track (dim) + fill (pulse, scroll-linked) */}
          <div
            className="absolute left-[14px] top-0 h-full w-px bg-abyss-line md:left-1/2 md:-ml-px"
            aria-hidden="true"
          >
            <motion.div className="w-px bg-pulse" style={{ height: fillHeight }} />
          </div>

          {EXPERIENCE.map((job, i) => (
            <TimelineEntry key={job.company} job={job} index={i} />
          ))}

          {/* Terminal cap at the bottom of the spine */}
          <div className="relative flex justify-start md:justify-center">
            <span className="ml-[7px] flex items-center gap-2 md:ml-0">
              <span className="h-2 w-2 rounded-full bg-abyss-line" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-frost-dim md:hidden">
                Started here
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
