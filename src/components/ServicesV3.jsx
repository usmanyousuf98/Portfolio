import { motion } from "framer-motion";
import { SERVICES } from "../data";

export default function ServicesV3() {
  return (
    <section id="Services" className="bg-abyss py-24 md:py-32">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow-3 text-pulse">What I do</span>
            <h2 className="display-3 mt-4 text-frost text-6xl md:text-8xl">Services</h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-frost-dim">
            I turn ideas into fast, reliable full-stack products — built to
            work in the real world and scale.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col gap-6 rounded-2xl border border-abyss-line bg-abyss-soft p-7 transition-colors duration-300 hover:border-pulse/50 md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-pulse">{service.index}</span>
                <span className="h-8 w-8 rounded-full border border-abyss-line transition-colors duration-300 group-hover:border-pulse group-hover:bg-pulse/10" />
              </div>
              <h3 className="font-display-3 text-2xl font-bold tracking-tight text-frost">
                {service.title}
              </h3>
              <p className="text-frost-dim">{service.description}</p>
              <ul className="mt-auto flex flex-col gap-2 border-t border-abyss-line pt-5">
                {service.items.map((item) => (
                  <li key={item} className="font-mono text-xs uppercase tracking-wide text-frost/80">
                    <span className="text-pulse">/</span> {item}
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
