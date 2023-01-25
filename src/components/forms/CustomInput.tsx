import { TextField } from '@mui/material';
import React from 'react';
import { CustomInputStyles } from './styles';

const CustomInput = React.forwardRef((props: any, ref) => {
  const {
    field,
    values,
    noError,
    errors,
    setFieldValue,
    autoFocus,
    disabled,
    label,
    placeholder,
    value,
    regex,
    maxLength,
    required,
    style,
  } = props;
  return (
    <TextField
      inputRef={ref}
      autoFocus={autoFocus}
      fullWidth
      size="small"
      id={`${field}`}
      label={`${label}${required ? ' * ' : ''}`}
      type="name"
      value={value ?? values[field]}
      onChange={({ target }: any) => {
        setFieldValue(`${field}`, regex ? target.value.replace(regex, '') : target.value);
      }}
      sx={CustomInputStyles(disabled)}
      error={!noError && errors[field] !== undefined}
      helperText={!noError && errors[field]?.toString()}
      placeholder={placeholder}
      inputProps={{ maxLength: maxLength ?? '', style: { ...style } }}
      variant="outlined"
      disabled={disabled}
      autoComplete="off"
    />
  );
});
CustomInput.displayName = 'CustomInput';

export default CustomInput;
