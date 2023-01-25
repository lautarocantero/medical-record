import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getsIssueById } from '@/src/api/endpoints/support';
import { ChatComponent } from './ChatComponent';
import { CircularSpinner } from '@/src/components/circular-spinner/CircularSpinner';
import { MessageType, IncomingTableProps } from '../../../types';
import { useCustomDataTable } from '@/src/components/custom-data-table/CustomDataTableContext';

const ChatComponentContainer = (props: IncomingTableProps) => {
  const { row, setSnackBarMessageSuccess, close } = props;
  const { t } = useTranslation();

  const { setNeedRefresh } = useCustomDataTable();

  const [openBiggerImage, setOpenBiggerImage] = useState(false);
  const [imageSelectedUrl, setImageSelectedUrl] = useState<string | null>(null);

  const chatBoxReference: React.MutableRefObject<HTMLDivElement | null> = useRef(
    null,
  ) as React.MutableRefObject<HTMLDivElement | null>;

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`data_${row.id}`],
    queryFn: () => getsIssueById({ id: row.id }),
  });

  useEffect(() => {
    chatBoxReference?.current?.scrollIntoView();
  }, [data]);

  const handleOpenImageViewer = (textInfo: MessageType) => {
    setImageSelectedUrl(textInfo.image_url);
    setOpenBiggerImage(true);
  };

  const handleCloseImageViewer = () => {
    setImageSelectedUrl(null);
    setOpenBiggerImage(false);
  };

  const handleCloseModal = () => {
    close();
    setNeedRefresh(true);
  };

  const childProps = {
    data: data && data.data.issue,
    handleOpenImageViewer,
    openBiggerImage,
    imageSelectedUrl,
    handleCloseImageViewer,
    setSnackBarMessageSuccess,
    row,
    refetch,
    chatBoxReference,
    handleCloseModal,
    modalTitle: t('issues_chat_activity', { ns: 'cdtModal' }),
  };

  return isLoading ? <CircularSpinner /> : <ChatComponent {...childProps} />;
};

export default ChatComponentContainer;
