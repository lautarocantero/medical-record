import React from 'react';
import { Box, Link, Stack, TextField, InputAdornment, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FormikErrors, FormikValues } from 'formik';
import { LoadingButton } from '@mui/lab';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import PasswordField from '../../components/password-field/PasswordField';
import { Logo } from '../../layouts/auth/LoginLayout.styled';
import { ErrorHelper } from '@/src/components/error/error-helper/ErrorHelper';
import { FadeIn } from '@/src/components/animations';
import { useExportAssets } from '@/src/assets/exportFile';

const Login = ({
  handleSubmit,
  values,
  setFieldValue,
  errors,
  t,
  isLoading,
  errorMessage,
  SnackBar,
}: LoginCompProps) => {
  const { mainLogo } = useExportAssets();
  return (
    <FadeIn>
      <Logo src={mainLogo} alt="company_logo" />
      <Box
        component="form"
        sx={{
          width: '100%',
        }}
        noValidate
        onSubmit={handleSubmit}
      >
        <SnackBar />
        <Stack spacing={1}>
          <TextField
            fullWidth
            autoFocus
            id="email"
            label={t('email')}
            autoComplete="off"
            type="text"
            value={values.email}
            onChange={({ target }: any) => {
              setFieldValue('email', target.value);
            }}
            error={errors.email !== undefined}
            helperText={errors.email?.toString()}
            placeholder={t('enter_your_email', { ns: 'auth' })}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: errorMessage && (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" edge="end" sx={{ cursor: 'default' }}>
                    <WarningRoundedIcon color="error" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: '.6rem' }}
          />
          <PasswordField
            variant="outlined"
            size="small"
            id="password"
            label={t('password')}
            value={values.password}
            error={errors.password !== undefined}
            placeholder={t('password_placeholder', { ns: 'auth' })}
            helperText={errors.password?.toString()}
            onChange={({ target }: any) => {
              setFieldValue('password', target.value);
            }}
          />
          <ErrorHelper error={errorMessage} />
          <Box sx={{ alignSelf: 'flex-end' }}>
            <Link
              component={RouterLink}
              to="/auth/forgot-password"
              align="right"
              underline="none"
              sx={{
                fontSize: '0.75rem',
              }}
            >
              {t('forgot_password_button', { ns: 'auth' })}
            </Link>
          </Box>
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            {t('login')}
          </LoadingButton>
        </Stack>
      </Box>
    </FadeIn>
  );
};

interface LoginCompProps {
  t: any;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  values: FormikValues;
  setFieldValue: (
    field: string,
    value: string | number | boolean,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<{ email: string; password: string }>>;
  errors: FormikErrors<FormikValues>;
  isLoading: boolean;
  errorMessage:
    | {
        code: string;
        error_messages: string;
      }
    | null
    | undefined
    | { code: string };
  SnackBar: any;
}
export default Login;
