const Seo = () => (
  <section id="push-swap-visualizer" className="mx-auto max-w-[72ch] px-6 py-16 text-[15px] leading-relaxed text-ink-2 [&_strong]:font-medium [&_strong]:text-ink">
    <h2 className="mb-4 text-[22px] font-medium leading-snug text-ink">
      Push Swap Visualizer: see what your sorting algorithm actually does
    </h2>
    <p>
      The <strong>Push Swap Visualizer</strong> is an interactive tool for developers, students and coding
      enthusiasts working on the <strong>push_swap sorting algorithm</strong> in C. It animates, step by step, how
      numbers move between <strong>two stacks (A and B)</strong> using the project&apos;s fixed set of operations.
    </p>

    <h3 className="mb-2 mt-8 text-[17px] font-medium text-ink">Features</h3>
    <ul className="list-disc space-y-1 pl-5">
      <li><strong>Step-by-step execution:</strong> watch the sort unfold one instruction at a time.</li>
      <li><strong>Playback controls:</strong> play, pause, step back or forward, and change the speed.</li>
      <li><strong>Custom input:</strong> enter your own numbers to see how your algorithm handles edge cases.</li>
      <li><strong>Built for learning:</strong> made for students on <strong>42 School&apos;s push_swap project</strong> and anyone into algorithmic problem-solving.</li>
    </ul>

    <h3 className="mb-2 mt-8 text-[17px] font-medium text-ink">Why visualize push_swap?</h3>
    <p>Push swap is hard to reason about without seeing it. A visualizer helps you:</p>
    <ul className="mt-2 list-disc space-y-1 pl-5">
      <li>Understand the logic behind <strong>push (pa, pb)</strong>, <strong>swap (sa, sb, ss)</strong> and rotate operations.</li>
      <li>Spot inefficient moves in your sorting implementation.</li>
      <li>Debug faster and bring down the number of moves.</li>
    </ul>

    <h3 className="mb-2 mt-8 text-[17px] font-medium text-ink">Made for 42 School projects</h3>
    <p>
      If you&apos;re working on the <strong>push_swap project</strong> at <strong>42 School</strong>, this tool helps
      you build an efficient algorithm while <strong>minimizing the number of moves</strong>, a key factor in your
      grade.
    </p>
  </section>
);

export default Seo;
