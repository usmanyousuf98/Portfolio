import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EMAIL, NAV_LINKS, PHONE, RESUME_URL, SOCIAL_LINKS } from "../data";

// Only render social links that actually point somewhere real.
const liveSocials = SOCIAL_LINKS.filter((s) => s.href && s.href !== "#");

function useLocalTime() {
  const [time, setTime] = useState("—");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date()
          .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
          .toUpperCase()
      );
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const time = useLocalTime();

  // No backend: compose a prefilled email in the visitor's mail client.
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") || "").toString().trim();
    const from = (data.get("email") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();
    const subject = `Portfolio enquiry from ${name || "someone"}`;
    const body = `${message}\n\n— ${name}${from ? ` (${from})` : ""}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const inputClass =
    "w-full border-2 border-bone/25 bg-transparent px-4 py-3 text-bone placeholder:text-bone/40 focus:border-coral focus:outline-none";

  return (
    <>
      {/* Contact — ink block (calm, professional) */}
      <section id="Contact" className="bg-ink py-20 text-bone md:py-28">
        <div className="container-px grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <span className="eyebrow text-coral">(Contact)</span>
              <h2 className="display mt-4 text-bone text-6xl md:text-8xl">
                Let's talk.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-snug text-bone/60">
                Have a role or project in mind? I reply within a day.
              </p>
            </div>

            <div className="font-mono text-sm uppercase tracking-wide text-bone/80">
              <a href={`mailto:${EMAIL}`} className="link-wipe block w-fit text-bone">
                {EMAIL}
              </a>
              <span className="mt-1 block text-bone/60">{PHONE}</span>
            </div>
          </div>

          {/* Form panel — hairline border on the ink ground */}
          <div className="border border-bone/15 p-7 md:p-9">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your name" required className={inputClass} />
              <input type="email" name="email" placeholder="Your email address" required className={inputClass} />
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about the role or project"
                required
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                className="group relative overflow-hidden bg-coral px-6 py-4 font-mono text-sm font-bold uppercase tracking-wider text-bone"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
                  Send message →
                </span>
                <span className="absolute inset-0 z-0 origin-left scale-x-0 bg-bone transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer — ink block */}
      <footer className="border-t border-bone/15 bg-ink py-14 text-bone">
        <div className="container-px">
          <div className="flex flex-col gap-10 border-b border-bone/20 pb-10 md:flex-row md:justify-between">
            <a href="#top" className="font-display text-5xl font-extrabold tracking-tight text-bone md:text-7xl">
              Usman Yousuf<span className="text-coral">.</span>
            </a>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div className="flex flex-col gap-2.5">
                <span className="eyebrow mb-1 text-bone/50">Menu</span>
                <a href="#top" className="link-wipe w-fit text-bone/80">Home</a>
                {NAV_LINKS.map((link) => (
                  <a key={link.href} href={link.href} className="link-wipe w-fit text-bone/80">
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="eyebrow mb-1 text-bone/50">Direct</span>
                <a href={`mailto:${EMAIL}`} className="link-wipe w-fit text-bone/80">Email</a>
                <a href={RESUME_URL} target="_blank" rel="noreferrer" className="link-wipe w-fit text-bone/80">
                  Résumé
                </a>
                {liveSocials.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="link-wipe w-fit text-bone/80">
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="eyebrow mb-1 text-bone/50">Local time</span>
                <span className="font-mono text-bone/80">{time}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 font-mono text-xs uppercase tracking-wider text-bone/50 sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} Usman Yousuf</span>
            <span>Full-Stack Software Engineer · Karachi</span>
          </div>
        </div>
      </footer>
    </>
  );
}
