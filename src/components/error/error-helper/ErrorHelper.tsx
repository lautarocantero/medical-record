import { FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ErrorHelper = (props: any) => {
  const { error } = props;
  const { t } = useTranslation();
  if (!error) return null;
  return (
    <FormHelperText id="my-helper-text" error={error !== null}>
      {t(error.code, { ns: 'errors', resource: `${error?.property_name} ${error?.message}` })}
    </FormHelperText>
  );
};
