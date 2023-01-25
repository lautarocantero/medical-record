import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FormikValues, useFormik } from 'formik';
import { createAdminUser, getAdminGroups } from '@/src/api/endpoints/admin-users';
import { DataTableFormModal } from '@/src/components/custom-data-table/types/DataTableFormModal';
import UserForm2 from './AdministratorForm';
import { validate } from './AdministratorForm.validate';
import { AdminUsers } from '../../types';

const AdministratorContainer = ({ close, setSnackBarMessageSuccess }: DataTableFormModal) => {
  const { data: response, isLoading: loading } = useQuery(['getAdminGroups'], () => getAdminGroups());
  const adminUserGroups: Array<AdminUsers> | undefined | null = response?.data.groups;
  const [errorMessage, setErrorMessage] = useState<{ code: string; message: string; property_name: string } | null>(
    null,
  );
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(createAdminUser, {
    onError: async (e: any) => {
      setErrorMessage(e.response.data.error_messages[0]);
    },
    onSuccess: async () => {
      close();
      setSnackBarMessageSuccess(t('successful_user_creation_snackbar_text', { ns: 'users' }));
    },
  });

  const getInitialValues = () => ({
    adminGroups: [],
    areaCode: '',
    confirmPassword: '',
    countryCode: '',
    email: '',
    name: '',
    notes: '',
    password: '',
    phoneNumber: '',
    surname: '',
  });

  const onSubmit = (data: FormikValues) => {
    const body = {
      area_code: data.areaCode,
      country_code: data.countryCode,
      email: data.email.trim(),
      group_ids: data.adminGroups?.map((x: any) => x.id),
      name: data.name,
      notes: data.notes,
      password: data.password,
      phone_number: data.phoneNumber,
      surname: data.surname,
    };
    mutate(body);
  };

  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: getInitialValues(),
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: validate(t),
  });

  const childProps = {
    adminUserGroups,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    loading,
    errorMessage,
    isSubmitLoading: isLoading,
  };
  return <UserForm2 {...childProps} />;
};

export default AdministratorContainer;
