const fieldBase =
  'w-full rounded-[3px] border border-line-strong bg-[#161616] text-[13.5px] text-ink placeholder:text-ink-3 ' +
  'transition-colors duration-150 hover:border-[#4d4d4d] focus:border-accent focus:outline-none ' +
  'focus:ring-1 focus:ring-accent';

export const Input = ({ className = '', ...props }) => (
  <input className={`${fieldBase} h-8 px-2.5 ${className}`} {...props} />
);

export const Textarea = ({ className = '', ...props }) => (
  <textarea className={`${fieldBase} resize-none px-2.5 py-2 ${className}`} spellCheck={false} {...props} />
);
