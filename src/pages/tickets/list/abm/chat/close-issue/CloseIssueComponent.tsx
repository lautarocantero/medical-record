import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { closesIssueById } from '@/src/api/endpoints/support';
import { CloseIssueConfirmation } from './CloseIssueConfirmation';

const CloseIssueComponent = ({ row, setSnackBarMessageSuccess, status }: any) => {
  const { t } = useTranslation();
  const [openClosingIssueModal, setOpenClosingIssueModal] = useState(false);
  const [proceedClosingIssue, setProceedClosingIssue] = useState(false);
  const [errorClosingIssue, setErrorClosingIssue] = useState<string | null>(null);
  const [closingComment, setClosingComment] = useState('');

  const { mutate: closeIssueById, isLoading: isLoadingPostingClosingComment } = useMutation(closesIssueById, {
    onSuccess: async () => {
      setSnackBarMessageSuccess(t('chat_detail_issue_closing_success', { ns: 'tickets' }));
    },
    onError: async () => {
      setErrorClosingIssue(t('chat_detail_issue_closing_error', { ns: 'tickets' }));
    },
  });

  const handleClosingIssue = () => {
    setOpenClosingIssueModal(true);
  };

  const handleClosingIssueProceed = () => {
    setProceedClosingIssue(true);
  };

  const handleClosiingIssueComplete = () => {
    const commentData = {
      id: row.id,
      closingData: {
        closing_comment: closingComment,
      },
    };
    closeIssueById(commentData);
  };

  const handleReturnToChat = () => {
    setProceedClosingIssue(false);
    setOpenClosingIssueModal(false);
  };

  return (
    <>
      <IconButton disabled={status === 'Closed'} aria-label="settings" onClick={handleClosingIssue}>
        <Tooltip title={t('ticket_chat_marked_done', { ns: 'tickets' })}>
          <DoneAllIcon />
        </Tooltip>
      </IconButton>
      {openClosingIssueModal && (
        <CloseIssueConfirmation
          open={openClosingIssueModal}
          onProceed={handleClosingIssueProceed}
          proceed={proceedClosingIssue}
          onClose={handleReturnToChat}
          issueName={row.title}
          closingComment={closingComment}
          setClosingComment={setClosingComment}
          handleClosiingIssueComplete={handleClosiingIssueComplete}
          isLoading={isLoadingPostingClosingComment}
          errorClosingIssue={errorClosingIssue}
        />
      )}
    </>
  );
};

export default CloseIssueComponent;
