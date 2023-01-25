import { Autocomplete, Box, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import PhoneSelect from '@/src/components/phone-select/PhoneSelect';
import CustomInput from '@/src/components/forms/CustomInput';
import CustomTextArea from '../../../../components/forms/text-area';
import { ErrorHelper } from '@/src/components/error/error-helper/ErrorHelper';
import { CircularSpinner } from '@/src/components/circular-spinner/CircularSpinner';
import { PatientFormProps } from '../../types';

const PatientEditForm = ({
  patientUserGroups,
  handleSubmit,
  values,
  setFieldValue,
  errors,
  loading,
  errorMessage,
  isSubmitLoading,
}: PatientFormProps) => {
  const { t } = useTranslation();
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginY: '5px' }}>
      {loading ? (
        <CircularSpinner />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="name"
              errors={errors}
              label={t('user_form_name_field_label', { ns: 'users' })}
              placeholder={t('user_form_name_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              autoFocus
              maxLength={50}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="surname"
              errors={errors}
              label={t('user_form_surname_field_label', { ns: 'users' })}
              placeholder={t('user_form_surname_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              maxLength={50}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="document"
              errors={errors}
              label={t('user_form_document_field_placeholder', { ns: 'users' })}
              placeholder={t('user_form_document_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              maxLength={50}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneSelect values={values} errors={errors} setFieldValue={setFieldValue} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="socialWork"
              errors={errors}
              label={t('user_form_socialWork_field_placeholder', { ns: 'users' })}
              placeholder={t('user_form_socialWork_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="reason"
              errors={errors}
              label={t('user_form_reason_field_placeholder', { ns: 'users' })}
              placeholder={t('user_form_reason_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="illness"
              errors={errors}
              label={t('user_form_illness_field_placeholder', { ns: 'users' })}
              placeholder={t('user_form_illness_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="illnessBackground"
              errors={errors}
              label={t('user_form_illnessBackground_field_placeholder', { ns: 'users' })}
              placeholder={t('user_form_illnessBackground_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="medicalHistory"
              errors={errors}
              label={t('user_form_medicalHistory_field_placeholder', { ns: 'users' })}
              placeholder={t('user_form_medicalHistory_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="familyBackground"
              errors={errors}
              label={t('user_form_familyBackground_field_placeholder', { ns: 'users' })}
              placeholder={t('user_form_familyBackground_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="semiology"
              errors={errors}
              label={t('user_form_semiology_field_placeholder', { ns: 'users' })}
              placeholder={t('user_form_semiology_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="habits"
              errors={errors}
              label={t('user_form_habits_field_placeholder', { ns: 'users' })}
              placeholder={t('user_form_habits_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="diagnosis"
              errors={errors}
              label={t('user_form_diagnosis_field_placeholder', { ns: 'users' })}
              placeholder={t('user_form_diagnosis_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              field="indication"
              errors={errors}
              label={t('user_form_indication_field_placeholder', { ns: 'users' })}
              placeholder={t('user_form_indication_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              required
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <ErrorHelper error={errorMessage} />
          </Grid>
          <Grid container item xs={12} sm={12} md={12} justifyContent="flex-end">
            <LoadingButton loading={isSubmitLoading} variant="contained" size="small" type="submit">
              {t('form_button_submit_text', { ns: 'users' })}
            </LoadingButton>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default PatientEditForm;
