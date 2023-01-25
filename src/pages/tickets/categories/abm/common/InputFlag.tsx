import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ErrorText } from '@/src/components/error/error-text/ErrorText';
import { InputFlagContainer, InputFlagWrapper, FlagWrapper } from '../styles/TicketsAbm.styled';

export const InputFlag = ({ code, label, errors, handleOnChange, values, index }: any) => {
  const { t } = useTranslation();

  return (
    <InputFlagContainer>
      <InputFlagWrapper>
        <TextField
          id="outlined-required"
          label={`${label} *`}
          size="small"
          fullWidth
          autoComplete="off"
          value={values[code] || ''}
          onChange={(e) => handleOnChange(code, e.target.value)}
          autoFocus={index === 0}
        />
        <ErrorText error={errors[code] && t('required_field', { ns: 'errors' })} />
      </InputFlagWrapper>
      <FlagWrapper>
        <img src={`https://flagcdn.com/32x24/${code}.png`} alt={`flag_${code}`} style={{ margin: '8px 0 auto auto' }} />
      </FlagWrapper>
    </InputFlagContainer>
  );
};
