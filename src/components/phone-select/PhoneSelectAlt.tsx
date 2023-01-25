import React from 'react';
import { FormControl, Input, InputLabel, Box, MenuItem, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { countries } from './Countries';
import './styles.css';
import { BoxStyles, FormControlStyles, InputLabelStyles, SelectStyles, MenuItemStyles } from './GetStyles';
import { ErrorText } from '../error/error-text/ErrorText';
import { PhoneSelectProps } from './Types';

const PhoneSelectAlt = ({ values, errors, setFieldValue, isDisabled }: PhoneSelectProps) => {
  const { t } = useTranslation();
  const disabledProps = {
    WebkitTextFillColor: isDisabled ? 'rgba(0,0,0,0.6) !important' : '',
    color: isDisabled ? 'rgba(0,0,0,0.6) !important' : '',
  };
  return (
    <>
      <Box
        sx={{
          ...BoxStyles,
          backgroundColor: isDisabled ? 'rgba(0,0,0,0.05) ' : '',
        }}
      >
        <FormControl
          fullWidth
          sx={{
            ...FormControlStyles,
          }}
        >
          <InputLabel htmlFor="my-input" sx={{ ...InputLabelStyles, opacity: isDisabled ? 0.7 : '' }}>
            {t('phone_select_phone_number_field_label', { ns: 'common' })}
          </InputLabel>
          <Select
            variant="standard"
            label="Prefix"
            value={values.countryCode}
            id="country_code"
            onChange={(e: SelectChangeEvent) => setFieldValue('countryCode', e.target.value as string)}
            size="small"
            sx={{
              ...SelectStyles,
            }}
            fullWidth
            disabled={isDisabled}
          >
            {countries.map((country: { code: string; phone: string; label: string }) => (
              <MenuItem
                key={country.phone}
                value={country.phone}
                sx={{
                  ...MenuItemStyles,
                }}
              >
                <img src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`} width="20" alt={country.code} />{' '}
                <Typography
                  sx={{
                    display: 'unset',
                    ...disabledProps,
                  }}
                >
                  {country.phone}
                </Typography>
              </MenuItem>
            ))}
          </Select>
          <Input
            placeholder={t('area_code', { ns: 'padron' })}
            type="number"
            size="small"
            id="area_code"
            value={values.areaCode}
            // fullWidth={fullWidth}
            disabled={isDisabled}
            sx={{
              paddingBottom: '2px',
              width: '30%',
              input: {
                ...disabledProps,
              },
            }}
            onChange={(e: any) => setFieldValue('areaCode', e.target.value)}
          />
          <Input
            placeholder={t('phone_number', { ns: 'padron' })}
            type="number"
            size="small"
            id="phone_number"
            value={values.phoneNumber}
            // fullWidth
            disabled={isDisabled}
            sx={{
              padding: 0,
              width: '40%',
              input: {
                ...disabledProps,
              },
            }}
            onChange={(e: any) => setFieldValue('phoneNumber', e.target.value)}
          />
        </FormControl>
      </Box>
      <ErrorText
        error={(errors?.areaCode as string) || (errors?.countryCode as string) || (errors?.phoneNumber as string)}
      />
    </>
  );
};

PhoneSelectAlt.defaultProps = {
  isDisabled: false,
};

export default React.memo(PhoneSelectAlt);
