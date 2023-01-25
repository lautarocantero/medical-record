import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FormikValues, useFormik } from 'formik';
import PatientEditForm from './PatientsFormEdit';
import { validate } from './PatientsFormEdit.validate';
import { getAdminGroups, getAdminInfo, updateAdminUser } from '@/src/api/endpoints/admin-users';
import { PatientEditContainerProps, PatientUsers } from '../../types';

const AdministratorEditFormContainer = ({ row, close, setSnackBarMessageSuccess }: PatientEditContainerProps) => {
  const { data: adminInfo, isLoading: isLoadingGetAdminInfo } = useQuery([`getAdminInfo_${row.id}`], () =>
    getAdminInfo(row.id),
  );

  const { data: response, isLoading: loading } = useQuery(['getAdminGroups'], () => getAdminGroups());
  const patientUserGroups: Array<PatientUsers> | undefined | null = response?.data.groups;

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
    name: adminInfo?.data.name,
    surname: adminInfo?.data.surname,
    document: adminInfo?.data.document,
    phoneNumber: adminInfo?.data.phoneNumber,
    socialWork: adminInfo?.data.socialWork,
    reason: adminInfo?.data.admin.reason,
    illness: adminInfo?.data.admin.illness,
    illnessBackground: adminInfo?.data.illnessBackground,
    medicalHistory: adminInfo?.data.medicalHistory,
    familyBackground: adminInfo?.data.familyBackground,
    semiology: adminInfo?.data.admin.semiology,
    habits: adminInfo?.data.admin.habits,
    diagnosis: adminInfo?.data.admin.diagnosis,
    indication: adminInfo?.data.admin.indication,
  });

  const onSubmit = (data: FormikValues) => {
    const body = {
      name: data.name,
      surname: data.name,
      document: data.name,
      phoneNumber: data.name,
      socialWork: data.name,
      reason: data.admin.name,
      illness: data.admin.name,
      illnessBackground: data.name,
      medicalHistory: data.name,
      familyBackground: data.name,
      semiology: data.admin.name,
      habits: data.admin.name,
      diagnosis: data.admin.name,
      indication: data.admin.name,
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
    patientUserGroups,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    loading: isLoadingGetAdminInfo || loading,
    errorMessage,
    isSubmitLoading: isLoading,
  };
  return <PatientEditForm {...childProps} />;
};

export default AdministratorEditFormContainer;
