import { Refresh } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const RefreshButton = ({ refresh, disabled }: RefreshButtonProps) => (
  <IconButton
    disabled={disabled}
    aria-label="refresh"
    onClick={() => {
      refresh(true);
    }}
    sx={{
      backgroundColor: 'transparent',
      border: '1px solid primary',
      color: 'primary.main',
      borderRadius: '4px',
      ':hover': {
        textDecoration: 'none',
      },
    }}
  >
    <Refresh />
  </IconButton>
);

interface RefreshButtonProps {
  refresh: (value: boolean) => void;
  disabled?: boolean;
}

export default RefreshButton;
