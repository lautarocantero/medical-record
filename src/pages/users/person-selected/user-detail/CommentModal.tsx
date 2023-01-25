import { Box, Grid, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { DetailGenericoProps } from './types';
import CustomTextArea from '@/src/components/forms/text-area';
import { ModalContentWrapper } from '@/src/pages/feeds/styles/CreateFeed.styled';

const CommentModal = ({ row, open, handleClose }: DetailGenericoProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContentWrapper>
        <Box>
          <Typography variant="h6" mb={2}>
            {t('comments', { ns: 'customerUsers' })}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid container>
          <CustomTextArea
            id="comments"
            placeholder={t('comments', { ns: 'customerUsers' })}
            minRows={3}
            style={{
              width: '100%',
              height: '40px',
              fontFamily: 'Roboto',
              padding: '4px',
              backgroundColor: 'rgb(0,0,0,0.05)',
            }}
            value={row?.comments}
            onChange={() => null}
            disabled
          />
        </Grid>
      </ModalContentWrapper>
    </Modal>
  );
};
export default CommentModal;
