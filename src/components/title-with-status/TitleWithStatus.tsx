import { Close } from '@mui/icons-material';
import { Typography, Box, Tooltip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import TextLabel from '../text-label/TextLabel';

interface TitleWithStatusProps {
  title: string;
  statusText: string;
  statusBg: string;
  onClose: () => void;
  addMargin?: boolean;
}

export const Container = styled(Box)(() => ({
  display: 'flex',
  gap: '16px',
}));

const Wrapper = styled(Box)(({ margin }: { margin: string }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  width: '100%',
  paddingTop: `${margin}`,
  marginLeft: `${margin}`,
}));

const FloatedToolTip = styled(Tooltip)(({ margin }: { margin: number }) => ({
  position: 'absolute',
  top: `${margin}`,
  right: -11,
}));

const TitleWithStatus = ({ title, statusText, statusBg, onClose, addMargin = true }: TitleWithStatusProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper margin={addMargin ? '10px' : '0px'}>
      <Container>
        <Typography variant="h5">{title}</Typography>
        <TextLabel text={statusText.toUpperCase()} color="#F7F7F7" padding="2px 12px" bg={statusBg} />
      </Container>
      <FloatedToolTip margin={addMargin ? 5 : -5} title={t('close')}>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </FloatedToolTip>
    </Wrapper>
  );
};

export default TitleWithStatus;
