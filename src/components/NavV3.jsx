import { useEffect, useState } from "react";
import { NAV_LINKS, RESUME_URL } from "../data";

export default function NavV3() {
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
        scrolled ? "border-b border-abyss-line bg-abyss/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="container-px flex items-center justify-between gap-6 py-5">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pulse" />
          </span>
          <span className="font-display-3 text-lg font-bold tracking-tight text-frost">
            usman<span className="text-pulse">·</span>dev
          </span>
        </a>

        <nav className="flex items-center gap-6 md:gap-8">
          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-xs font-medium uppercase tracking-wider text-frost-dim transition-colors duration-200 hover:text-frost"
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
            className="rounded-full border border-pulse/40 bg-pulse/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-pulse transition-colors duration-200 hover:bg-pulse hover:text-abyss"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
