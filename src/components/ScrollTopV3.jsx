import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Floating back-to-top. Appears after the first viewport so mobile users
// (who have no persistent nav past the hero) can always get back.
export default function ScrollTopV3() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-pulse text-lg text-abyss shadow-[0_0_20px_-4px_rgba(84,224,255,0.7)] transition-transform hover:scale-90 md:hidden"
        >
          ↑
        </motion.a>
      )}
    </AnimatePresence>
  );
}
