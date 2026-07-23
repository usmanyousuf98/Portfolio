import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

// Animates the numeric part of a metric string ("50%", "3+", "20+") from 0 to
// its target when scrolled into view, preserving any prefix/suffix and decimal
// places. Falls back to the final value instantly under reduced motion, and
// renders plain text for values with no number to count.
export default function CountUpNumber({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  const match = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : "";
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;

  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!match || !inView) return;
    if (reduced) {
      mv.set(target);
      return;
    }
    const controls = animate(mv, target, { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 });
    return () => controls.stop();
  }, [match, inView, reduced, target, mv]);

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
