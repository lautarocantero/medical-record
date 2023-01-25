import * as React from 'react';
import { Modal, CardMedia, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ModalContentWrapper } from '@/src/pages/feeds/styles/CreateFeed.styled';

const ImageViewerContainer = styled(ModalContentWrapper)`
  background-color: transparent;
  height: 100%;
  width: auto;
`;

export const ImageViewer = ({ open, onClose, url }: { open: boolean; onClose: () => void; url: string }) => (
  <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <ImageViewerContainer onClick={onClose}>
      <ClickAwayListener onClickAway={onClose}>
        <CardMedia
          sx={{ objectFit: 'contain', minWidth: '350px' }}
          component="img"
          height="100%"
          width="100%"
          image={url}
          alt="image_to_be_sent"
        />
      </ClickAwayListener>
    </ImageViewerContainer>
  </Modal>
);
