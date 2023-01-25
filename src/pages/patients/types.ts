import { FormikErrors, FormikValues } from 'formik';
import { FormEvent } from 'react';

export interface PatientUsers {
  id: number;
  name: string;
}

export interface AdminUsers {
  id: number;
  name: string;
}

export interface PatientFormProps {
  patientUserGroups: Array<AdminUsers> | undefined | null;
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  values: FormikValues;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<FormikValues>>;
  errors: FormikErrors<FormikValues>;
  loading: boolean;
  errorMessage: { code: string; message: string; property_name: string } | null;
  isSubmitLoading: boolean;
}

export interface Row {
  creation_date: number;
  email: string;
  id: string;
  is_disabled: boolean;
  name: string;
  phone_number: string;
  surname: string;
}

// export interface Row {
//   name: string;
//   surname: string;
//   document: string;
//   phoneNumber: string;
//   socialWork: string;
//   reason: string;
//   illness: string;
//   illnessBackground: string;
//   medicalHistory: string;
//   familyBackground: string;
//   semiology: string;
//   habits: string;
//   diagnosis: string;
//   indication: string;
//   id: string;
// }

export interface PatientEditContainerProps {
  row: Row;
  close: () => void;
  setSnackBarMessageSuccess: (msg: string) => void;
}
