// Full-bleed scrolling band — the "alive" element the section stack was
// missing. Big outlined+solid type ticks past with lime star separators.
const ITEMS = [
  "Full-Stack Development",
  "React & React Native",
  "Node.js APIs",
  "Python & ML",
  "Performance",
  "System Design",
  "Shipping in Production",
];

function Row() {
  return (
    <ul className="marquee-track flex shrink-0 items-center gap-8 pr-8">
      {ITEMS.map((item, i) => (
        <li key={i} className="flex shrink-0 items-center gap-8">
          <span className="font-display-2 text-3xl font-bold tracking-tight text-cream md:text-5xl">
            {item}
          </span>
          <span className="text-2xl text-signal md:text-4xl">✦</span>
        </li>
      ))}
    </ul>
  );
}

export default function MarqueeV2() {
  return (
    <div
      aria-hidden="true"
      className="marquee flex overflow-hidden border-y border-void-line bg-void py-6 md:py-8"
    >
      {/* Two identical tracks so the loop is seamless. */}
      <Row />
      <Row />
    </div>
  );
}
