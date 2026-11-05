import { useId, useState } from 'react';
import { LuChevronDown, LuChevronRight } from 'react-icons/lu';

/** Collapsible sidebar block with an uppercase header, as in the console's left rail. */
const SidebarSection = ({ title, defaultOpen = true, aside, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <section className="bg-raised">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="label-caps flex h-10 w-full items-center gap-2 px-3 text-left text-ink transition-colors duration-150 hover:bg-raised-2"
      >
        {open ? <LuChevronDown className="h-4 w-4 text-ink-2" /> : <LuChevronRight className="h-4 w-4 text-ink-2" />}
        <span className="flex-1">{title}</span>
        {aside}
      </button>
      {open && (
        <div id={id} className="px-3 pb-3.5 pt-1">
          {children}
        </div>
      )}
    </section>
  );
};

export default SidebarSection;
