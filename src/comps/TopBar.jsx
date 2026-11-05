import { LuStar, LuBug } from 'react-icons/lu';
import { Si42 } from 'react-icons/si';
import Button from './ui/Button';

const REPO = 'https://github.com/jawadelyousfi17/push_swap_visualizer';

/** Two stacks of bars: the product's own mark. */
const Mark = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
    <rect x="1" y="3" width="9" height="3" rx="1" fill="var(--op-push)" />
    <rect x="1" y="8" width="5" height="3" rx="1" fill="var(--op-swap)" />
    <rect x="1" y="13" width="7" height="3" rx="1" fill="var(--op-rot)" />
    <rect x="12" y="13" width="9" height="3" rx="1" fill="var(--op-rrot)" />
    <rect x="12" y="18" width="6" height="3" rx="1" fill="var(--ink-3)" />
  </svg>
);

const TopBar = () => (
  <header className="flex h-12 shrink-0 items-center gap-4 bg-sunk px-4">
    <div className="flex items-center gap-2.5">
      <Mark />
      <h1 className="text-[17px] font-medium tracking-tight text-ink">
        push_swap <span className="font-normal text-ink-2">visualizer</span>
      </h1>
    </div>

    <nav className="ml-auto flex items-center gap-1">
      <Button href={REPO} variant="soft">
        <LuStar className="text-[var(--op-swap)]" />
        Star on GitHub
      </Button>
      <Button href={`${REPO}/issues`} variant="ghost" className="max-sm:hidden">
        <LuBug />
        Report a bug
      </Button>
      <Button href="https://profile.intra.42.fr/users/jel-yous" variant="ghost" className="max-md:hidden">
        by jel-yous · 1337
        <Si42 />
      </Button>
    </nav>
  </header>
);

export default TopBar;
