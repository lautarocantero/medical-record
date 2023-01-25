import React, { useState } from 'react';
import { IconButton, TextField, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { addsNewMessage } from '@/src/api/endpoints/support';
import UploadImage from './UploadImage';
import { useGenerateImageUrl } from '@/src/hooks/useGenerateImageUrl';
import { ErrorText } from '@/src/components/error/error-text/ErrorText';
import { ChatTextErrorContainer } from '../../styles/Chat.styled';

interface SendTextProps {
  refetch: () => void;
  id: number;
}

type ToBePosted = {
  text: string;
  image_url: string | null;
};

const SendText = ({ refetch, id }: SendTextProps) => {
  const tempValues: ToBePosted = { text: '', image_url: null };
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorSendingNewMessage, setErrorSendingNewMessage] = useState<string | null>(null);
  const { getUrl, isLoadingImage, errorSubmittingImage, setErrorSubmittingImage, url, isUploadingImage } =
    useGenerateImageUrl();

  const { mutate: addNewMessage } = useMutation(addsNewMessage, {
    onSuccess: async () => {
      refetch();
    },
    onError: async () => {
      setInputValue(tempValues.text);
      setImageUrl(tempValues.image_url);
      setErrorSendingNewMessage(t('chat_detail_new_message_cannot_be_created', { ns: 'tickets' }));
    },
  });

  const handleSendText = (e: any) => {
    if (inputValue.length > 0 || imageUrl) {
      e.preventDefault();
      setErrorSendingNewMessage(null);
      tempValues.text = inputValue;
      tempValues.image_url = imageUrl;

      const postData = {
        id,
        newMessage: {
          text: inputValue,
          image_url: imageUrl,
        },
      };
      addNewMessage(postData);
      setInputValue('');
      setImageUrl(null);
    }
  };

  return (
    <Box component="form" sx={{ width: '100%' }} onSubmit={handleSendText}>
      {errorSendingNewMessage && (
        <ChatTextErrorContainer component="div">
          <ErrorText error={errorSendingNewMessage as string} />
        </ChatTextErrorContainer>
      )}
      <TextField
        id="input-with-icon-textfield"
        size="small"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <UploadImage
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              getUrl={getUrl}
              isLoadingImage={isLoadingImage}
              errorSubmittingImage={errorSubmittingImage}
              resetImageError={setErrorSubmittingImage}
              url={url}
            />
          ),
          endAdornment: (
            <IconButton sx={{ marginRight: '-17px' }} onClick={handleSendText} disabled={isUploadingImage}>
              <SendIcon />
            </IconButton>
          ),
        }}
        variant="outlined"
      />
    </Box>
  );
};

export default SendText;
