import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { ErrorText } from '@/src/components/error/error-text/ErrorText';
import { InputFlag } from './InputFlag';
import { CircularSpinner } from '@/src/components/circular-spinner/CircularSpinner';

export const FormCategory = ({
  codes,
  isLoading,
  errors,
  handleOnChange,
  values,
  creationError,
  handleCreateCategory,
  createEditLoading,
}: any) => {
  const { t } = useTranslation();
  return (
    <Box component="form" onSubmit={handleCreateCategory}>
      {isLoading ? (
        <CircularSpinner />
      ) : (
        codes &&
        codes.map((code: string, index: number) => (
          <InputFlag
            key={code}
            code={code}
            index={index}
            field={code}
            errors={errors}
            label={t('name')}
            handleOnChange={handleOnChange}
            values={values}
          />
        ))
      )}
      <Box component="div" sx={{ widht: '100%', textAlign: 'right', pt: 1 }}>
        <LoadingButton loading={createEditLoading} size="small" type="submit" variant="contained">
          {t('save', { ns: 'common' })}
        </LoadingButton>
      </Box>
      <ErrorText error={creationError as string} />
    </Box>
  );
};
