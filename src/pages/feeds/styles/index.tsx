import { styled } from '@mui/material';

export const FeedHeader = styled('div')(({ pr }: { pr: string }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
  paddingRight: pr,
}));

export const ScrollStyles = {
  '&::-webkit-scrollbar': {
    width: 0,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    height: '60%',
    outline: '1px solid slategrey',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 16px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
};
