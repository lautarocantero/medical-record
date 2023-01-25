import { Alert, Typography } from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';

const AlertNoData = ({ title }: { title: string }) => (
  <Alert
    variant="standard"
    severity="info"
    sx={{ marginY: '1rem', color: 'primary', backgroundColor: 'rgb(243 242 247)', borderRadius: '70px' }}
    icon={<InfoIcon fontSize="inherit" color="primary" />}
  >
    <Typography variant="body1" color="primary">
      {title}
    </Typography>
  </Alert>
);

export default AlertNoData;
