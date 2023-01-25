import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const InfoLabel = ({ first, second }: InfoLabelProps) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
      <Typography variant="subtitle2" fontWeight="600" marginRight="3.5px">
        {t(first)}:
      </Typography>
      <Typography variant="subtitle2">{second}</Typography>
    </Box>
  );
};

interface InfoLabelProps {
  first: string;
  second: string | number | null;
}
export default InfoLabel;
