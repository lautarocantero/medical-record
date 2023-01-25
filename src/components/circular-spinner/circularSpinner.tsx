import { Box, CircularProgress } from '@mui/material';

export const CircularSpinner = ({
  size,
  color,
}: {
  size?: number;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;
}) => (
  <Box
    sx={{
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
    }}
  >
    <CircularProgress size={size as number} color={color || 'primary'} />
  </Box>
);
