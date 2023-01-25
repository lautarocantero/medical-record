import React, { useRef, useEffect, Dispatch } from 'react';
import { Box, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { useTranslation } from 'react-i18next';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { CircularSpinner } from '@/src/components/circular-spinner/CircularSpinner';
import styles from './style.module.css';
import { ChatImageErrorContainer } from '../../styles/Chat.styled';

type ErrorSubmittingImage = { code: string; error_messages: any } | null | undefined;
interface UploadingImageProps {
  setImageUrl: (url: string | null) => void;
  imageUrl: string | null;
  getUrl: (e: any) => void;
  isLoadingImage: boolean;
  errorSubmittingImage: ErrorSubmittingImage;
  resetImageError: Dispatch<
    React.SetStateAction<
      | {
          code: any;
          error_messages: any;
        }
      | null
      | undefined
    >
  >;
  url: string | null;
}

const WrongImageFormatError = ({ errorSubmittingImage }: { errorSubmittingImage: ErrorSubmittingImage }) => {
  const { t } = useTranslation();

  return (
    <ChatImageErrorContainer component="div">
      <BrokenImageIcon fontSize="large" />
      <Typography component="span" variant="caption">
        {t(errorSubmittingImage?.code as string, { ns: 'errors' })}
      </Typography>
    </ChatImageErrorContainer>
  );
};

const UploadImage = ({
  setImageUrl,
  imageUrl,
  getUrl,
  isLoadingImage,
  errorSubmittingImage,
  resetImageError,
  url,
}: UploadingImageProps) => {
  const { t } = useTranslation();
  const inputImageRef = useRef<any>(null);

  useEffect(() => {
    if (url !== null) {
      setImageUrl(url);
    }
  }, [url]);

  const handleImageRef = () => {
    inputImageRef.current && inputImageRef.current.click();
  };

  const deleteImage = () => {
    resetImageError(null);
    setImageUrl(null);
    inputImageRef.current.value = '';
  };

  return (
    <>
      <input
        id="image-header"
        ref={inputImageRef}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => getUrl(e)}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
      />
      <Tooltip title="add image">
        <IconButton sx={{ marginLeft: '-17px' }} onClick={handleImageRef}>
          <AddPhotoAlternateRoundedIcon />
        </IconButton>
      </Tooltip>
      <Box
        component="div"
        className={
          imageUrl || isLoadingImage || errorSubmittingImage
            ? styles['image-pre-viewer-showed']
            : styles['image-pre-viewer-hidden']
        }
      >
        {isLoadingImage && <CircularSpinner color="info" />}
        {errorSubmittingImage && <WrongImageFormatError errorSubmittingImage={errorSubmittingImage} />}
        <Tooltip title={t('remove_item_tooltip_msn', { ns: 'feed' })}>
          <IconButton onClick={() => deleteImage()} sx={{ position: 'absolute', right: -10, top: -10 }}>
            <CancelRoundedIcon sx={{ color: '#fdfdfd' }} />
          </IconButton>
        </Tooltip>
        {imageUrl && (
          <>
            {/* <ErrorText error={(errorSendingNewMessage as string) || (errorSubmittingImage?.code as string)} /> */}
            <CardMedia
              sx={{
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                width: '150px',
                height: '100px',
                margin: '0 auto',
                objectFit: 'contain',
              }}
              component="img"
              image={imageUrl as string}
              alt="image_to_be_sent"
            />
          </>
        )}
      </Box>
    </>
  );
};

export default UploadImage;
