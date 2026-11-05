import { useState } from 'react';
import InstructionsTab from './tabs/InstructionsTab';
import SimulationTab from './tabs/SimulationTab';

const TABS = [
  { id: 'instructions', label: 'Instructions' },
  { id: 'simulation', label: 'Simulation' },
];

/** Middle column: uppercase tab strip over the two working views. Both stay mounted to keep playback state. */
const Workbench = (props) => {
  const [tab, setTab] = useState('instructions');

  return (
    <section className="flex min-h-0 flex-1 flex-col bg-base">
      <div role="tablist" aria-label="Workbench" className="flex h-12 shrink-0 bg-sunk">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active}
              aria-controls={`panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`label-caps px-5 transition-colors duration-150 ${
                active ? 'bg-raised text-ink' : 'text-ink-2 hover:bg-[#1c1c1c] hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id="panel-simulation" aria-labelledby="tab-simulation" hidden={tab !== 'simulation'} className="flex min-h-0 flex-1 flex-col [&[hidden]]:hidden">
        <SimulationTab {...props} />
      </div>
      <div role="tabpanel" id="panel-instructions" aria-labelledby="tab-instructions" hidden={tab !== 'instructions'} className="flex min-h-0 flex-1 flex-col [&[hidden]]:hidden">
        <InstructionsTab {...props} />
      </div>
    </section>
  );
};

export default Workbench;
