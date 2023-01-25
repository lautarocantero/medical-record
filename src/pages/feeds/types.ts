import { FormikErrors, FormikValues } from 'formik';

export interface CreateFeedFormProps {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  values: FormikValues;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<FormikValues>>;
  errors: FormikErrors<FormikValues>;
  isLoadingSubmit: boolean;
  errorMessage: string | null;
  disableButton: boolean;
  setDisableButton: React.Dispatch<React.SetStateAction<boolean>>;
}
