import { Delete } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomDataTable } from '../../CustomDataTableContext';
import useDelete from '../../hooks/useDelete';
import useSnackBar from '../../useSnackBar';
import DeleteDialog from './DeleteDialog';

const CanDelete = ({
  id,
  resource,
  fake,
  pathApi,
}: {
  id: number | string;
  resource: string;
  fake: boolean;
  pathApi: string;
}) => {
  const { mutateDelete, isLoading } = useDelete(fake, pathApi);
  const [deleteModal, setDeleteModal] = useState(false);
  const { setNeedRefresh } = useCustomDataTable();
  const { t } = useTranslation();
  const { setHasError, setOpenSnackBar, setMessage } = useSnackBar();

  const onDelete = (elementId: number) =>
    mutateDelete(elementId, {
      onSuccess: () => {
        setOpenSnackBar(true);
        setNeedRefresh(true);
        setMessage(
          t('successful_deletion_snackbar_text', {
            item: t(`${resource.replace('-', '_')}_modal_text`, { ns: 'common' }),
            pronoun: ['activities', 'agendas', 'feed', 'categories'].includes(resource) ? 'La' : 'El',
            ns: 'common',
          }),
        );
      },
      onError: () => {
        setOpenSnackBar(true);
        setHasError(true);
        setMessage(
          t('error_deletion_snackbar_text', {
            item: t(`${resource.replace('-', '_')}_modal_text`, { ns: 'common' }),
            pronoun: ['activities', 'agendas', 'feed', 'categories'].includes(resource) ? 'una' : 'un',
            ns: 'common',
          }),
        );
      },
    });
  return (
    <>
      <Tooltip title={t('deletion_dialog_form_title', { resource: resource.replace('-', '_') })}>
        <Box onClick={() => setDeleteModal(true)}>
          <Delete sx={{ color: 'secondary.main', cursor: 'pointer' }} />
        </Box>
      </Tooltip>
      <DeleteDialog
        title={t('deletion_dialog_form_title', {
          resource: `${resource.replace('-', '_')}_modal_text`,
        })}
        contentText={t('deleting_dialog_form_content_can_delete', {
          item: `${resource.replace('-', '_')}_modal_text`,
          pronoun: ['activities', 'agendas', 'feed', 'categories'].includes(resource) ? 'esta' : 'este',
          ns: 'common',
        })}
        open={deleteModal}
        setOpen={setDeleteModal}
        onDelete={() => onDelete(id as number)}
        deleteStatus={isLoading}
      />
    </>
  );
};

export default CanDelete;
