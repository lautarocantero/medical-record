import { SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface PropsTableHeaderButton {
  text: string;
  Icon?: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
    muiName: string;
  };
  handleClick: () => void;
}

const TableHeaderButton = ({ text, handleClick, Icon }: PropsTableHeaderButton) => (
  <Typography
    variant="button"
    onClick={handleClick}
    sx={{
      display: 'flex',
      alignItems: 'center',
      padding: '5px 15px',
      border: '1px solid rgba(0, 20, 65, 0.5)',
      borderRadius: '4px',
      color: '#001441',
      cursor: 'pointer',
      transition: '.5s',
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: 'rgba(0, 20, 65, 0.04)',
        border: '1px solid #0014412',
      },
      '&:active': {
        backgroundColor: '#00144124',
      },
    }}
  >
    {Icon && <Icon sx={{ fontSize: '20px', mr: '8px' }} />}
    {text}
  </Typography>
);

export default TableHeaderButton;
