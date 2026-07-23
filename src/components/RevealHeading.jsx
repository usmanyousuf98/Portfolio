import { motion } from "framer-motion";

// Masked "rise" reveal for the big section headings: the text slides up from
// behind a clipping edge as the section scrolls into view. The extra bottom
// padding keeps descenders/accents from being shaved by overflow-hidden.
//
// The in-view trigger lives on the STATIC outer span, and the transform runs
// on an inner child via variants. If whileInView is put on the transformed
// element itself, IntersectionObserver watches its displaced (y:115%) box and
// can fail to fire — leaving the heading permanently hidden on anchor jumps.
//
// Under prefers-reduced-motion (MotionConfig reducedMotion="user") the
// transform is skipped and the heading simply appears.
export default function RevealHeading({ children, className }) {
  return (
    <motion.span
      className={`block overflow-hidden pb-[0.1em] ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "115%" }, show: { y: 0 } }}
        transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
