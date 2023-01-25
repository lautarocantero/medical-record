import { Box, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface CounterIconProps {
  count: number;
  Icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
    muiName: string;
  };
  mr?: number;
  mt?: number;
}

const CounterIcon = ({ count, Icon, mr, mt }: CounterIconProps) => (
  <Box component="div" sx={{ position: 'relative', mr, mt }}>
    <Icon fontSize="medium" />
    <Box
      component="div"
      sx={{
        minWidht: '8px',
        width: '15px',
        minHeight: '8px',
        height: '15px',
        padding: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        borderRadius: '100%',
        backgroundColor: 'crimson',
        paddingTop: '9px',
        position: 'absolute',
        top: '-5px',
        right: '-7px',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontSize: '9px',
          color: '#eee',
          fontWeight: 'bolder',
          borderRadius: '20px',
          paddingRight: '5px',
          paddingLeft: '5px',
        }}
      >
        {count}
      </Typography>
    </Box>
  </Box>
);

export default CounterIcon;
