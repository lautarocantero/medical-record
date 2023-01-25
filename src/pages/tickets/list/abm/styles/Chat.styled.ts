import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ChatTextErrorContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '-15px',
  left: 0,
  backgroundColor: '#fff',
  width: '100%',
  padding: '0 5px 0 5px',
}));

export const ChatImageErrorContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%',
  alignItems: 'center',
  color: '#eee',
}));
