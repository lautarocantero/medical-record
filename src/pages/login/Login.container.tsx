import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import Login from './Login';
import { useLogin } from '@/src/hooks/auth/useLoginHandler';

export const LoginContainer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const { onLogin, isLoading, errorMessage, noUserAllowedErrorMessage, SnackBar } = useLogin(
    location.state?.isPasswordChanged,
  );
  const { t } = useTranslation();
  // FORMIK
  const getInitialValues = () => ({
    email: '',
    password: '',
  });
  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        email: Yup.string()
          .email(t('yup_required_email', { ns: 'common' }))
          .required(t('required_field', { ns: 'errors' }))
          .trim(),
        password: Yup.string().required(t('required_field', { ns: 'errors' })),
      }),
    );

  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: getInitialValues(),
    onSubmit: (data: { email: string; password: string }) => {
      onLogin({
        email: data.email.trim(),
        password: data.password,
      });
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: getValidationSchema(),
  });

  const childProps = {
    errorMessage: errorMessage || noUserAllowedErrorMessage,
    errors,
    handleSubmit,
    isLoading,
    isVisible,
    setFieldValue,
    setIsVisible,
    t,
    values,
    SnackBar,
  };

  return <Login {...childProps} />;
};
