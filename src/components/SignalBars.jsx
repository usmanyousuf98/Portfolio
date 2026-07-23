// Animated "signal strength" equalizer — a small lime brand motif for the
// Signal template. Bars bounce on a staggered loop; the global reduced-motion
// rule freezes them upright. Decorative, so hidden from assistive tech.
export default function SignalBars({ className = "" }) {
  const delays = [0, 150, 300, 450, 220];
  return (
    <span aria-hidden="true" className={`inline-flex items-end gap-[3px] ${className}`}>
      {delays.map((d, i) => (
        <span
          key={i}
          className="signal-eq-bar w-[3px] rounded-full bg-signal"
          style={{ height: "14px", animationDelay: `${d}ms` }}
        />
      ))}
    </span>
  );
}
