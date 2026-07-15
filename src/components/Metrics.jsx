import { motion } from "framer-motion";

const METRICS = [
  { value: "3+", label: "Years shipping production" },
  { value: "20+", label: "Projects delivered" },
  { value: "50%", label: "Faster mobile load times" },
  { value: "20%", label: "Higher user adoption" },
];

export default function Metrics() {
  return (
    <div className="border-y-2 border-ink bg-ink text-bone">
      <div className="container-px grid grid-cols-2 gap-x-8 gap-y-10 py-10 md:grid-cols-4 md:py-12">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col gap-1.5"
          >
            <span className="font-display text-5xl font-extrabold tracking-tight text-bone md:text-6xl">
              {m.value}
            </span>
            <span className="font-mono text-[11px] uppercase leading-snug tracking-wider text-bone/55">
              {m.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
