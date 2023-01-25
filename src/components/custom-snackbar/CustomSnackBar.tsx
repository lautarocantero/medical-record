import { Alert, Snackbar } from '@mui/material';

const CustomSnackBar = ({ open, handleOnClose, hasError, message }: any) => (
  <Snackbar
    open={open}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    autoHideDuration={6000}
    onClose={() => handleOnClose()}
    message={message}
  >
    <Alert onClose={handleOnClose} severity={!hasError ? 'success' : 'error'} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default CustomSnackBar;
