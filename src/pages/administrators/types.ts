import { FormikErrors, FormikValues } from 'formik';
import { FormEvent } from 'react';

export interface AdminUsers {
  id: number;
  name: string;
}

export interface AdminFormProps {
  adminUserGroups: Array<AdminUsers> | undefined | null;
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

export interface AdminEditContainerProps {
  row: Row;
  close: () => void;
  setSnackBarMessageSuccess: (msg: string) => void;
}
