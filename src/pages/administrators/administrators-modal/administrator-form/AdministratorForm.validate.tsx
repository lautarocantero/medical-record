import * as Yup from 'yup';

export const validate = (t: any) =>
  Yup.lazy(() =>
    Yup.object().shape({
      adminGroups: Yup.array().min(1, t('required_field', { ns: 'errors' })),
      confirmPassword: Yup.string()
        .required(t('required_field', { ns: 'errors' }))
        .oneOf([Yup.ref('password'), null], t('user_form_passwords_field_do_not_match_validation', { ns: 'users' })),
      email: Yup.string()
        .required(t('required_field', { ns: 'errors' }))
        .email(t('user_form_invalid_email_field_validation', { ns: 'users' }))
        .trim(),
      name: Yup.string().required(t('required_field', { ns: 'errors' })),
      password: Yup.string().required(t('required_field', { ns: 'errors' })),
      surname: Yup.string().required(t('required_field', { ns: 'errors' })),
      phoneNumber: Yup.string().required(t('required_field', { ns: 'errors' })),
      countryCode: Yup.string().required(t('required_field', { ns: 'errors' })),
      areaCode: Yup.string().required(t('required_field', { ns: 'errors' })),
    }),
  );
