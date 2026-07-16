import { useEffect, useState } from "react";
import { NAV_LINKS, RESUME_URL } from "../data";

export default function NavV2() {
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
        scrolled ? "border-b border-void-line bg-void/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="container-px flex items-center justify-between gap-6 py-5">
        <a href="#top" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal" />
          <span className="font-display-2 text-lg font-bold tracking-tight text-cream">
            usman<span className="text-signal">.</span>dev
          </span>
        </a>

        <nav className="flex items-center gap-6 md:gap-8">
          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-xs font-medium uppercase tracking-wider text-cream-dim transition-colors duration-200 hover:text-cream"
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
            className="rounded-full bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-void transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
