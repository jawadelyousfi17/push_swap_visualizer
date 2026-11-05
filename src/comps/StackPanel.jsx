const barColorA = (el, n, theme, clg) =>
  theme !== 'default'
    ? `hsl(${clg + ((n - el.index) * 25) / n}, 90%, ${((n - el.index) * 75) / n + 15}%)`
    : `hsl(${((n - el.index) * 60) / n}, 100%, 50%)`;

const barColorB = (el, n, theme, clg) =>
  theme !== 'default'
    ? `hsl(${clg}, 90%, ${((n - el.index) * 50) / n + 5}%)`
    : `hsl(${((n - el.index) * 60) / n}, 100%, 50%)`;

const Header = ({ name, count }) => (
  <div className="label-caps flex h-10 flex-1 items-center gap-2 border-b border-line px-4 text-ink">
    {name}
    <span className="tnum font-mono text-[12.5px] normal-case tracking-normal text-ink-3">{count}</span>
  </div>
);

/**
 * Right panel: both stacks side by side, sharing one grid-lined frame.
 * Bar widths are scaled from the measured width of column A (stackRef).
 */
const StackPanel = ({ stackRef, width, a, b, total, classN, styleE, showIndxes, theme, clg }) => {
  const showLabels = styleE.includes('labels');
  const barWidth = (el) => Math.max(2, ((width - 16) / total) * (el.index + 1));

  const renderBars = (items, colorFn) =>
    items.map((el, i) => (
      <div
        key={i}
        style={{ width: barWidth(el), backgroundColor: colorFn(el, total, theme, clg) }}
        className={classN}
      >
        {showLabels && (showIndxes ? el.index : el.num)}
      </div>
    ));

  return (
    <section aria-label="Stacks" className="flex min-h-0 flex-1 flex-col bg-base">
      <div className="flex h-12 shrink-0 items-center bg-sunk px-4">
        <h2 className="label-caps text-ink">Stacks</h2>
      </div>
      <div className="flex shrink-0">
        <Header name="Stack A" count={a.length} />
        <div className="w-px bg-line" />
        <Header name="Stack B" count={b.length} />
      </div>

      <div className="relative flex min-h-0 flex-1">
        <div ref={stackRef} className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden py-2">
          {renderBars(a, barColorA)}
        </div>
        <div className="w-px bg-line" />
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden py-2">
          {renderBars(b, barColorB)}
        </div>

        {total === 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-8">
            <div className="flex flex-col items-center gap-1 bg-base px-4 py-3 text-center">
              <p className="text-[14px] text-ink">Stack A is empty</p>
              <p className="max-w-[36ch] text-[13px] text-ink-3">
                Generate random numbers or paste your own in the Generate section on the left.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StackPanel;
