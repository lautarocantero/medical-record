import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import CreateFeedForm from './create-feed-form/CreateFeedForm.container';
import { CloseConfirmationModal } from './CloseConfirmationModal';

const CreateFeedModal = ({ dataById, openModal, refetchDataById, setOpenModal, setSnackBarMessageSuccess }: any) => {
  const [closeCreateModalConfirmation, setCreateModalConfirmation] = useState(false);
  const [openCreateModalCloseConfirmation, setOpenCreateModalCloseConfirmation] = useState(false);
  const handleClose = () => {
    if (!closeCreateModalConfirmation) {
      setOpenCreateModalCloseConfirmation(true);
      return;
    }
    setOpenModal(false);
  };

  const handleCloseConfirmation = () => {
    setOpenModal(false);
    setCreateModalConfirmation(false);
    setOpenCreateModalCloseConfirmation(false);
  };

  const handleBackToCreating = () => {
    setOpenCreateModalCloseConfirmation(false);
  };
  const { t } = useTranslation();

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="lg" disableEnforceFocus>
      <DialogTitle>
        {dataById ? t('edit', { ns: 'cdtModal' }) : t('new_publication', { ns: 'feed' })}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <CreateFeedForm
          dataById={dataById?.publication}
          close={handleCloseConfirmation}
          refetchDataById={refetchDataById}
          setSnackBarMessageSuccess={setSnackBarMessageSuccess}
        />
        {openCreateModalCloseConfirmation && (
          <CloseConfirmationModal
            openCreateModalCloseConfirmation={openCreateModalCloseConfirmation}
            handleBackToCreating={handleBackToCreating}
            handleCloseConfirmation={handleCloseConfirmation}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateFeedModal;
