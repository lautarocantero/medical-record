import { FormikErrors, FormikValues } from 'formik';

export interface PhoneSelectProps {
  autoFocusFirstInput?: boolean;
  values: FormikValues;
  errors?: FormikErrors<FormikValues>;
  setFieldValue: (fieldValue: string, value: string) => void;
  withBorder?: boolean;
  withPadding?: boolean;
  isDisabled?: boolean;
}
