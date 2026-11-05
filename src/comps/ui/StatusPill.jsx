const TONES = {
  ok: 'var(--ok)',
  bad: 'var(--bad)',
  idle: 'var(--ink-3)',
  live: 'var(--op-push)',
};

/** Small status pill with a dot, e.g. "Sorted" / "Unsorted". */
const StatusPill = ({ tone = 'idle', children }) => {
  const color = TONES[tone];
  return (
    <span
      className="inline-flex h-[22px] items-center gap-1.5 rounded-full pl-1.5 pr-2.5 text-[12.5px] font-medium text-ink"
      style={{ background: `color-mix(in srgb, ${color} 28%, #1b1b1b)` }}
    >
      <span className="h-3 w-3 rounded-full" style={{ background: color }} />
      {children}
    </span>
  );
};

export default StatusPill;
