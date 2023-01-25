import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
} from '@mui/material';
import React from 'react';
import { LoadingButton } from '@mui/lab';

import { useTranslation } from 'react-i18next';
import { useChangePassword } from './useChangePassword';
import CustomPasswordInput from '@/src/components/forms/CustomPasswordInput';

export const ChangePassword = () => {
  const { goBack, isLoading, values, errors, handleSubmit, setFieldValue, SnackBar } = useChangePassword();
  const { t } = useTranslation();
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Card sx={{ margin: '0% 10%', borderRadius: '.428rem' }}>
        <CardHeader
          title={t('change_password_screen_title', { ns: 'auth' })}
          titleTypographyProps={{ variant: 'h5' }}
          sx={{
            borderBottom: `1px solid #ebe9f1`,
            // p: 1,
            width: '100%',
          }}
        />
        <SnackBar />
        <CardContent sx={{ paddingBottom: '0px' }}>
          <Grid container spacing={2}>
            <Grid container item spacing={2}>
              <Grid xs={12} md={6} lg={6} item>
                <CustomPasswordInput
                  field="currentPassword"
                  errors={errors}
                  label={t('change_password_screen_current_password_label', { ns: 'auth' })}
                  placeholder="******"
                  setFieldValue={setFieldValue}
                  values={values}
                  maxLength={20}
                  autoFocus
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid xs={12} md={6} lg={6} item>
                <CustomPasswordInput
                  field="newPassword"
                  errors={errors}
                  label={t('change_password_screen_new_password_label', { ns: 'auth' })}
                  placeholder="******"
                  setFieldValue={setFieldValue}
                  values={values}
                  maxLength={20}
                />
              </Grid>
              <Grid xs={12} md={6} lg={6} item>
                <CustomPasswordInput
                  field="confirmPassword"
                  errors={errors}
                  label={t('change_password_screen_confirm_new_password_label', { ns: 'auth' })}
                  placeholder="******"
                  setFieldValue={setFieldValue}
                  values={values}
                  maxLength={20}
                />
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ margin: '1% 0%' }}>
            <Typography gutterBottom variant="body1" component="div" fontWeight="bold">
              {t('change_password_screen_requirements_title', { ns: 'auth' })}
            </Typography>
            <List
              sx={{
                listStyleType: 'disc',
                pl: 3,
                '& .MuiListItem-root': {
                  display: 'list-item',
                  padding: '0px',
                },
              }}
            >
              <ListItem>
                <Typography gutterBottom variant="body2" component="div">
                  {t('change_password_screen_password_characters_length_requirements', { ns: 'auth' })}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography gutterBottom variant="body2" component="div">
                  {t('change_password_screen_password_characters_case_requirements', { ns: 'auth' })}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography gutterBottom variant="body2" component="div">
                  {t('change_password_screen_password_special_characters_requirements', { ns: 'auth' })}
                </Typography>
              </ListItem>
            </List>
          </Box>
        </CardContent>
        <CardActions>
          <Grid container columnGap={2} sx={{ placeContent: 'flex-end', paddingRight: '10px', paddingLeft: '10px' }}>
            <Grid item xs={12} md={1} lg={1} sx={{ width: '100%' }}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                size="small"
                onClick={goBack}
                sx={{ height: '90%' }}
              >
                {t('change_password_screen_submit_cancel_text', { ns: 'auth' })}
              </Button>
            </Grid>
            <Grid item xs={12} md={1} lg={1}>
              <LoadingButton
                fullWidth
                type="submit"
                size="small"
                variant="contained"
                loading={isLoading}
                sx={{ height: '90%' }}
              >
                {t('change_password_screen_submit_button_text', { ns: 'auth' })}
              </LoadingButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
};
