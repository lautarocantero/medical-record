import React from 'react';
import { Box, TextField, Autocomplete, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { countries } from './Countries';
import { ErrorText } from '../error/error-text/ErrorText';
import { PhoneSelectProps } from './Types';

const PhoneSelect = (props: PhoneSelectProps) => {
  const { t } = useTranslation();
  const { values, errors, isDisabled, setFieldValue, autoFocusFirstInput } = props;

  const countryCode = /[^+0-9]/;
  const numberRegex = /[^0-9]/;
  const handleCountryCode = (value: string) => {
    setFieldValue('countryCode', value.replace(countryCode, ''));
  };
  const handleAreaCode = (value: string) => {
    setFieldValue('areaCode', value.replace(numberRegex, ''));
  };
  const handlePhoneNumber = (value: string) => {
    setFieldValue('phoneNumber', value.replace(numberRegex, ''));
  };
  const customInputStyles = {
    input: {
      WebkitTextFillColor: isDisabled ? 'rgba(0,0,0,0.6) !important' : '',
      color: isDisabled ? 'rgba(0,0,0,0.6) !important' : '',
      opacity: isDisabled ? 0.7 : '',
      backgroundColor: isDisabled ? 'rgba(0,0,0,0.05) ' : '',
    },
    label: {
      color: isDisabled ? 'rgba(0,0,0,1) !important' : '',
    },
  };
  return (
    <Grid
      sx={{
        borderBottom: 'none',
        borderRadius: '5px',
        display: { md: 'flex', sm: 'inline' },
        maxWidth: '100%',
        // height: '54px',
      }}
    >
      <Box
        component="div"
        sx={{ display: 'flex', width: '100%', paddingBottom: { lg: '0px', md: '8px', sm: '8px', xs: '8px' } }}
      >
        <Autocomplete
          id="country-select-demo"
          size="small"
          sx={{
            width: 300,
            height: 'max-content',
            backgroundColor: isDisabled ? 'rgba(0,0,0,0.05) ' : '',
            marginRight: { lg: '0px', md: '0px', sm: '10px', xs: '10px' },
          }}
          options={countries || [{ phone: '', code: '', label: '' }]}
          disabled={isDisabled}
          autoHighlight
          autoSelect
          value={{ phone: values?.countryCode, code: '', label: '' }}
          isOptionEqualToValue={(option: { label: string; phone: string; code: string }) => {
            if (values?.countryCode === '') return option.phone === '+549';
            return option.phone === values.countryCode;
          }}
          getOptionLabel={(option: any) => option.phone}
          onChange={(e: any, value: any) => value && handleCountryCode(value.phone)}
          renderOption={(propss: any, option: any) => (
            <Box component="li" sx={{ '& > img': { flexShrink: 0, mr: 2 } }} {...propss}>
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt="flag_icon"
              />
              ({option.code}) {option.phone}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              size="small"
              value={values?.countryCode}
              autoFocus={autoFocusFirstInput}
              label={t('phone_select_country_code_field_label', { ns: 'common' })}
              error={!!errors?.countryCode}
              helperText={<ErrorText error={errors?.countryCode as string} />}
              sx={{
                input: {
                  WebkitTextFillColor: isDisabled ? 'rgba(0,0,0,0.6) !important' : '',
                  maxLength: 4,
                },
                label: {
                  color: isDisabled ? 'rgba(0,0,0,1) !important' : '',
                },
              }}
            />
          )}
        />
        <TextField
          size="small"
          disabled={isDisabled}
          sx={{ ...customInputStyles, width: { lg: '45%', md: '100%', sm: '100%' } }}
          inputProps={{ maxLength: 6 }}
          // type="number"
          id="outlined-basic-area-code"
          label={t('phone_select_area_code_field_label', { ns: 'common' })}
          variant="outlined"
          autoComplete="off"
          value={values?.areaCode || ''}
          error={!!errors?.areaCode || !!errors?.countryCode}
          onChange={(e) => handleAreaCode(e.target.value)}
          helperText={<ErrorText error={errors?.areaCode as string} />}
        />
      </Box>
      <TextField
        size="small"
        id="outlined-basic-phone-number"
        sx={{ ...customInputStyles, width: '100%' }}
        inputProps={{ maxLength: 10 }}
        // type="number"
        label={t('phone_select_phone_number_field_label', { ns: 'common' })}
        variant="outlined"
        autoComplete="off"
        value={values?.phoneNumber || ''}
        error={!!errors?.phoneNumber || !!errors?.countryCode}
        disabled={isDisabled}
        onChange={(e) => handlePhoneNumber(e.target.value)}
        helperText={<ErrorText error={errors?.phoneNumber as string} />}
      />
    </Grid>
  );
};

export default PhoneSelect;
