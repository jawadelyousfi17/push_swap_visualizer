import { useState } from 'react';
import Button from './ui/Button';
import { Input, Textarea } from './ui/Field';
import { Switch, Segmented } from './ui/Controls';
import { LuCopy, LuShuffle, LuArrowDownToLine, LuTerminal } from 'react-icons/lu';

import SidebarSection from './ui/SidebarSection';
import StatusPill from './ui/StatusPill';
import { generateUniqueRandomNumbers, generateRandomNumbers, getPermutations } from '../utils/arrayUtils';

export const parseNumbers = (text) =>
  text
    .split(/\s+/)
    .map((el) => parseInt(el))
    .filter((el) => !isNaN(el))
    .filter((el, i, self) => self.indexOf(el) === i);

const COLOR_THEMES = [
  { value: 'default', label: 'Heat', swatch: 'linear-gradient(90deg,#ffd000,#ff2a00)' },
  { value: 'red', label: 'Red', swatch: 'hsl(10,90%,50%)' },
  { value: 'green', label: 'Green', swatch: 'hsl(120,90%,40%)' },
  { value: 'blue', label: 'Blue', swatch: 'hsl(220,90%,55%)' },
  { value: 'rebecca', label: 'Rebecca purple', swatch: 'hsl(270,90%,60%)' },
];

const Row = ({ label, mono = true, children }) => (
  <div className="flex h-8 items-center justify-between gap-3 text-[13.5px]">
    <span className="text-ink-2">{label}</span>
    <span className={mono ? 'tnum font-mono text-ink' : ''}>{children}</span>
  </div>
);

const Summary = ({ total, sizeA, sizeB, instructionCount, sorted }) => {
  let pill = <StatusPill tone="idle">No input</StatusPill>;
  if (total > 0) pill = sorted ? <StatusPill tone="ok">Sorted</StatusPill> : <StatusPill tone="bad">Unsorted</StatusPill>;

  return (
    <SidebarSection title="Summary">
      <Row label="State" mono={false}>{pill}</Row>
      <Row label="Numbers">{total}</Row>
      <Row label="Stack A / B">{sizeA} / {sizeB}</Row>
      <Row label="Instructions">{instructionCount}</Row>
    </SidebarSection>
  );
};

const Generate = ({ numbers, setNumbers, applyNumbers, notify }) => {
  const [count, setCount] = useState('');

  const generate = () => {
    const unique = generateUniqueRandomNumbers(count, 50000);
    const text = unique.join(' ');
    setNumbers(text);
    applyNumbers(text);
  };

  const copyCommand = () => {
    navigator.clipboard.writeText('./push_swap ' + numbers + ' | pbcopy ');
    notify('push_swap command copied');
  };

  return (
    <SidebarSection title="Generate">
      <label htmlFor="psv-count" className="mb-1.5 block text-[13px] text-ink-2">
        How many numbers
      </label>
      <div className="flex gap-2">
        <Input
          id="psv-count"
          type="number"
          min={1}
          placeholder="e.g. 100"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
          className="tnum flex-1 font-mono"
        />
        <Button onClick={generate} disabled={!count}>
          <LuShuffle />
          Random
        </Button>
      </div>

      <label htmlFor="psv-numbers" className="mb-1.5 mt-4 block text-[13px] text-ink-2">
        Numbers
      </label>
      <Textarea
        id="psv-numbers"
        rows={4}
        placeholder="Paste numbers separated by spaces"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
        className="tnum font-mono !text-[12.5px] leading-5"
      />
      <div className="mt-2 flex gap-2">
        <Button variant="soft" className="flex-1" disabled={!numbers.trim()} onClick={() => applyNumbers(numbers)}>
          <LuArrowDownToLine />
          Load into stack A
        </Button>
        <Button variant="soft" disabled={!numbers.trim()} onClick={copyCommand} title="Copy ./push_swap command">
          <LuCopy />
          Copy
        </Button>
      </div>
    </SidebarSection>
  );
};

const Display = ({ styleE, setStyle, showIndxes, setShowindexes, theme, setTheme }) => (
  <SidebarSection title="Display">
    <p className="mb-1.5 text-[13px] text-ink-2">Bars</p>
    <Segmented
      label="Bar style"
      value={styleE}
      onChange={setStyle}
      options={[
        { value: 'small bars', label: 'Thin' },
        { value: 'big bars', label: 'Wide' },
        { value: 'big bars + labels', label: 'Labels' },
      ]}
    />

    <div className="mt-3">
      <Switch label="Label with rank instead of value" checked={showIndxes} onChange={setShowindexes} />
    </div>

    <p className="mb-1 mt-3 text-[13px] text-ink-2">Color</p>
    <ul role="radiogroup" aria-label="Bar color" className="-mx-1.5">
      {COLOR_THEMES.map((t) => {
        const active = theme === t.value;
        return (
          <li key={t.value}>
            <button
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setTheme(t.value)}
              className={`flex h-8 w-full items-center gap-2.5 rounded-sm px-1.5 text-left text-[13.5px] tracking-wide transition-colors duration-150 ${
                active ? 'bg-[#333] text-ink' : 'text-ink-2 hover:bg-raised-2 hover:text-ink'
              }`}
            >
              <span className="h-3.5 w-3.5 rounded-full" style={{ background: t.swatch }} />
              {t.label}
            </button>
          </li>
        );
      })}
    </ul>
  </SidebarSection>
);

const Benchmark = ({ notify }) => {
  const copyRandom = (n) => {
    const items = generateRandomNumbers(n, -100000, 1000000);
    navigator.clipboard.writeText(
      `arg="${items.join(' ')}";./push_swap $arg | ./checker_MAC $arg; echo "In :";./push_swap $arg | wc -l`
    );
    notify(`Benchmark command for ${n} numbers copied`);
  };

  const copyFive = () => {
    const permutations = getPermutations([0, 1, 2, 3, 4]);
    const commands = permutations
      .slice(0, 100)
      .map((p) => `arg="${p.join(' ')}"; ./push_swap $arg | ./checker_MAC;./push_swap $arg | wc -l`);
    navigator.clipboard.writeText(commands.join(';'));
    notify('5-number permutation commands copied');
  };

  const rows = [
    { label: '100 random numbers', run: () => copyRandom(100) },
    { label: '500 random numbers', run: () => copyRandom(500) },
    { label: 'All 5-number permutations', run: copyFive },
  ];

  return (
    <SidebarSection title="Benchmark" defaultOpen={false}>
      <p className="mb-2 text-[13px] leading-snug text-ink-2">
        Copies a shell one-liner that runs push_swap through checker_MAC and counts the moves.
      </p>
      {rows.map((r) => (
        <div key={r.label} className="flex h-9 items-center justify-between gap-2 text-[13.5px]">
          <span className="flex items-center gap-2 text-ink">
            <LuTerminal className="text-ink-3" />
            {r.label}
          </span>
          <Button variant="link" onClick={r.run}>
            <LuCopy />
            Copy
          </Button>
        </div>
      ))}
    </SidebarSection>
  );
};

const Sidebar = (props) => (
  <aside className="flex min-h-0 flex-col gap-2 overflow-y-auto bg-[#151515] p-2">
    <Summary {...props} />
    <Generate {...props} />
    <Display {...props} />
    <Benchmark {...props} />
  </aside>
);

export default Sidebar;
