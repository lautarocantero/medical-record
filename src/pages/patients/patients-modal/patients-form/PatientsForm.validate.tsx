import * as Yup from 'yup';

export const validate = (t: any) =>
  Yup.lazy(() =>
    Yup.object().shape({
      adminGroups: Yup.array().min(1, t('required_field', { ns: 'errors' })),
      name: Yup.string().required(t('required_field', { ns: 'errors' })),
      surname: Yup.string().required(t('required_field', { ns: 'errors' })),
      document: Yup.string().required(t('required_field', { ns: 'errors' })),
      phoneNumber: Yup.string().required(t('required_field', { ns: 'errors' })),
      socialWork: Yup.string().required(t('required_field', { ns: 'errors' })),
      reason: Yup.string().required(t('required_field', { ns: 'errors' })),
      illness: Yup.string().required(t('required_field', { ns: 'errors' })),
      illnessBackground: Yup.string().required(t('required_field', { ns: 'errors' })),
      medicalHistory: Yup.string().required(t('required_field', { ns: 'errors' })),
      familyBackground: Yup.string().required(t('required_field', { ns: 'errors' })),
      semiology: Yup.string().required(t('required_field', { ns: 'errors' })),
      habits: Yup.string().required(t('required_field', { ns: 'errors' })),
      diagnosis: Yup.string().required(t('required_field', { ns: 'errors' })),
      indication: Yup.string().required(t('required_field', { ns: 'errors' })),
    }),
  );
