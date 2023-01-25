import { FormikValues, useFormik } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useSnackBar from '@/src/components/custom-snackbar/useSnackBar';
import { useGetUserInfo } from './hooks/useGetUserInfo';
import { getMenus } from '@/src/utilities/storage';

export const useUserProfile = () => {
  const { SnackBar, setSnackBarMessageError, setSnackBarMessageSuccess } = useSnackBar();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    onGetUserInfo,
    userInfo,
    isLoading,
    isUpdateUserLoading,
    onUpdateUser,
    errorMessage,
    isUserUpdatedStatus,
    user,
    ResetStatus,
  } = useGetUserInfo();

  const menus = getMenus();

  useEffect(() => {
    if (errorMessage) {
      setSnackBarMessageError(t(errorMessage?.code, { ns: 'errors' }));
    }
    if (isUserUpdatedStatus === 'fulfilled') {
      setSnackBarMessageSuccess(t('user_profile_updated_successfully_text', { ns: 'auth' }));
      setTimeout(() => {
        navigate(`/${menus[0].name}`);
      }, 3000);
    }
    return function cleanup() {
      ResetStatus();
    };
  }, [errorMessage, setSnackBarMessageError, navigate, t, setSnackBarMessageSuccess, isUserUpdatedStatus]);

  useEffect(() => {
    onGetUserInfo();
  }, [user]);

  useEffect(() => {
    if (isUserUpdatedStatus === 'fulfilled') {
      onGetUserInfo();
    }
  }, [isUserUpdatedStatus]);

  // FORMIK DECLATARION
  const getInitialValues = () => ({
    areaCode: userInfo ? userInfo.area_code : '',
    countryCode: userInfo ? userInfo.country_code : '',
    email: userInfo ? userInfo?.email : '',
    name: userInfo ? userInfo?.name : '',
    phoneNumber: userInfo ? userInfo?.phone_number : '',
    surname: userInfo ? userInfo?.surname : '',
  });

  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        name: Yup.string()
          .required(t('required_field', { ns: 'errors' }))
          .max(50, t('user_profile_screen_name_field_max_length_validation', { ns: 'auth' })),
        phoneNumber: Yup.string().required(t('required_field', { ns: 'errors' })),
        surname: Yup.string()
          .required(t('required_field', { ns: 'errors' }))
          .max(50, t('user_profile_screen_surname_field_max_length_validation', { ns: 'auth' })),
      }),
    );

  const onSubmit = (values: FormikValues) => {
    const valuesToUpdate = {
      name: values.name,
      surname: values.surname,
    };
    onUpdateUser(valuesToUpdate);
  };

  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: getValidationSchema(),
  });

  const goBack = () => navigate(`/${menus[0].name}`);

  return {
    SnackBar,
    errors,
    handleSubmit,
    isLoading,
    isUpdateUserLoading,
    goBack,
    setFieldValue,
    values,
  };
};
