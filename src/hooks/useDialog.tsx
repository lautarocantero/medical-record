import { Breakpoint, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { useState, useMemo, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface PropCreateModal {
  children: React.ReactNode;
  title: string;
  maxWidth?: Breakpoint;
}

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const Modal = useMemo(() => {
    const CreateModalComponent: React.FunctionComponent<PropCreateModal> = ({
      children,
      title,
      maxWidth = 'lg',
    }: PropCreateModal) => (
      <Dialog
        open={isOpen}
        onClose={(event, reason) => {
          if (reason && reason === 'backdropClick') return;
          setIsOpen(false);
        }}
        // fullWidth
        maxWidth={maxWidth}
      >
        <DialogTitle>
          {title}
          <IconButton
            aria-label="close"
            onClick={() => setIsOpen(false)}
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
        <DialogContent>{children}</DialogContent>
      </Dialog>
    );
    return CreateModalComponent;
  }, [isOpen]);

  return useMemo(
    () => ({
      Modal,
      close,
      isOpen,
      open,
    }),
    [Modal, isOpen, open, close],
  );
};

export default useDialog;
