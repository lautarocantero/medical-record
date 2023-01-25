import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { useUserProfile } from './useUserProfile';
import PhoneSelect from '@/src/components/phone-select/PhoneSelect';
import CustomInput from '@/src/components/forms/CustomInput';
import CustomLoader from '@/src/components/custom-loader';

export const UserProfile = () => {
  const { SnackBar, values, isLoading, isUpdateUserLoading, goBack, handleSubmit, setFieldValue, errors } =
    useUserProfile();
  const { t } = useTranslation();
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Card sx={{ margin: '0% 10%', borderRadius: '.428rem' }}>
        <CardHeader
          title={t('user_profile_screen_title', { ns: 'auth' })}
          titleTypographyProps={{ variant: 'h5' }}
          sx={{
            borderBottom: `1px solid #ebe9f1`,
            width: '100%',
          }}
        />
        {isLoading ? (
          <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'center', margin: '1%' }}>
            <CustomLoader />
          </Grid>
        ) : (
          <Box>
            <CardContent sx={{ paddingBottom: '0px' }}>
              <Grid container spacing={2}>
                <Grid container item spacing={2}>
                  <Grid xs={12} md={6} lg={6} item>
                    <CustomInput
                      field="name"
                      errors={errors}
                      setFieldValue={setFieldValue}
                      values={values}
                      autoFocus
                      label={t('user_profile_form_name_field_label', { ns: 'auth' })}
                      placeholder={t('user_profile_form_name_field_placeholder', { ns: 'auth' })}
                      maxLength={50}
                    />
                  </Grid>
                  <Grid xs={12} md={6} lg={6} item>
                    <CustomInput
                      field="surname"
                      errors={errors}
                      setFieldValue={setFieldValue}
                      label={t('user_profile_form_surname_field_label', { ns: 'auth' })}
                      placeholder={t('user_profile_form_surname_field_placeholder', { ns: 'auth' })}
                      values={values}
                      maxLength={50}
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={2}>
                  <Grid xs={12} md={6} lg={6} item>
                    <PhoneSelect
                      values={values}
                      errors={errors}
                      setFieldValue={setFieldValue}
                      withBorder={false}
                      isDisabled
                      withPadding={false}
                    />
                  </Grid>
                  <Grid xs={12} md={6} lg={6} item>
                    <CustomInput
                      field="email"
                      errors={errors}
                      label={t('user_profile_form_email_field_label', { ns: 'auth' })}
                      setFieldValue={setFieldValue}
                      values={values}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid
                container
                columnGap={2}
                sx={{ placeContent: 'flex-end', paddingRight: '10px', paddingLeft: '10px' }}
              >
                <Grid item xs={12} md={1} lg={1} sx={{ width: '100%' }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={goBack}
                    sx={{ height: '90%' }}
                  >
                    {t('user_profile_screen_submit_cancel_text', { ns: 'auth' })}
                  </Button>
                </Grid>
                <Grid item xs={12} md={1} lg={1}>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    size="small"
                    variant="contained"
                    loading={isUpdateUserLoading}
                    sx={{ height: '90%' }}
                  >
                    {t('user_profile_screen_submit_button_text', { ns: 'auth' })}
                  </LoadingButton>
                </Grid>
              </Grid>
            </CardActions>
          </Box>
        )}
        <SnackBar />
      </Card>
    </Box>
  );
};
