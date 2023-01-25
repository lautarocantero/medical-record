import React from 'react';
import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
}
export const Main = ({ children }: Props) => (
  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    {children}
  </Box>
);
