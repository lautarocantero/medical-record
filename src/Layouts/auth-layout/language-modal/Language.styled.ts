import { styled } from '@mui/material/styles';
import { Box, Fab } from '@mui/material';

export const FlagWrapper = styled(Box)`
  display: flex;
  gap: 1rem;
`;

export const CustomFab = styled(Fab)`
  background: #fff;
  position: fixed;
  right: 0;
  bottom: 0;
  margin-right: 24px;
  margin-bottom: 8px;
`;
