import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { EMAIL, NAV_LINKS, PHONE, RESUME_URL, SOCIAL_LINKS } from "../data";

const ease = [0.22, 1, 0.36, 1];

// Only render social links that actually point somewhere real.
const liveSocials = SOCIAL_LINKS.filter((s) => s.href && s.href !== "#");

const fieldVariant = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

// A floating-label field: the label rides up and turns pulse on focus/fill, and
// a pulse underline draws in while focused.
function Field({ label, name, type = "text", textarea = false, className = "" }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const base = "peer w-full bg-transparent pt-6 pb-2 text-frost focus:outline-none";
  const shared = {
    name,
    required: true,
    value,
    onChange: (e) => setValue(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
  return (
    <motion.div variants={fieldVariant} className={`relative ${className}`}>
      {textarea ? (
        <textarea {...shared} rows={4} className={`${base} resize-none`} />
      ) : (
        <input {...shared} type={type} className={base} />
      )}
      <label
        className={`pointer-events-none absolute left-0 font-mono uppercase tracking-wider transition-all duration-300 ${
          active ? "top-0 text-[10px] text-pulse" : "top-6 text-sm text-frost-dim"
        }`}
      >
        {label}
      </label>
      <span className="absolute bottom-0 left-0 h-px w-full bg-abyss-line" />
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-pulse"
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease }}
      />
    </motion.div>
  );
}

// Live clock in Usman's timezone (Karachi) — ticks every second so it reads
// as a real, running clock rather than a static timestamp.
function useLocalTime() {
  const [time, setTime] = useState("—");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date()
          .toLocaleTimeString("en-US", {
            timeZone: "Asia/Karachi",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
          .toUpperCase()
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function FooterV3() {
  const time = useLocalTime();
  const reduced = useReducedMotion();
  const [sent, setSent] = useState(false);

  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${mx}px ${my}px, rgba(84,224,255,0.10), transparent 45%)`;
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  // No backend: compose a prefilled email in the visitor's mail client.
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") || "").toString().trim();
    const from = (data.get("email") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();
    const subject = `Portfolio enquiry from ${name || "someone"}`;
    const body = `${message}\n\n— ${name}${from ? ` (${from})` : ""}`;
    setSent(true);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const headWord = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, filter: "blur(10px)", y: 8 }, show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.6, ease } } };

  // Contact CTA and site colophon are one section — a single dark ground so
  // they read as one footer instead of two stacked blocks.
  return (
    <footer id="Contact" className="relative overflow-hidden bg-abyss">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(84,224,255,0.6), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(84,224,255,0.10), transparent 70%)" }}
      />

      <div className="container-px py-20 md:py-24">
        {/* CTA + form — one interactive spotlight panel */}
        <motion.div
          onMouseMove={onMove}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="glass relative overflow-hidden rounded-3xl border border-abyss-line p-6 md:p-10"
        >
          <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #eef1fa 1px, transparent 1px), linear-gradient(to bottom, #eef1fa 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-16">
            <div className="flex flex-col gap-8 md:col-span-5">
              <div>
                <span className="eyebrow-3 text-pulse">Contact</span>
                <motion.h2
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-20%" }}
                  className="display-3 mt-4 text-frost text-5xl md:text-7xl"
                >
                  <motion.span variants={headWord} className="inline-block">Let's&nbsp;</motion.span>
                  <motion.span variants={headWord} className="inline-block">
                    talk<span className="text-pulse">.</span>
                  </motion.span>
                </motion.h2>
                <p className="mt-6 max-w-md text-lg leading-snug text-frost-dim">
                  Have a role or project in mind? I reply within a day.
                </p>
              </div>

              <div className="font-mono text-sm">
                <span className="mb-2 block text-xs uppercase tracking-wide text-frost-dim/70">Or reach me directly</span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-2 text-frost transition-colors hover:text-pulse"
                >
                  <span className="underline decoration-abyss-line decoration-2 underline-offset-4 transition-colors group-hover:decoration-pulse">
                    {EMAIL}
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <span className="mt-2 block uppercase tracking-wide text-frost-dim">{PHONE}</span>
              </div>
            </div>

            <motion.form
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 md:col-span-7"
              onSubmit={handleSubmit}
            >
              <Field label="Your name" name="name" />
              <Field label="Your email address" name="email" type="email" />
              <Field label="Tell me about the role or project" name="message" textarea className="sm:col-span-2" />
              <motion.button
                variants={fieldVariant}
                type="submit"
                className="group relative mt-1 overflow-hidden rounded-lg bg-pulse px-6 py-4 font-mono text-sm font-bold uppercase tracking-wider text-abyss shadow-[0_0_24px_-6px_rgba(84,224,255,0.7)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] sm:col-span-2"
              >
                <span className="flex items-center justify-center gap-2">
                  {sent ? "✓ Opening your mail…" : "Send message"}
                  {!sent && <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>}
                </span>
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        {/* Colophon — hairline-separated, same ground */}
        <div className="mt-16 border-t border-abyss-line pt-10 md:mt-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <a href="#top" className="font-display-3 text-4xl font-bold tracking-tight text-frost md:text-5xl">
              Usman Yousuf<span className="text-pulse">.</span>
            </a>

            <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-frost-dim">
              <a href="#top" className="transition-colors hover:text-pulse">Home</a>
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="transition-colors hover:text-pulse">
                  {link.label}
                </a>
              ))}
              <a href={RESUME_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-pulse">
                Résumé
              </a>
              {liveSocials.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-pulse">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-8 flex flex-col gap-2 font-mono text-xs uppercase tracking-wider text-frost-dim/70 sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} Usman Yousuf</span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pulse" />
              </span>
              Local time · {time}
            </span>
            <span>Full-Stack Software Engineer · Karachi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
