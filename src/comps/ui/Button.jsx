const VARIANTS = {
  solid: 'bg-[#2f7fd0] text-white hover:bg-[#3b8fe0] active:bg-[#2a70b8]',
  soft: 'bg-raised-2 text-ink hover:bg-[#333] active:bg-[#383838]',
  outline: 'border border-line-strong bg-[#161616] text-ink hover:border-[#555] hover:bg-raised-2',
  ghost: 'text-[#c9c9c9] hover:bg-raised-2 hover:text-ink',
  link: 'text-[#9cc8f2] hover:bg-[rgba(59,143,224,0.12)]',
  danger: 'bg-[rgba(216,67,59,0.16)] text-[#f2a19c] hover:bg-[rgba(216,67,59,0.26)]',
};

const base =
  'inline-flex shrink-0 select-none items-center justify-center gap-1.5 rounded-[3px] text-[13.5px] font-medium ' +
  'transition-colors duration-150 active:translate-y-px ' +
  'disabled:pointer-events-none disabled:opacity-40 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0';

/**
 * Console button. Pass `href` to render a link, `icon` for a square icon-only button.
 */
const Button = ({ variant = 'solid', icon = false, href, className = '', children, ...props }) => {
  const size = icon ? 'h-8 w-8' : 'h-8 px-3';
  const cls = `${base} ${size} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
};

export default Button;
