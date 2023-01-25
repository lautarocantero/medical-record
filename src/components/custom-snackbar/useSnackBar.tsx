import { Alert, Snackbar } from '@mui/material';
import React, { useState, useCallback } from 'react';

const useSnackBar = () => {
  const [open, setOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState('');

  const setSnackBarMessageError = useCallback((msj: string) => {
    setHasError(true);
    setOpen(true);
    setMessage(msj);
  }, []);

  const setSnackBarMessageSuccess = useCallback((msj: string) => {
    setOpen(true);
    setMessage(msj);
  }, []);

  const closeModal = () => {
    setOpen(false);
    if (hasError) setHasError(false);
  };

  const SnackBar = React.useMemo(() => {
    const SnackBarComponent = () => (
      <Snackbar
        open={open}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        autoHideDuration={6000}
        onClose={closeModal}
        message={message}
      >
        <Alert onClose={closeModal} severity={!hasError ? 'success' : 'error'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    );
    return SnackBarComponent;
  }, [open, setOpen, hasError, message]);

  return {
    SnackBar,
    open,
    setHasError,
    setMessage,
    setOpen,
    setSnackBarMessageError,
    setSnackBarMessageSuccess,
  };
};

export default useSnackBar;
