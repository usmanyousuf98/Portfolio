import { useEffect, useState } from "react";
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

export default function FooterV2() {
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
    "w-full rounded-lg border border-void-line bg-void px-4 py-3 text-cream placeholder:text-cream-dim/60 focus:border-signal focus:outline-none";

  return (
    <>
      <section id="Contact" className="bg-void-soft py-24 md:py-32">
        <div className="container-px grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <span className="eyebrow-2 text-signal">Contact</span>
              <h2 className="display-2 mt-4 text-cream text-6xl md:text-8xl">Let's talk.</h2>
              <p className="mt-6 max-w-md text-lg leading-snug text-cream-dim">
                Have a role or project in mind? I reply within a day.
              </p>
            </div>

            <div className="font-mono text-sm uppercase tracking-wide text-cream/90">
              <a
                href={`mailto:${EMAIL}`}
                className="block w-fit text-cream underline decoration-void-line decoration-2 underline-offset-4 transition-colors hover:decoration-signal"
              >
                {EMAIL}
              </a>
              <span className="mt-1 block text-cream-dim">{PHONE}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-void-line bg-void p-7 md:p-9">
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
                className="rounded-lg bg-signal px-6 py-4 font-mono text-sm font-bold uppercase tracking-wider text-void transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                Send message →
              </button>
            </form>
          </div>
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
                <span className="font-mono text-cream/80">{time}</span>
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
