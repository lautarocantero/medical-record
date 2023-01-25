import { Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DrawerList from './DrawerList';
import { useDrawerTools } from './UseDrawerTools';
import { FlexedDialog, SpanWrapper, Span } from './StyledDrawer';

const DrawerModal = (props: DrawerModalProps) => {
  const { open, onClose, theme } = props;
  const { t } = useTranslation();
  const { listButtonSelected, handleNavigate } = useDrawerTools();
  const navigateAndCloseModal = (listItem: any) => {
    handleNavigate(listItem);
    onClose();
  };

  return (
    <FlexedDialog open={open} onClose={onClose} fullScreen>
      <SpanWrapper>
        <Span>{t('menu')}</Span>
      </SpanWrapper>
      <DrawerList
        open={open}
        theme={theme}
        listButtonSelected={listButtonSelected}
        handleNavigate={navigateAndCloseModal}
      />
    </FlexedDialog>
  );
};

interface DrawerModalProps {
  open: boolean;
  onClose: () => void;
  theme: Theme;
}
export default DrawerModal;
