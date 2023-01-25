import { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ErrorHelper } from '@/src/components/error/error-helper/ErrorHelper';
import { FadeIn } from '@/src/components/animations';
import { forgotPassword } from '@/src/api/endpoints/auth';
import { ForgotPasswordContainerBox } from '../styled';

const SendMail = ({ onSuccess }: { onSuccess: (email: string) => void }) => {
  const [errorMessage, setErrorMessage] = useState();
  const { t } = useTranslation();

  const { mutate, isLoading } = useMutation(forgotPassword);
  const getInitialValues = () => ({
    email: '',
  });
  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        email: Yup.string()
          .email(t('yup_required_email', { ns: 'common' }))
          .required(t('required_field', { ns: 'errors' })),
      }),
    );
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: getInitialValues(),
    onSubmit: (data: { email: string }) => {
      mutate(data, {
        onSuccess: () => {
          onSuccess(data.email);
          setErrorMessage({} as any);
        },
        onError: (e: any) => {
          setErrorMessage(e.response.data.error_messages[0]);
        },
      });
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: getValidationSchema(),
  });
  return (
    <ForgotPasswordContainerBox>
      <FadeIn>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <Typography variant="h5">{t('forgot_password_title', { ns: 'auth' })}</Typography>
            <TextField
              fullWidth
              autoFocus
              size="small"
              id="email"
              label="Email"
              type="text"
              value={values.email}
              onChange={({ target }: any) => {
                setFieldValue('email', target.value);
              }}
              error={errors.email !== undefined}
              helperText={errors.email?.toString()}
              placeholder={t('enter_your_email', { ns: 'auth' })}
              variant="outlined"
            />
            <ErrorHelper error={errorMessage} />
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
              {t('send_code', { ns: 'auth' })}
            </LoadingButton>
            <Button variant="outlined" color="primary" fullWidth component={RouterLink} to="/auth/login">
              {t('back', { ns: 'auth' })}
            </Button>
          </Stack>
        </Box>
      </FadeIn>
    </ForgotPasswordContainerBox>
  );
};

export default SendMail;
