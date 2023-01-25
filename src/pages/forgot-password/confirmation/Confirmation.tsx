import React, { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';
import { ErrorHelper } from '@/src/components/error/error-helper/ErrorHelper';
import CustomInput from '@/src/components/forms/CustomInput';
import { NUMBER_REGEX, VALID_PASSWORD_REGEX } from '@/src/utilities/helpers/constants';
import CustomPasswordInput from '@/src/components/forms/CustomPasswordInput';
import { FadeIn } from '@/src/components/animations';
import { forgotPasswordConfirmation } from '@/src/api/endpoints/auth';
import { ForgotPasswordContainerBox } from '../styled';

const Confirmation = ({ emailSent }: { emailSent: string }) => {
  const [errorMessage, setErrorMessage] = useState();
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(forgotPasswordConfirmation);
  const navigate = useNavigate();
  const getInitialValues = () => ({
    confirmationCode: '',
    newPassword: '',
    newPasswordConfirmation: '',
  });
  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        confirmationCode: Yup.string()
          .min(6, t('change_password_screen_code_field_min_length_validation', { ns: 'auth' }))
          .required(t('required_field', { ns: 'errors' })),
        newPassword: Yup.string()
          .min(8, t('change_password_screen_new_password_field_min_length_validation', { ns: 'auth' }))
          .max(20, t('change_password_screen_new_password_field_max_length_validation', { ns: 'auth' }))
          .required(t('required_field', { ns: 'errors' }))
          .matches(
            VALID_PASSWORD_REGEX,
            t('change_password_screen_new_password_field_invalid_regex_validation', { ns: 'auth' }),
          ),
        newPasswordConfirmation: Yup.string()
          .oneOf(
            [Yup.ref('newPassword'), null],
            t('change_password_screen_passwords_field_do_not_match_validation', { ns: 'auth' }),
          )
          .required(t('required_field', { ns: 'errors' })),
      }),
    );

  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    onSubmit: (data: FormikValues) => {
      const confirmationValues = {
        confirmation_code: data.confirmationCode,
        email: emailSent,
        new_password: data.newPassword,
      };
      mutate(confirmationValues, {
        onSuccess: () => {
          navigate('/auth/login', { state: { isPasswordChanged: true } });
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
            <Typography variant="h5">{t('enter_code', { ns: 'auth' })}</Typography>
            <CustomInput
              field="confirmationCode"
              errors={errors}
              label={t('code', { ns: 'auth' })}
              placeholder={t('code', { ns: 'auth' })}
              setFieldValue={setFieldValue}
              values={values}
              autoFocus
              maxLength={6}
              regex={NUMBER_REGEX}
            />
            <CustomPasswordInput
              field="newPassword"
              errors={errors}
              label={t('new_password', { ns: 'auth' })}
              placeholder={t('enter_new_password', { ns: 'auth' })}
              setFieldValue={setFieldValue}
              values={values}
              maxLength={20}
            />
            <CustomPasswordInput
              field="newPasswordConfirmation"
              errors={errors}
              label={t('change_password_repeat', { ns: 'auth' })}
              placeholder={t('enter_new_password', { ns: 'auth' })}
              setFieldValue={setFieldValue}
              values={values}
              maxLength={20}
            />
            <ErrorHelper error={errorMessage} />

            <LoadingButton type="submit" variant="contained" fullWidth loading={isLoading}>
              {t('change_password', { ns: 'auth' })}
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

export default Confirmation;
