import React from 'react';
import { Modal, ModalDialog, Typography, Button, Checkbox, Box, IconButton } from '@mui/joy';
import { AiOutlineClose, AiOutlineStar, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

const FeedbackPopup = ({ open, onClose, onDontShowAgain }) => {
  const [dontShowAgain, setDontShowAgain] = React.useState(false);

  const handleClose = () => {
    if (dontShowAgain) {
      onDontShowAgain();
    }
    onClose();
  };

  const handleFeedback = (type) => {
    // Handle different feedback types
    switch (type) {
      case 'star':
        // Open GitHub repository in new tab
        window.open('https://github.com/jawadelyousfi17/push_swap_visualizer', '_blank');
        break;
      case 'like':
        // Could integrate with analytics or feedback system
        console.log('User liked the app');
        break;
      case 'dislike':
        // Could open feedback form or issue tracker
        console.log('User disliked the app');
        break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog
        variant="outlined"
        size="md"
        sx={{
          maxWidth: 400,
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Close Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton
            variant="plain"
            size="sm"
            onClick={handleClose}
            sx={{ borderRadius: '50%' }}
          >
            <AiOutlineClose />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ textAlign: 'center', px: 2, pb: 2 }}>
          <Typography level="h4" sx={{ mb: 1, fontWeight: 600 }}>
            Enjoying Push Swap Visualizer?
          </Typography>
          
          <Typography level="body-md" sx={{ mb: 3, color: 'text.secondary' }}>
            Help us improve by sharing your feedback!
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
            <Button
              variant="outlined"
              startDecorator={<AiOutlineStar />}
              onClick={() => handleFeedback('star')}
              sx={{
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: 'warning.50',
                  borderColor: 'warning.300',
                }
              }}
            >
              Star us
            </Button>
            
            <Button
              variant="outlined"
              startDecorator={<AiOutlineLike />}
              onClick={() => handleFeedback('like')}
              sx={{
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: 'success.50',
                  borderColor: 'success.300',
                }
              }}
            >
              Like
            </Button>
            
            <Button
              variant="outlined"
              startDecorator={<AiOutlineDislike />}
              onClick={() => handleFeedback('dislike')}
              sx={{
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: 'danger.50',
                  borderColor: 'danger.300',
                }
              }}
            >
              Dislike
            </Button>
          </Box>

          {/* Don't Show Again Checkbox */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Checkbox
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              size="sm"
            />
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              Don't show this again
            </Typography>
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default FeedbackPopup;
