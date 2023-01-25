import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@/src/context/AuthContext';
import { useViewPortSize } from '../../hooks/useViewPortSize';
import { VALID_PASSWORD_REGEX } from '../../utilities/helpers/constants';
import useSnackBar from '@/src/components/custom-snackbar/useSnackBar';
import { usePasswordHandler } from '@/src/hooks/auth/usePasswordHandler';
import { getMenus } from '@/src/utilities/storage';

export const useChangePassword = () => {
  const { isPasswordUpdated, ResetStatus } = useContext(AuthContext);
  const { onChangePassword, isLoading, errorMessage } = usePasswordHandler();
  const { viewPortW } = useViewPortSize();
  const navigate = useNavigate();
  const menus = getMenus();

  const { t } = useTranslation();
  const mBtn = viewPortW <= 599 ? { mt: 1 } : { ml: 1 };
  const { SnackBar, setHasError, setMessage, setOpen, setSnackBarMessageError, setSnackBarMessageSuccess } =
    useSnackBar();

  useEffect(() => {
    if (isPasswordUpdated === 'rejected') {
      setSnackBarMessageError(t(errorMessage?.code as string, { ns: 'errors' }));
    }
    if (isPasswordUpdated === 'fulfilled') {
      setSnackBarMessageSuccess(t('password_successful_change_text', { ns: 'auth' }));
      setTimeout(() => {
        navigate(`/${menus[0].name}`);
      }, 2000);
    }
    return function cleanup() {
      ResetStatus();
    };
  }, [setHasError, setMessage, setOpen, isPasswordUpdated, errorMessage, t, navigate]);

  // FORMIK DECLARATION
  const getInitialValues = () => ({
    confirmPassword: '',
    currentPassword: '',
    newPassword: '',
  });

  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        confirmPassword: Yup.string()
          .oneOf(
            [Yup.ref('newPassword'), null],
            t('change_password_screen_passwords_field_do_not_match_validation', { ns: 'auth' }),
          )
          .required(t('required_field', { ns: 'errors' })),
        currentPassword: Yup.string().required(t('required_field', { ns: 'errors' })),
        newPassword: Yup.string()
          .min(8, t('change_password_screen_new_password_field_min_length_validation', { ns: 'auth' }))
          .max(20, t('change_password_screen_new_password_field_max_length_validation', { ns: 'auth' }))
          .required(t('required_field', { ns: 'errors' }))
          .matches(
            VALID_PASSWORD_REGEX,
            t('change_password_screen_new_password_field_invalid_regex_validation', { ns: 'auth' }),
          ),
      }),
    );
  const onSubmit = (data: FormikValues) => {
    const endpointData = {
      actual_password: data.currentPassword,
      new_password: data.newPassword,
    };

    onChangePassword(endpointData);
  };

  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: getInitialValues(),
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: getValidationSchema(),
  });

  // ADDITIONAL FN
  const goBack = () => navigate(`/${menus[0].name}`);

  return {
    SnackBar,
    errors,
    goBack,
    handleSubmit,
    isError: !!errorMessage,
    isLoading,
    mBtn,
    setFieldValue,
    values,
  };
};
