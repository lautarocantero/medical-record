import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FormikValues, useFormik } from 'formik';
import { createPatientUser, getPatientGroups } from '@/src/api/endpoints/patients';
import { DataTableFormModal } from '@/src/components/custom-data-table/types/DataTableFormModal';
import PatientsForm from './PatientsForm';
import { validate } from './PatientsForm.validate';
import { PatientUsers } from '../../types';

const PatientContainer = ({ close, setSnackBarMessageSuccess }: DataTableFormModal) => {
  const { data: response, isLoading: loading } = useQuery(['getAdminGroups'], () => getPatientGroups());
  const patientUserGroups: Array<PatientUsers> | undefined | null = response?.data.groups;
  const [errorMessage, setErrorMessage] = useState<{ code: string; message: string; property_name: string } | null>(
    null,
  );
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(createPatientUser, {
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
    name: '',
    surname: '',
    document: '',
    phoneNumber: '',
    socialWork: '',
    reason: '',
    illness: '',
    illnessBackground: '',
    medicalHistory: '',
    familyBackground: '',
    semiology: '',
    habits: '',
    diagnosis: '',
    indication: '',
  });

  const onSubmit = (data: FormikValues) => {
    const body = {
      name: data.name,
      surname: data.surname,
      document: data.document,
      phoneNumber: data.phoneNumber,
      socialWork: data.socialWork,
      reason: data.reason,
      illness: data.illness,
      illnessBackground: data.illnessBackground,
      medicalHistory: data.medicalHistory,
      familyBackground: data.medicalHistory,
      semiology: data.semiology,
      habits: data.habits,
      diagnosis: data.diagnosis,
      indication: data.diagnosis,
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
    patientUserGroups,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    loading,
    errorMessage,
    isSubmitLoading: isLoading,
  };
  return <PatientsForm {...childProps} />;
};

export default PatientContainer;
