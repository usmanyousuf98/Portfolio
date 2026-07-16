import { motion } from "framer-motion";
import { SERVICES } from "../data";

export default function ServicesV2() {
  return (
    <section id="Services" className="bg-void py-24 md:py-32">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow-2 text-signal">What I do</span>
            <h2 className="display-2 mt-4 text-cream text-6xl md:text-8xl">Services</h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-cream-dim">
            I turn ideas into fast, reliable full-stack products — built to
            work in the real world and scale.
          </p>
        </div>

        <div className="mt-16 border-t border-void-line">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group grid grid-cols-1 gap-6 border-b border-void-line py-9 transition-colors duration-300 hover:bg-void-soft md:grid-cols-12 md:gap-8 md:py-11"
            >
              <div className="flex items-center gap-5 md:col-span-4">
                <span className="font-mono text-sm font-bold text-signal">
                  {service.index}
                </span>
                <h3 className="font-display-2 text-2xl font-bold tracking-tight text-cream md:text-3xl">
                  {service.title}
                </h3>
              </div>

              <p className="max-w-md text-cream-dim md:col-span-5">{service.description}</p>

              <ul className="flex flex-col gap-2 md:col-span-3">
                {service.items.map((item) => (
                  <li key={item} className="font-mono text-xs uppercase tracking-wide text-cream/80">
                    <span className="text-signal">/</span> {item}
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
