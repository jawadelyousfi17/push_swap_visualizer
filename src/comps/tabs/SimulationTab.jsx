import { useState, useRef, useEffect, useMemo } from 'react';
import Button from '../ui/Button';
import { Slider } from '../ui/Controls';
import { LuPlay, LuPause, LuStepBack, LuStepForward, LuRotateCcw, LuListChecks, LuChevronRight } from 'react-icons/lu';
import { executeInstruction } from '../../utils/stackOperations';
import { validateSortingCompletion } from '../../utils/stackValidator';
import { stackSizesAfter } from '../../utils/opFamilies';
import OpPill from '../ui/OpPill';
import StatusPill from '../ui/StatusPill';

const SimulationTab = ({ instructions, setInstructions, ops, resetStacks, total, notify }) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [sortingResult, setSortingResult] = useState(null);
  const intervalRef = useRef(null);
  const rowRefs = useRef([]);

  const steps = useMemo(() => instructions.filter((i) => i !== 'END'), [instructions]);
  const sizes = useMemo(() => stackSizesAfter(steps, total), [steps, total]);

  useEffect(() => {
    rowRefs.current[index]?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const ensureEndMarker = () => {
    if (instructions[instructions.length - 1] !== 'END') {
      setInstructions([...instructions, 'END']);
    }
  };

  const next = () => {
    if (instructions[0] === 'END') instructions.shift();
    if (index < instructions.length) {
      if (instructions[index] !== 'END') executeInstruction(ops, instructions[index]);
      setIndex(index + 1);
    }
    ensureEndMarker();
  };

  const prev = () => {
    if (instructions[0] === 'END') instructions.shift();
    if (index > 0) {
      executeInstruction(ops, instructions[index - 1], true);
      setIndex(index - 1);
    }
  };

  const checkSortingStatus = () => {
    const validation = validateSortingCompletion(ops.a, ops.b, instructions);
    setSortingResult(validation);
  };

  const play = (delay = speed) => {
    let i = index;
    if (instructions.length === 0) {
      notify('No instructions to play. Add some in the Instructions tab.');
      return;
    }
    ensureEndMarker();
    setIsPlaying(true);
    setSortingResult(null);

    if (delay === 0) {
      for (i = index; i < instructions.length; i++) {
        if (instructions[i] !== 'END') executeInstruction(ops, instructions[i]);
        setIndex(i + 1);
      }
      setIsPlaying(false);
      checkSortingStatus();
      return;
    }

    intervalRef.current = setInterval(() => {
      if (i < instructions.length) {
        if (instructions[i] !== 'END') executeInstruction(ops, instructions[i]);
        setIndex(i + 1);
        i++;
        if (i >= instructions.length) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          checkSortingStatus();
        }
      }
    }, delay);
  };

  const stop = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const handleSpeedChange = (value) => {
    setSpeed(value);
    if (isPlaying) {
      stop();
      play(value);
    }
  };

  const reload = () => {
    stop();
    setIndex(0);
    setSortingResult(null);
    resetStacks();
  };

  const done = Math.min(index, steps.length);
  const atEnd = index >= instructions.length && instructions.length > 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Header strip: progress + result */}
      <div className="flex h-12 shrink-0 items-center gap-3 bg-raised px-4">
        <h2 className="text-[16px] text-ink">
          Step <span className="tnum font-mono">{done}</span>
          <span className="tnum font-mono text-ink-3"> / {steps.length}</span>
        </h2>
        <div className="ml-auto">
          {isPlaying && <StatusPill tone="live">Playing</StatusPill>}
          {!isPlaying && sortingResult && (
            <StatusPill tone={sortingResult.success ? 'ok' : 'bad'}>
              {sortingResult.success ? 'Sorted' : 'Not sorted'}
            </StatusPill>
          )}
        </div>
      </div>

      {/* Transport */}
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-line px-4 py-3">
        {isPlaying ? (
          <Button onClick={stop} className="min-w-[84px]">
            <LuPause />
            Pause
          </Button>
        ) : (
          <Button onClick={() => play()} disabled={atEnd || steps.length === 0} className="min-w-[84px]">
            <LuPlay />
            Play
          </Button>
        )}
        <Button icon variant="outline" onClick={prev} disabled={isPlaying || index === 0} aria-label="Previous step" title="Previous step">
          <LuStepBack />
        </Button>
        <Button icon variant="outline" onClick={next} disabled={isPlaying || atEnd || steps.length === 0} aria-label="Next step" title="Next step">
          <LuStepForward />
        </Button>
        <Button icon variant="outline" onClick={reload} aria-label="Reset to the loaded numbers" title="Reset to the loaded numbers">
          <LuRotateCcw />
        </Button>
        <Button variant="soft" onClick={checkSortingStatus} className="ml-auto">
          <LuListChecks />
          Check
        </Button>

        <div className="flex w-full items-center gap-3 pt-1">
          <span className="label-caps !text-[11px] text-ink-3">Delay</span>
          <Slider label="Delay between steps" value={speed} min={0} max={100} onChange={handleSpeedChange} />
          <span className="tnum w-14 text-right font-mono text-[12.5px] text-ink-2">
            {speed === 0 ? 'instant' : `${speed} ms`}
          </span>
        </div>
      </div>

      {sortingResult && !isPlaying && (
        <div
          role="status"
          className="shrink-0 border-b border-line px-4 py-2.5 text-[13px]"
          style={{ background: `color-mix(in srgb, ${sortingResult.success ? 'var(--ok)' : 'var(--bad)'} 12%, var(--base))` }}
        >
          <p className="text-ink">{sortingResult.message}</p>
          {sortingResult.details && <p className="mt-0.5 text-ink-2">{sortingResult.details}</p>}
        </div>
      )}

      {/* Instruction table */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {steps.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-1 px-8 text-center">
            <p className="text-[14px] text-ink">No instructions loaded</p>
            <p className="max-w-[34ch] text-[13px] text-ink-3">
              Paste your push_swap output in the Instructions tab, or record moves with the operation buttons.
            </p>
          </div>
        ) : (
          <table className="w-full border-collapse text-[13px]">
            <thead className="sticky top-0 z-10 bg-base">
              <tr className="label-caps h-10 text-left text-ink">
                <th className="w-14 border-b border-r border-line pl-4 pr-2 font-medium">#</th>
                <th className="border-b border-r border-line px-3 font-medium">Op</th>
                <th className="w-24 border-b border-r border-line px-3 text-right font-medium">Stack A</th>
                <th className="w-24 border-b border-line px-3 text-right font-medium">Stack B</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((op, i) => {
                const current = i === index;
                const executed = i < index;
                return (
                  <tr
                    key={i}
                    ref={(el) => (rowRefs.current[i] = el)}
                    aria-current={current ? 'step' : undefined}
                    className={`h-9 ${current ? 'bg-[#2c3742]' : ''} ${executed || current ? 'text-ink' : 'text-ink-3'}`}
                  >
                    <td className="tnum border-b border-r border-line pl-2 pr-2 text-right font-mono text-[12px]">
                      <span className="inline-flex items-center gap-1">
                        {current && <LuChevronRight className="text-[var(--accent)]" />}
                        {i + 1}
                      </span>
                    </td>
                    <td className="border-b border-r border-line px-3">
                      <span className={executed || current ? '' : 'opacity-60'}>
                        <OpPill op={op} />
                      </span>
                    </td>
                    <td className="tnum border-b border-r border-line px-3 text-right font-mono">{sizes[i]?.[0]}</td>
                    <td className="tnum border-b border-line px-3 text-right font-mono">{sizes[i]?.[1]}</td>
                  </tr>
                );
              })}
              <tr ref={(el) => (rowRefs.current[steps.length] = el)} className={`h-9 ${index >= steps.length ? 'bg-[#2c3742] text-ink' : 'text-ink-3'}`}>
                <td className="border-b border-r border-line" />
                <td colSpan={3} className="label-caps border-b border-line px-3 !text-[11px]">End</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SimulationTab;
