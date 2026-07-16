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

export default function FooterV3() {
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
    "w-full rounded-lg border border-abyss-line bg-abyss px-4 py-3 text-frost placeholder:text-frost-dim/60 focus:border-pulse focus:outline-none";

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

      <div className="container-px py-24 md:py-32">
        {/* CTA + form */}
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="flex flex-col gap-8 md:col-span-5">
            <div>
              <span className="eyebrow-3 text-pulse">Contact</span>
              <h2 className="display-3 mt-4 text-frost text-6xl md:text-7xl">Let's talk.</h2>
              <p className="mt-6 max-w-md text-lg leading-snug text-frost-dim">
                Have a role or project in mind? I reply within a day.
              </p>
            </div>

            <div className="font-mono text-sm uppercase tracking-wide">
              <span className="mb-2 block text-xs text-frost-dim/70">Or reach me directly</span>
              <a
                href={`mailto:${EMAIL}`}
                className="block w-fit text-frost underline decoration-abyss-line decoration-2 underline-offset-4 transition-colors hover:decoration-pulse"
              >
                {EMAIL}
              </a>
              <span className="mt-1 block text-frost-dim">{PHONE}</span>
            </div>
          </div>

          <div className="glass rounded-2xl border border-abyss-line p-7 md:col-span-7 md:p-9">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input type="text" name="name" placeholder="Your name" required className={inputClass} />
                <input type="email" name="email" placeholder="Your email address" required className={inputClass} />
              </div>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell me about the role or project"
                required
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                className="rounded-lg bg-pulse px-6 py-4 font-mono text-sm font-bold uppercase tracking-wider text-abyss shadow-[0_0_24px_-6px_rgba(84,224,255,0.7)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                Send message →
              </button>
            </form>
          </div>
        </div>

        {/* Colophon — hairline-separated, same ground */}
        <div className="mt-20 border-t border-abyss-line pt-10 md:mt-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <a
              href="#top"
              className="font-display-3 text-4xl font-bold tracking-tight text-frost md:text-5xl"
            >
              Usman Yousuf<span className="text-pulse">.</span>
            </a>

            <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-frost-dim">
              <a href="#top" className="transition-colors hover:text-pulse">Home</a>
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="transition-colors hover:text-pulse">
                  {link.label}
                </a>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-pulse"
              >
                Résumé
              </a>
              {liveSocials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-pulse"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-8 flex flex-col gap-2 font-mono text-xs uppercase tracking-wider text-frost-dim/70 sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} Usman Yousuf</span>
            <span>Local time · {time}</span>
            <span>Full-Stack Software Engineer · Karachi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
