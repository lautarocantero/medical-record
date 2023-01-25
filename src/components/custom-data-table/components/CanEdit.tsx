import EditIcon from '@mui/icons-material/Edit';
import { Box, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useDialog from '@/src/hooks/useDialog';
import useEdit from '../hooks/useEdit';
import useSnackBar from '../useSnackBar';

const CanEdit = ({
  id,
  resource,
  component,
}: {
  id: number | string;
  resource: string;
  component: React.FunctionComponent;
}) => {
  const { Modal, isOpen, open, close } = useDialog();
  const { setSnackBarMessageError, setSnackBarMessageSuccess } = useSnackBar();
  const { t } = useTranslation();
  const { onEdit, status, data } = useEdit(resource);

  return (
    <>
      <Tooltip title={t('can_edit_modal_title', { ns: 'cdtModal' })}>
        <Box
          onClick={() => {
            onEdit(id as string);
            open();
          }}
        >
          <EditIcon sx={{ color: 'secondary.main', cursor: 'pointer' }} />
        </Box>
      </Tooltip>
      {status === 'fulfilled' && isOpen && (
        <Modal title={t('edition_dialog_form_title', { resource: `${resource.replace('-', '_')}_modal_text` })}>
          {component({ close, entity: data, setSnackBarMessageError, setSnackBarMessageSuccess })}
        </Modal>
      )}
    </>
  );
};

export default CanEdit;
