import { useEffect, useRef } from 'react';
import { LuCheck, LuX } from 'react-icons/lu';

/** On/off switch built on a native checkbox (keyboard + screen reader for free). */
export const Switch = ({ checked, onChange, label }) => (
  <label className="flex h-8 cursor-pointer items-center justify-between gap-3 text-[13.5px] text-ink">
    {label}
    <span className="relative inline-flex">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span className="h-[18px] w-8 rounded-full bg-[#3d3d3d] transition-colors duration-150 peer-checked:bg-[#2f7fd0] peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-raised" />
      <span className="absolute left-[3px] top-[3px] h-3 w-3 rounded-full bg-white transition-transform duration-150 peer-checked:translate-x-[14px]" />
    </span>
  </label>
);

/** Checkbox with label. */
export const Checkbox = ({ checked, onChange, label }) => (
  <label className="flex cursor-pointer items-center gap-2 text-[13.5px] text-ink-2">
    <span className="relative inline-flex">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer h-4 w-4 cursor-pointer appearance-none rounded-[2px] border border-line-strong bg-[#161616] checked:border-[#2f7fd0] checked:bg-[#2f7fd0] focus-visible:outline-2 focus-visible:outline-accent"
      />
      <LuCheck className="pointer-events-none absolute left-0.5 top-0.5 h-3 w-3 text-white opacity-0 peer-checked:opacity-100" />
    </span>
    {label}
  </label>
);

/** Single-choice segmented control (radio group). */
export const Segmented = ({ value, onChange, options, label }) => (
  <div role="radiogroup" aria-label={label} className="flex w-full rounded-[3px] border border-line-strong bg-[#161616] p-0.5">
    {options.map((o) => {
      const active = o.value === value;
      return (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(o.value)}
          className={`h-7 flex-1 rounded-[2px] text-[13px] font-medium transition-colors duration-150 ${
            active ? 'bg-[#333] text-ink' : 'text-ink-2 hover:text-ink'
          }`}
        >
          {o.label}
        </button>
      );
    })}
  </div>
);

/** Native range input with a filled track. */
export const Slider = ({ value, min = 0, max = 100, step = 1, onChange, label }) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      aria-label={label}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className="psv-range flex-1"
      style={{ '--fill': `${pct}%` }}
    />
  );
};

/** Modal built on the native <dialog> element (focus trap, Esc, backdrop). */
export const Dialog = ({ open, onClose, title, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="w-[min(400px,calc(100vw-32px))] rounded-[6px] border border-line-strong bg-raised p-0 text-ink shadow-[0_24px_48px_-12px_rgb(0_0_0/0.6)] backdrop:bg-black/60"
    >
      <div className="relative flex flex-col gap-3 p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-[3px] text-ink-2 hover:bg-raised-2 hover:text-ink"
        >
          <LuX className="h-4 w-4" />
        </button>
        <h2 className="pr-8 text-[18px] font-medium">{title}</h2>
        {children}
      </div>
    </dialog>
  );
};

/** Bottom toast; parent controls `message` and clears it. */
export const Toast = ({ message, onDone, duration = 2500 }) => {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, duration);
    return () => clearTimeout(t);
  }, [message, onDone, duration]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      {message && (
        <div className="psv-toast rounded-[4px] border border-line-strong bg-[#2b2b2b] px-4 py-2.5 text-[13.5px] text-ink shadow-[0_12px_24px_-8px_rgb(0_0_0/0.6)]">
          {message}
        </div>
      )}
    </div>
  );
};
