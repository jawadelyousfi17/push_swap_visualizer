import { familyOf } from '../../utils/opFamilies';

/** Operation badge in the console's pill style: tinted body, solid status dot. */
const OpPill = ({ op, className = '' }) => {
  const family = familyOf(op);
  const color = family ? family.color : 'var(--ink-3)';
  const valid = Boolean(family);

  return (
    <span
      className={`inline-flex h-[22px] min-w-[64px] items-center gap-1.5 rounded-full pl-1.5 pr-2.5 font-mono text-[12.5px] font-medium ${className}`}
      style={{
        background: `color-mix(in srgb, ${color} ${valid ? 30 : 14}%, #1b1b1b)`,
        color: valid ? '#f2f2f2' : 'var(--ink-2)',
      }}
    >
      <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: color }} />
      {op.trim() || '—'}
    </span>
  );
};

export default OpPill;
