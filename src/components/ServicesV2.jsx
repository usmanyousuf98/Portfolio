import { motion } from "framer-motion";
import { SERVICES } from "../data";
import SignalEyebrow from "./SignalEyebrow";

export default function ServicesV2() {
  return (
    <section id="Services" className="bg-void py-24 md:py-32">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SignalEyebrow num="02">What I do</SignalEyebrow>
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
              className="group grid grid-cols-1 gap-6 border-b border-void-line px-0 py-9 transition-all duration-300 hover:bg-void-soft md:grid-cols-12 md:gap-8 md:py-11 md:hover:px-6"
            >
              <div className="flex items-center gap-5 md:col-span-4">
                <span className="font-mono text-2xl font-bold text-void-line transition-colors duration-300 group-hover:text-signal md:text-3xl">
                  {service.index}
                </span>
                <h3 className="flex items-center gap-2 font-display-2 text-2xl font-bold tracking-tight text-cream md:text-3xl">
                  {service.title}
                  <span className="text-signal opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
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
