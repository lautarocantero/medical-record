import BlockIcon from '@mui/icons-material/Block';
import GppGood from '@mui/icons-material/GppGood';
import { Box, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSnackBar from '../useSnackBar';
import DeleteDialog from './delete/DeleteDialog';
import { useCustomDataTable } from '../CustomDataTableContext';
import useDisable from '../hooks/useDisable';

const CanDisable = ({
  id,
  resource,
  isDisabled,
  fake,
}: {
  id: number | string;
  resource: string;
  isDisabled: boolean;
  fake?: boolean;
}) => {
  const { t } = useTranslation();
  const { isLoading, mutateDisable } = useDisable(resource, isDisabled, fake);
  const [openModal, setOpenModal] = useState(false);
  const { setNeedRefresh } = useCustomDataTable();
  const { setHasError, setOpenSnackBar, setMessage } = useSnackBar();

  const onDisable = (elementId: number) =>
    mutateDisable(elementId, {
      onSuccess: () => {
        setOpenSnackBar(true);
        setNeedRefresh(true);
        setMessage(
          t(isDisabled ? 'successful_enabled_snackbar_text' : 'successful_disabled_snackbar_text', {
            item: t('customers_modal_text', { ns: 'common' }),
            ns: 'common',
          }),
        );
      },
      onError: () => {
        setOpenSnackBar(true);
        setHasError(true);
        setMessage(
          t(isDisabled ? 'error_enabled_snackbar_text' : 'error_disabled_snackbar_text', {
            item: t('customers_modal_text', { ns: 'common' }),
            ns: 'common',
          }),
        );
      },
    });

  return (
    <>
      <Tooltip
        title={t(!isDisabled ? 'can_disable_modal_title' : 'can_enable_modal_title', {
          ns: 'cdtModal',
        })}
      >
        <Box onClick={() => setOpenModal(true)}>
          {!isDisabled ? (
            <BlockIcon sx={{ color: 'secondary.main', cursor: 'pointer' }} />
          ) : (
            <GppGood sx={{ color: 'secondary.main', cursor: 'pointer' }} />
          )}
        </Box>
      </Tooltip>
      <DeleteDialog
        title={t(isDisabled ? 'enabling_dialog_form_title' : 'disabling_dialog_form_title', {
          resource: `${resource.replace('-', '_')}_modal_text`,
        })}
        contentText={t(isDisabled ? 'enabling_dialog_form_content' : 'disabling_dialog_form_content', {
          resource: `${resource.replace('-', '_')}_modal_text`,
        })}
        open={openModal}
        setOpen={setOpenModal}
        onDelete={() => onDisable(id as number)}
        deleteStatus={isLoading}
      />
    </>
  );
};

export default CanDisable;
