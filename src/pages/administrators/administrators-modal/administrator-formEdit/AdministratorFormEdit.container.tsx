import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FormikValues, useFormik } from 'formik';
import AdministratorEditForm from './AdministratorFormEdit';
import { validate } from './AdministratorFormEdit.validate';
import { getAdminGroups, getAdminInfo, updateAdminUser } from '@/src/api/endpoints/admin-users';
import { AdminEditContainerProps, AdminUsers } from '../../types';

const AdministratorEditFormContainer = ({ row, close, setSnackBarMessageSuccess }: AdminEditContainerProps) => {
  const { data: adminInfo, isLoading: isLoadingGetAdminInfo } = useQuery([`getAdminInfo_${row.id}`], () =>
    getAdminInfo(row.id),
  );

  const { data: response, isLoading: loading } = useQuery(['getAdminGroups'], () => getAdminGroups());
  const adminUserGroups: Array<AdminUsers> | undefined | null = response?.data.groups;

  const [errorMessage, setErrorMessage] = useState<{ code: string; message: string; property_name: string } | null>(
    null,
  );

  const { t } = useTranslation();

  const { mutate, isLoading } = useMutation(updateAdminUser, {
    onError: async (e: any) => {
      setErrorMessage(e.response.data.error_messages[0]);
    },
    onSuccess: async () => {
      close();
      setSnackBarMessageSuccess(t('successful_user_edition_snackbar_text', { ns: 'users' }));
    },
  });

  const getInitialValues = () => ({
    adminGroups: adminInfo?.data.admin.groups,
    areaCode: adminInfo?.data.admin.area_code,
    countryCode: adminInfo?.data.admin.country_code,
    email: adminInfo?.data.admin.email.trim(),
    name: adminInfo?.data.admin.name,
    notes: adminInfo?.data.admin.notes,
    phoneNumber: adminInfo?.data.admin.phone_number,
    surname: adminInfo?.data.admin.surname,
  });

  const onSubmit = (data: FormikValues) => {
    const body = {
      area_code: data.areaCode,
      country_code: data.countryCode,
      email: data.email,
      group_ids: data.adminGroups?.map((x: any) => x.id),
      name: data.name,
      notes: data.notes,
      password: data.password,
      phone_number: data.phoneNumber,
      surname: data.surname,
    };
    mutate({ data: body, id: adminInfo?.data.admin.user_id });
  };

  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: getInitialValues(),
    onSubmit,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: validate(false, t),
  });

  const childProps = {
    adminUserGroups,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    loading: isLoadingGetAdminInfo || loading,
    errorMessage,
    isSubmitLoading: isLoading,
  };
  return <AdministratorEditForm {...childProps} />;
};

export default AdministratorEditFormContainer;
