import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextFieldProps,
} from '@mui/material';
import React, { useState } from 'react';

const PasswordField = ({
  name,
  label,
  variant,
  size,
  placeholder,
  value,
  onChange,
  fullWidth,
  error,
  helperText,
  inputProps,
  autoFocus,
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl variant={variant} fullWidth={fullWidth} error={error} size={size}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        id={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputProps={inputProps}
        autoComplete="off"
        autoFocus={autoFocus}
        aria-describedby={`${name}-helper-text`}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      <FormHelperText id={`${name}-helper-text`}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default PasswordField;
