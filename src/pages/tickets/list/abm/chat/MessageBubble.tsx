import React from 'react';
import { Avatar, Box, CardMedia, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { red } from '@mui/material/colors';
import {
  getFormattedDateByLanguague,
  getFormattedLocalFullDateNumberEn,
  getFormattedLocalFullDateNumberEs,
} from '@/src/utilities/helpers/dateParser';
import { getLanguage } from '@/src/utilities/storage';
import { MessageType } from '../../../types';

export const getAvatarDisplay = (text: string) => {
  if (text?.length > 1) return text?.slice(0, 1);
  return text;
};

const userInfo = localStorage.getItem('user');

const TextBox = ({
  message,
  handleOpenImageViewer,
}: {
  message: MessageType;
  handleOpenImageViewer: (textInfo: MessageType) => void;
}) => {
  const lang = getLanguage()?.split('-')[0];
  return (
    <Box component="div" sx={{ width: '90%', border: '1px solid transparent', textAlign: 'left' }}>
      {message.image_url && (
        <CardMedia
          onClick={() => handleOpenImageViewer(message)}
          sx={{
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          component="img"
          height={194}
          image={message.image_url}
          alt="image_recieved_via_text"
        />
      )}
      <Typography component="div" sx={{ fontSize: '14px' }}>
        {message.text}
      </Typography>
      <Typography variant="caption">
        {getFormattedDateByLanguague(
          lang,
          getFormattedLocalFullDateNumberEs,
          getFormattedLocalFullDateNumberEn,
          message.creation_date,
        )}
      </Typography>
    </Box>
  );
};

const MessageBubble = ({
  message,
  name,
  surname,
  handleOpenImageViewer,
}: {
  message: MessageType;
  name: string;
  surname: string;
  handleOpenImageViewer: (textInfo: MessageType) => void;
}) => {
  const { origin } = message;
  const backOfficeUserInfo = JSON.parse(userInfo as string);
  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: `${origin === 'App' ? 'flex-end' : 'flex-start'}`,
      }}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          width: 'max-content',
          maxWidth: '100%',
          wordBreak: 'break-word',
          padding: '10px',
          paddingTop: '10px',
          paddingBottom: '5px',
          gap: '10px',
          borderRadius: `${origin === 'App' ? '10px 0 0 10px' : '0 10px 10px 0'}`,
          backgroundColor: `${origin === 'App' ? red[50] : '#cedbf5'}`,
          margin: `${origin === 'App' ? '0 0 0 10px' : '0 10px 0 0'}`,
          marginBottom: '5px',
        }}
      >
        {origin === 'App' ? (
          <>
            <TextBox message={message} handleOpenImageViewer={handleOpenImageViewer} />
            <Avatar
              sx={{
                width: 28,
                height: 28,
                bgcolor: red[500],
                fontSize: '14px',
              }}
            >
              {getAvatarDisplay(name)}
              {getAvatarDisplay(surname)}
            </Avatar>
          </>
        ) : (
          <>
            <Avatar sx={{ width: 28, height: 28, bgcolor: '#001541', fontSize: '14px' }}>
              {getAvatarDisplay(backOfficeUserInfo?.name)}
              {getAvatarDisplay(backOfficeUserInfo?.surname)}
            </Avatar>
            <TextBox message={message} handleOpenImageViewer={handleOpenImageViewer} />
          </>
        )}
      </Box>
    </Box>
  );
};
export const MessageBubleMemo = React.memo(MessageBubble);

export const NoMessageToShow = ({ message }: { message: string }) => {
  const { t } = useTranslation();

  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
        paddingTop: '15px',
        paddingBottom: '15px',
        gap: '5px',
        borderRadius: '5px',
        backgroundColor: '#424867',
        marginBottom: '5px',
        color: '#eee',
      }}
    >
      <Typography component="div" sx={{ fontSize: '14px', fontWeight: 'bolder', letterSpacing: '1px' }}>
        {t(message, { ns: 'tickets' })}
      </Typography>
    </Box>
  );
};
