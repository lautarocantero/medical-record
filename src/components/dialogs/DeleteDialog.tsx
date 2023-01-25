import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

interface DeleteDialogProp {
  title: string;
  contentText: string;
  open: boolean;
  onDelete: () => void;
  setOpen: (state: boolean) => void;
  deleteStatus: string;
}

const DeleteDialog = ({ title, contentText, open, setOpen, onDelete, deleteStatus }: DeleteDialogProp) => {
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <Dialog
      open={open || deleteStatus === 'loading'}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            color: (theme) => theme.palette.grey[500],
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" size="small" onClick={handleClose}>
          {t('delete_dialog_cancel_button_text', { ns: 'common' })}
        </Button>
        <LoadingButton size="small" variant="contained" loading={deleteStatus === 'loading'} onClick={handleDelete}>
          {t('delete_dialog_submit_button_text', { ns: 'common' })}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
