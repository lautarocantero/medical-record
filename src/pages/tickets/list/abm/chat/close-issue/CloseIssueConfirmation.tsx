import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography, Modal, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ErrorText } from '@/src/components/error/error-text/ErrorText';
import { ClosingIssueProps } from '../../../../types';
import { ModalContentWrapper } from '@/src/pages/feeds/styles/CreateFeed.styled';
import { StyledTextArea } from './CloseIssue.styled';

export const CloseIssueConfirmation = ({
  open,
  onProceed,
  proceed,
  onClose,
  issueName,
  closingComment,
  setClosingComment,
  handleClosiingIssueComplete,
  isLoading,
  errorClosingIssue,
}: ClosingIssueProps) => {
  const { t } = useTranslation();
  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <ModalContentWrapper>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {t('chat_detail_close_issue_confirm_title', { ns: 'tickets' })}
          {issueName ? `- ${issueName}` : ''}
        </Typography>
        {!proceed && (
          <Typography id="modal-modal-title" variant="subtitle2">
            {t('tickets_closing_confirming_message', { ns: 'tickets' })}
          </Typography>
        )}
        {proceed && (
          <>
            <StyledTextArea
              aria-label="empty textarea"
              placeholder={t('tickets_closing_question', { ns: 'tickets' })}
              value={closingComment}
              onChange={(e) => setClosingComment(e.target.value)}
            />
            <ErrorText error={errorClosingIssue as string} />
          </>
        )}
        <Box component="div" sx={{ widht: '100%', textAlign: 'right', pt: 1 }}>
          <Button size="small" type="button" variant="outlined" color="secondary" onClick={onClose} sx={{ mr: 1 }}>
            {t('delete_dialog_cancel_button_text', { ns: 'common' })}
          </Button>
          <LoadingButton
            size="small"
            type="button"
            variant="contained"
            loading={isLoading}
            disabled={proceed && closingComment.length === 0}
            onClick={() => (proceed ? handleClosiingIssueComplete() : onProceed())}
          >
            {proceed
              ? t('submitting_button_text', { ns: 'common' })
              : t('delete_dialog_submit_button_text', { ns: 'common' })}
          </LoadingButton>
        </Box>
      </ModalContentWrapper>
    </Modal>
  );
};
