import { useEffect, useState } from "react";
import { NAV_LINKS, RESUME_URL, ROLE_TAG } from "../data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-ink/10 bg-paper/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="container-px flex items-center justify-between gap-6 py-4">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-lg font-extrabold tracking-tight text-ink">UY</span>
          <span className="hidden eyebrow text-warm-gray sm:inline">{ROLE_TAG}</span>
        </a>

        <nav className="flex items-center gap-5 md:gap-7">
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-wipe font-mono text-xs font-medium uppercase tracking-wider text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-full border-2 border-ink px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-ink"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-bone">
              Résumé ↗
            </span>
            <span className="absolute inset-0 z-0 origin-bottom scale-y-0 bg-ink transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100" />
          </a>
        </nav>
      </div>
    </header>
  );
}
