import { Autocomplete, Box, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import PhoneSelect from '@/src/components/phone-select/PhoneSelect';
import CustomInput from '@/src/components/forms/CustomInput';
import CustomPasswordInput from '@/src/components/forms/CustomPasswordInput';
import CustomTextArea from '../../../../components/forms/text-area';
import { ErrorHelper } from '@/src/components/error/error-helper/ErrorHelper';
import { AdminFormProps } from '../../types';
import { CircularSpinner } from '@/src/components/circular-spinner/CircularSpinner';

const AdministratorForm = ({
  adminUserGroups,
  handleSubmit,
  values,
  setFieldValue,
  errors,
  loading,
  errorMessage,
  isSubmitLoading,
}: AdminFormProps) => {
  const { t } = useTranslation();

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginY: '5px' }}>
      {loading ? (
        <CircularSpinner />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={6}>
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
          <Grid item xs={12} sm={4} md={6}>
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
          <Grid item xs={12} sm={4} md={6}>
            <CustomInput
              field="email"
              errors={errors}
              label={t('user_form_email_field_label', { ns: 'users' })}
              placeholder={t('user_form_email_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <PhoneSelect values={values} errors={errors} setFieldValue={setFieldValue} />
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <CustomPasswordInput
              field="password"
              errors={errors}
              label={t('user_form_password_field_label', { ns: 'users' })}
              placeholder={t('user_form_password_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              maxLength={20}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <CustomPasswordInput
              field="confirmPassword"
              errors={errors}
              label={t('user_form_confirmPassword_field_label', { ns: 'users' })}
              placeholder={t('user_form_confirmPassword_field_placeholder', { ns: 'users' })}
              setFieldValue={setFieldValue}
              values={values}
              maxLength={20}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <Autocomplete
              multiple
              id="adminGroups"
              size="small"
              value={adminUserGroups?.filter((group: any) => values?.adminGroups?.some((g: any) => g.id === group.id))}
              getOptionLabel={(option) => option?.name}
              options={adminUserGroups ?? []}
              onChange={(e, value) => {
                setFieldValue('adminGroups', value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={`${t('user_form_admin_groups_field_label', { ns: 'users' })} * `}
                  placeholder={t('user_form_admin_groups_field_placeholder', { ns: 'users' })}
                  error={errors.adminGroups !== undefined}
                  helperText={errors.adminGroups?.toString()}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <CustomTextArea
              id="notes"
              placeholder={t('user_form_notes_field_placeholder', { ns: 'users' })}
              minRows={3}
              style={{ width: '100%', height: '40px' }}
              value={values.notes}
              maxLength={500}
              onChange={(e) => {
                setFieldValue('notes', e.target.value);
              }}
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

export default AdministratorForm;
