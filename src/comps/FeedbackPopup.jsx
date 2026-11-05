import { useState } from 'react';
import { LuStar, LuThumbsUp, LuThumbsDown } from 'react-icons/lu';
import Button from './ui/Button';
import { Checkbox, Dialog } from './ui/Controls';

const REPO = 'https://github.com/jawadelyousfi17/push_swap_visualizer';

const FeedbackPopup = ({ open, onClose, onDontShowAgain }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    if (dontShowAgain) onDontShowAgain();
    onClose();
  };

  const handleFeedback = (type) => {
    if (type === 'star') window.open(REPO, '_blank');
    if (type === 'dislike') window.open(`${REPO}/issues`, '_blank');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} title="Is the visualizer helping?">
      <p className="text-[14px] text-ink-2">
        A star on GitHub helps other 42 students find it. Something broken? Open an issue.
      </p>

      <div className="mt-1 flex flex-wrap gap-2">
        <Button onClick={() => handleFeedback('star')}>
          <LuStar />
          Star on GitHub
        </Button>
        <Button variant="outline" onClick={() => handleFeedback('like')}>
          <LuThumbsUp />
          Like
        </Button>
        <Button variant="outline" onClick={() => handleFeedback('dislike')}>
          <LuThumbsDown />
          Report an issue
        </Button>
      </div>

      <div className="mt-1">
        <Checkbox label="Don't show this again" checked={dontShowAgain} onChange={setDontShowAgain} />
      </div>
    </Dialog>
  );
};

export default FeedbackPopup;
