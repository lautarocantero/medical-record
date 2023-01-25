import { FunctionComponent } from 'react';
import { IconButton, Tooltip, Box, Typography, Modal } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import useDialog from '@/src/hooks/useDialog';
import useSnackBar from '../useSnackBar';
import { TLanguagesOptions } from '@/src/utilities/helpers/commonTypes';
import TableHeaderButton from '../../table-header-button/TableHeaderButton';
import { CustomIconProps } from '../types/DataTableFormModal';

interface CustomTableActionProps {
  component?: FunctionComponent;
  modalTitle: string;
  type: string;
  Icon: (props: CustomIconProps) => JSX.Element;
  row?: any;
  width?: string | TLanguagesOptions;
  ButtonElement?: (props: { open: () => void }) => JSX.Element;
  customizedTitle?: boolean;
}
const CustomTableAction = ({
  component,
  modalTitle,
  type,
  Icon,
  row,
  width = '40%',
  ButtonElement,
  customizedTitle,
}: CustomTableActionProps) => {
  const { isOpen, open, close } = useDialog();
  const { setSnackBarMessageError, setSnackBarMessageSuccess } = useSnackBar();
  const { t } = useTranslation();

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width,
    minWidth: `${width ? '305px' : '400px'}`,
    height: 'auto',
    maxHeight: { xs: '560px', sm: '638px' },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 2,
    overflow: 'auto',
  };
  return (
    <>
      {type === 'create' ? (
        <TableHeaderButton text={t('add_button_text')} handleClick={open} Icon={AddIcon} />
      ) : (
        (ButtonElement && ButtonElement({ open })) || (
          <Tooltip title={t(type, { ns: 'cdtModal' })}>
            <Box onClick={() => open()}>
              <Icon sx={{ color: 'secondary.main', cursor: 'pointer' }} row={row} />
            </Box>
          </Tooltip>
        )
      )}
      {isOpen && (
        <Modal
          open={isOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ overflowY: 'auto', mt: '10px', mb: '10px' }}
        >
          <Box component="div" sx={style}>
            {!customizedTitle && (
              <>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {t(`${modalTitle.replaceAll('-', '_').toLocaleLowerCase()}_${type}`, { ns: 'cdtModal' })}
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={close}
                  sx={{
                    color: (theme) => theme.palette.grey[500],
                    position: 'absolute',
                    right: 8,
                    top: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </>
            )}
            {component &&
              component({
                close,
                setSnackBarMessageError,
                setSnackBarMessageSuccess,
                row,
              })}
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CustomTableAction;
