import * as React from 'react';
import Modal from '@mui/material/Modal';
import { CardMedia } from '@mui/material';
import { ModalContentWrapper } from '../styles/CreateFeed.styled';

interface VideoReaderProps {
  open: boolean;
  handleClose: () => void;
  videoUrl: string;
}

export const VideoReaderModal = (props: VideoReaderProps) => {
  const { open, handleClose, videoUrl } = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContentWrapper>
          <CardMedia
            sx={{
              border: 'none',
              width: 'auto',
              height: 'auto',
            }}
            component="iframe"
            src={videoUrl}
          />
        </ModalContentWrapper>
      </Modal>
    </div>
  );
};
