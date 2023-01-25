import { Alert, Snackbar } from '@mui/material';
import React, { useCallback } from 'react';
import { useCustomDataTable } from './CustomDataTableContext';

const useSnackBar = () => {
  const { openSnackBar, setOpenSnackBar, hasError, setHasError, message, setMessage, setNeedRefresh } =
    useCustomDataTable();

  const setSnackBarMessageError = useCallback((msj: string) => {
    setHasError(true);
    setOpenSnackBar(true);
    setMessage(msj);
  }, []);

  const setSnackBarMessageSuccess = useCallback((msj: string) => {
    setOpenSnackBar(true);
    setHasError(false);
    setMessage(msj);
    setNeedRefresh(true);
  }, []);

  const closeModal = () => {
    setOpenSnackBar(false);
    if (hasError) setHasError(false);
  };

  const SnackBar = React.useMemo(() => {
    const SnackBarComponent = () => (
      <Snackbar
        open={openSnackBar}
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
  }, [openSnackBar, setOpenSnackBar, hasError, message]);

  return {
    SnackBar,
    openSnackBar,
    setHasError,
    setMessage,
    setOpenSnackBar,
    setSnackBarMessageError,
    setSnackBarMessageSuccess,
  };
};

export default useSnackBar;
