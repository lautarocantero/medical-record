import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useTranslation } from 'react-i18next';
// import { FormikErrors } from 'formik';
import { Box, Typography } from '@mui/material';
import { DateValidationError } from '@mui/x-date-pickers/internals';
import { useLocation } from 'react-router-dom';
import i18n from 'i18next';
import useSnackBar from '../custom-snackbar/useSnackBar';
import './styles.css';

const CustomToolbar = (value: number) => {
  const { t } = useTranslation();
  if (value) {
    const textFormatted = new Date(value);
    const stringDateToShow = textFormatted.toString().slice(0, 15);
    const dayOfWeek = stringDateToShow.slice(0, 3);
    const monthOfYear = stringDateToShow.slice(4, 7);
    const date = stringDateToShow.slice(8, stringDateToShow.length);
    const format = `${t(`${dayOfWeek}`, { ns: 'date' })}, ${t(`${monthOfYear}`, { ns: 'date' })} ${date}`;

    return (
      <Box component="div" sx={{ pl: 2.5, pt: 2 }}>
        <Typography variant="h5">{format}</Typography>
      </Box>
    );
  }
  return (
    <Box component="div" sx={{ pl: 2.5, pt: 2 }}>
      <Typography variant="h5">{t('selectDate', { ns: 'residents' })}</Typography>
    </Box>
  );
};

export const CustomDatePicker = ({
  value,
  setFieldValue,
  fieldValue,
  isReadOnly,
  minDate,
  errorMessage,
  placeholder,
  required,
  width,
  minWidth,
}: DatePickerProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { setHasError, setMessage, setOpen } = useSnackBar();

  const handleErrorNotification = (error: DateValidationError) => {
    if (error && location.pathname !== '/customers') {
      setOpen(true);
      setHasError(true);
      setMessage(t('updateDate', { ns: 'padron' }));
    } else {
      setOpen(false);
      setHasError(false);
    }
  };

  const handlerDateSelector = (newValue: any): void => {
    if (newValue && newValue.$d) {
      const getMilis = new Date(newValue.$d);
      getMilis.setHours(0);
      getMilis.setMinutes(0);
      getMilis.setSeconds(0);
      getMilis.setMilliseconds(0);
      setFieldValue(fieldValue, getMilis.getTime());
    } else {
      setFieldValue(fieldValue, null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language}>
      <MobileDatePicker
        disabled={isReadOnly}
        dayOfWeekFormatter={(day: string) => day.charAt(0).toUpperCase()}
        ToolbarComponent={() => CustomToolbar(value)}
        label={placeholder || `${t(fieldValue, { ns: 'date' })}${required ? ' * ' : ''}`}
        value={value}
        minDate={minDate}
        onError={(reason: DateValidationError) => handleErrorNotification(reason)}
        onChange={(newValue) => handlerDateSelector(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth={!width}
            size="small"
            id="outlined-size-small"
            variant="outlined"
            error={errorMessage}
            helperText={errorMessage}
            sx={{
              width,
              minWidth,
              input: {
                WebkitTextFillColor: isReadOnly ? 'rgba(0,0,0,0.6) !important' : '',
                color: isReadOnly ? 'rgba(0,0,0,0.7) !important' : '',
                opacity: isReadOnly ? 0.7 : '',
                backgroundColor: isReadOnly ? 'rgba(0,0,0,0.05) ' : '',
              },
              label: {
                color: isReadOnly ? 'rgba(0,0,0,1) !important' : '',
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

// interface DatePickerProps {
//   value: number;
//   setFieldValue: (
//     field: string,
//     value: string | number | boolean | any,
//     shouldValidate?: boolean | undefined,
//   ) =>
//     | Promise<void>
//     | Promise<
//         FormikErrors<{
//           name: string;
//           surname: string;
//           email: string;
//           areaCode: string | undefined;
//           countryCode: string | undefined;
//           phoneNumber: string | undefined;
//           from: null;
//           to: null;
//         }>
//       >;
//   fieldValue: string;
//   isReadOnly: boolean;
//   minDate: number;
//   errorMessage?: any;
//   placeholder?: string;
//   required?: boolean;
//   width?: string;
//   minWidth?: string;
// }

interface DatePickerProps {
  value: number;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  fieldValue: string;
  isReadOnly: boolean;
  minDate: number | Date;
  errorMessage?: any;
  placeholder?: string;
  required?: boolean;
  width?: string;
  minWidth?: string;
}
