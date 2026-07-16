import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";
const THEMES = { BLOCK: "block", SIGNAL: "signal", ORBIT: "orbit" };

// Cycle order for the switcher and the meta theme-color per template.
const ORDER = [THEMES.BLOCK, THEMES.SIGNAL, THEMES.ORBIT];
const META_COLOR = {
  [THEMES.BLOCK]: "#ECE7DD",
  [THEMES.SIGNAL]: "#0A0A0A",
  [THEMES.ORBIT]: "#060810",
};

const ThemeContext = createContext(null);

function readInitialTheme() {
  if (typeof window === "undefined") return THEMES.BLOCK;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return ORDER.includes(stored) ? stored : THEMES.BLOCK;
  } catch {
    return THEMES.BLOCK;
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    // Block is the default (no attribute); the others set data-theme so the
    // matching base-layer styles in index.css take over.
    if (theme === THEMES.BLOCK) {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", META_COLOR[theme]);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable (private mode, quota) — theme still
      // works for this session, it just won't persist across reloads.
    }
  }, [theme]);

  const cycleTheme = () =>
    setTheme((current) => {
      const idx = ORDER.indexOf(current);
      return ORDER[(idx + 1) % ORDER.length];
    });

  const value = {
    theme,
    cycleTheme,
    setTheme,
    order: ORDER,
    isBlock: theme === THEMES.BLOCK,
    isSignal: theme === THEMES.SIGNAL,
    isOrbit: theme === THEMES.ORBIT,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

export { THEMES };
