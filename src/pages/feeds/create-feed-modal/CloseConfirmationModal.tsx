import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';
import { ModalContentWrapper } from '../styles/CreateFeed.styled';

export const CloseConfirmationModal = ({
  openCreateModalCloseConfirmation,
  handleCloseConfirmation,
  handleBackToCreating,
}: ModalProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <Modal
        open={openCreateModalCloseConfirmation}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContentWrapper>
          <Typography id="modal-modal-description" variant="h6" color="muted">
            {t('creating_modal_closing_title', { ns: 'feed' })}
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="body2"
            color="muted"
            sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '16px', mt: 1 }}
          >
            {t('creating_modal_closing_message', { ns: 'feed' })}
          </Typography>
          <Box component="div" sx={{ widht: '100%', textAlign: 'right', pt: 1 }}>
            <Button size="small" variant="outlined" color="secondary" onClick={handleBackToCreating} sx={{ mr: 1 }}>
              {t('creating_modal_closing_back_button', { ns: 'feed' })}
            </Button>
            <Button size="small" variant="contained" color="primary" onClick={handleCloseConfirmation}>
              {t('creating_modal_closing_close_button', { ns: 'feed' })}
            </Button>
          </Box>
        </ModalContentWrapper>
      </Modal>
    </div>
  );
};

interface ModalProps {
  openCreateModalCloseConfirmation: boolean;
  handleCloseConfirmation: () => void;
  handleBackToCreating: () => void;
}
