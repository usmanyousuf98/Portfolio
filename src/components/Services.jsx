import { motion } from "framer-motion";
import { SERVICES } from "../data";

export default function Services() {
  return (
    <section id="Services" className="bg-paper py-20 md:py-28">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-accent">(What I do)</span>
            <h2 className="display mt-4 text-ink text-6xl md:text-8xl">
              Services
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-warm-gray">
            I turn ideas into fast, reliable full-stack products — built to work
            in the real world and scale.
          </p>
        </div>

        <div className="mt-14 border-t-2 border-ink">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group grid grid-cols-1 gap-6 border-b-2 border-ink py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <div className="flex items-center gap-5 md:col-span-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-accent font-mono text-lg font-bold text-bone transition-colors duration-300 group-hover:bg-coral">
                  {service.index}
                </span>
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
                  {service.title}
                </h3>
              </div>

              <p className="max-w-md text-warm-gray md:col-span-5">
                {service.description}
              </p>

              <ul className="flex flex-col gap-2 md:col-span-3">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-xs uppercase tracking-wide text-ink"
                  >
                    <span className="text-coral">/</span> {item}
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
