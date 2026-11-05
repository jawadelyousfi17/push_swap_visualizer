import { LuStar, LuBug } from 'react-icons/lu';
import { Si42 } from 'react-icons/si';
import Button from './ui/Button';

const REPO = 'https://github.com/jawadelyousfi17/push_swap_visualizer';

const GEAR =
  'M17.42 5.19 L19.19 2.16 L23.52 3.96 L22.64 7.35 L24.65 9.36 L28.04 8.48 L29.84 12.81 L26.81 14.58 L26.81 17.42 L29.84 19.19 L28.04 23.52 L24.65 22.64 L22.64 24.65 L23.52 28.04 L19.19 29.84 L17.42 26.81 L14.58 26.81 L12.81 29.84 L8.48 28.04 L9.36 24.65 L7.35 22.64 L3.96 23.52 L2.16 19.19 L5.19 17.42 L5.19 14.58 L2.16 12.81 L3.96 8.48 L7.35 9.36 L9.36 7.35 L8.48 3.96 L12.81 2.16 L14.58 5.19 Z';

/** Gear with an angular P cut out and a jaw slot: same mark as the favicon. */
const Mark = () => (
  <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
    <path d={GEAR} fill="var(--ink)" />
    <path
      d="M9.4 24.2 L13.6 9.6 L19.6 9.6 L22.2 13.4 L19.6 17.2 L14.3 17.2"
      fill="none"
      stroke="var(--sunk)"
      strokeWidth="2.6"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
    />
    <path d="M22.4 13.4 L31 11.9 L31 14.9 Z" fill="var(--sunk)" />
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
