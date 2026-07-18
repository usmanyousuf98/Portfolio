// Numbered section label — a lime index, a hairline tick, then the eyebrow.
// Gives the Signal sections an editorial through-line instead of five
// identical eyebrows.
export default function SignalEyebrow({ num, children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-sm font-bold text-signal tabular-nums">{num}</span>
      <span className="h-px w-8 bg-void-line" />
      <span className="eyebrow-2 text-signal">{children}</span>
    </div>
  );
}
