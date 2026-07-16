import { motion } from "framer-motion";
import { METRICS } from "../data";

export default function MetricsV2() {
  return (
    <div className="border-y border-void-line bg-void-soft">
      <div className="container-px grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-4 md:py-14">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col gap-1.5"
          >
            <span className="font-display-2 text-5xl font-bold tracking-tight text-signal md:text-6xl">
              {m.value}
            </span>
            <span className="font-mono text-[11px] uppercase leading-snug tracking-wider text-cream-dim">
              {m.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
