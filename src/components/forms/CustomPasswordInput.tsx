import React from 'react';
import PasswordField from '../password-field/PasswordField';

const CustomPasswordInput = (props: any) => {
  const { field, values, errors, setFieldValue, autoFocus, label, placeholder, maxLength, required } = props;
  return (
    <PasswordField
      autoFocus={autoFocus}
      size="small"
      fullWidth
      id={`${field}`}
      label={`${label}${required ? ' * ' : ''}`}
      type="text"
      value={values[field]}
      onChange={({ target }: any) => {
        setFieldValue(`${field}`, target.value);
      }}
      error={errors[field] !== undefined}
      helperText={errors[field]?.toString()}
      placeholder={placeholder}
      inputProps={{ maxLength: maxLength ?? '' }}
      variant="outlined"
    />
  );
};

export default CustomPasswordInput;
