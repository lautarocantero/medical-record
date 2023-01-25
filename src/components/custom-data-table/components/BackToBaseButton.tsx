import { ArrowBack } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const BackToBaseButton = ({ backToBase, disabled }: BackToBaseButtonProps) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('back', { ns: 'cdtModal' })} sx={{ width: '10%' }}>
      <IconButton sx={{ color: 'secondary.main' }} onClick={() => backToBase()} disabled={disabled}>
        <ArrowBack />
      </IconButton>
    </Tooltip>
  );
};

interface BackToBaseButtonProps {
  backToBase: () => void;
  disabled?: boolean;
}

export default BackToBaseButton;
