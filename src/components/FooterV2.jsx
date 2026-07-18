import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { EMAIL, NAV_LINKS, PHONE, RESUME_URL, SOCIAL_LINKS } from "../data";
import SignalEyebrow from "./SignalEyebrow";

const ease = [0.22, 1, 0.36, 1];

// Only render social links that actually point somewhere real.
const liveSocials = SOCIAL_LINKS.filter((s) => s.href && s.href !== "#");

const fieldVariant = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

// A floating-label field: the label rides up and turns lime on focus/fill, and
// a lime underline draws in while focused.
function Field({ label, name, type = "text", textarea = false }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const base =
    "peer w-full bg-transparent pt-6 pb-2 text-cream focus:outline-none";
  const shared = {
    name,
    required: true,
    value,
    onChange: (e) => setValue(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
  return (
    <motion.div variants={fieldVariant} className="relative">
      {textarea ? (
        <textarea {...shared} rows={4} className={`${base} resize-none`} />
      ) : (
        <input {...shared} type={type} className={base} />
      )}
      <label
        className={`pointer-events-none absolute left-0 font-mono uppercase tracking-wider transition-all duration-300 ${
          active ? "top-0 text-[10px] text-signal" : "top-6 text-sm text-cream-dim"
        }`}
      >
        {label}
      </label>
      <span className="absolute bottom-0 left-0 h-px w-full bg-void-line" />
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-signal"
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

export default function FooterV2() {
  const time = useLocalTime();
  const reduced = useReducedMotion();
  const [sent, setSent] = useState(false);

  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${mx}px ${my}px, rgba(212,255,63,0.08), transparent 45%)`;
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
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const headWord = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, filter: "blur(10px)", y: 8 }, show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.6, ease } } };

  return (
    <>
      <section id="Contact" className="bg-void-soft py-20 md:py-24">
        <div className="container-px">
          <motion.div
            onMouseMove={onMove}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="relative overflow-hidden rounded-3xl border border-void-line bg-void p-6 md:p-10"
          >
            {/* Cursor spotlight */}
            <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
            {/* Faint engineered grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #f4f4ef 1px, transparent 1px), linear-gradient(to bottom, #f4f4ef 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />

            <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <SignalEyebrow num="05">Contact</SignalEyebrow>
                  <motion.h2
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-20%" }}
                    className="display-2 mt-4 text-cream text-5xl md:text-7xl"
                  >
                    <motion.span variants={headWord} className="inline-block">Let's&nbsp;</motion.span>
                    <motion.span variants={headWord} className="inline-block">
                      talk<span className="text-signal">.</span>
                    </motion.span>
                  </motion.h2>
                  <p className="mt-6 max-w-md text-lg leading-snug text-cream-dim">
                    Have a role or project in mind? I reply within a day.
                  </p>
                </div>

                <div className="font-mono text-sm">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group inline-flex items-center gap-2 text-cream transition-colors hover:text-signal"
                  >
                    <span className="underline decoration-void-line decoration-2 underline-offset-4 transition-colors group-hover:decoration-signal">
                      {EMAIL}
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                  <span className="mt-2 block uppercase tracking-wide text-cream-dim">{PHONE}</span>
                </div>
              </div>

              <motion.form
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="flex flex-col gap-7"
                onSubmit={handleSubmit}
              >
                <Field label="Your name" name="name" />
                <Field label="Your email address" name="email" type="email" />
                <Field label="Tell me about the role or project" name="message" textarea />
                <motion.button
                  variants={fieldVariant}
                  type="submit"
                  className="group relative mt-1 overflow-hidden rounded-lg bg-signal px-6 py-4 font-mono text-sm font-bold uppercase tracking-wider text-void transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    {sent ? "✓ Opening your mail…" : "Send message"}
                    {!sent && <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>}
                  </span>
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-void-line bg-void-soft py-14">
        <div className="container-px">
          <div className="flex flex-col gap-10 border-b border-void-line pb-10 md:flex-row md:justify-between">
            <a href="#top" className="font-display-2 text-5xl font-bold tracking-tight text-cream md:text-7xl">
              Usman Yousuf<span className="text-signal">.</span>
            </a>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div className="flex flex-col gap-2.5">
                <span className="eyebrow-2 mb-1 text-cream-dim">Menu</span>
                <a href="#top" className="w-fit text-cream/80 transition-colors hover:text-signal">
                  Home
                </a>
                {NAV_LINKS.map((link) => (
                  <a key={link.href} href={link.href} className="w-fit text-cream/80 transition-colors hover:text-signal">
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="eyebrow-2 mb-1 text-cream-dim">Direct</span>
                <a href={`mailto:${EMAIL}`} className="w-fit text-cream/80 transition-colors hover:text-signal">
                  Email
                </a>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit text-cream/80 transition-colors hover:text-signal"
                >
                  Résumé
                </a>
                {liveSocials.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit text-cream/80 transition-colors hover:text-signal"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="eyebrow-2 mb-1 text-cream-dim">Local time</span>
                <span className="flex items-center gap-2 font-mono text-cream/80">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                  </span>
                  {time}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 font-mono text-xs uppercase tracking-wider text-cream-dim sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} Usman Yousuf</span>
            <span>Full-Stack Software Engineer · Karachi</span>
          </div>
        </div>
      </footer>
    </>
  );
}
