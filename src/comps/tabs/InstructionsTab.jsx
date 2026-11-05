import { useState } from 'react';
import Button from '../ui/Button';
import { Textarea } from '../ui/Field';
import { LuClipboardPaste, LuEraser, LuUndo2, LuCircle, LuSquare } from 'react-icons/lu';
import { executeInstruction } from '../../utils/stackOperations';
import { OP_FAMILIES } from '../../utils/opFamilies';

const OpButton = ({ op, color, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex h-9 flex-1 items-center gap-2 rounded-sm border border-line-strong bg-[#161616] px-2.5 font-mono text-[13.5px] text-ink transition-colors duration-150 hover:border-[#555] hover:bg-raised-2 active:translate-y-px"
  >
    <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
    {op}
  </button>
);

const InstructionsTab = ({ ops, instructions, setInstructions, notify }) => {
  const [isRecording, setIsRecording] = useState(true);

  const undo = () => {
    if (instructions.length > 0) {
      executeInstruction(ops, instructions[instructions.length - 1], true);
      setInstructions(instructions.slice(0, -1));
    }
  };

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInstructions(text.split('\n'));
        notify(`Pasted ${text.split('\n').filter((l) => l.trim()).length} instructions`);
      } else {
        notify('Clipboard is empty');
      }
    } catch {
      notify('Clipboard access was blocked. Paste into the box below instead.');
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-12 shrink-0 items-center justify-between bg-raised px-4">
        <h2 className="text-[16px] text-ink">
          Instructions <span className="tnum ml-1 font-mono text-[14px] text-ink-3">{instructions.length}</span>
        </h2>
        <Button variant={isRecording ? 'danger' : 'outline'} onClick={() => setIsRecording(!isRecording)} aria-pressed={isRecording}>
          {isRecording ? <LuSquare /> : <LuCircle className="text-[var(--bad)]" />}
          {isRecording ? 'Stop recording' : 'Record'}
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div>
          <p className="mb-2 text-[13px] text-ink-2">
            Apply an operation to the stacks{isRecording ? ' and append it to the list' : ''}.
          </p>
          <div className="flex flex-col gap-2">
            {Object.values(OP_FAMILIES).map((family) => (
              <div key={family.label} className="flex items-center gap-2">
                <span className="label-caps w-[88px] shrink-0 !text-[11px] text-ink-3">{family.label}</span>
                {family.ops.map((op) => (
                  <OpButton key={op} op={op} color={family.color} onClick={() => ops[op](isRecording)} />
                ))}
                {family.ops.length === 2 && <span className="flex-1" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="mb-2 flex items-center gap-1">
            <span className="mr-auto text-[13px] text-ink-2">One instruction per line</span>
            <Button variant="ghost" onClick={paste}>
              <LuClipboardPaste />
              Paste
            </Button>
            <Button variant="ghost" onClick={undo} disabled={!instructions.length}>
              <LuUndo2 />
              Undo
            </Button>
            <Button variant="ghost" onClick={() => setInstructions([])} disabled={!instructions.length}>
              <LuEraser />
              Clear
            </Button>
          </div>
          <Textarea
            placeholder="Paste the output of ./push_swap here"
            value={instructions.join('\n')}
            onChange={(e) => setInstructions(e.target.value.split('\n'))}
            className="min-h-[220px] flex-1 font-mono !text-[13px] leading-6"
          />
        </div>
      </div>
    </div>
  );
};

export default InstructionsTab;
