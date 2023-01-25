import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ErrorText = (props: { error: string | null }) => {
  const { error } = props;
  const { t } = useTranslation();

  if (!error) return null;
  return (
    <Typography component="span" variant="caption" color="error">
      {t(error, { ns: 'errors' })}
    </Typography>
  );
};
