import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { Box, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { CloseRounded } from '@mui/icons-material';
import { ChatComponentProps, MessageType } from '../../../types';
import {
  getFormattedDateByLanguague,
  getFormattedLocalFullDateNumberEn,
  getFormattedLocalFullDateNumberEs,
} from '@/src/utilities/helpers/dateParser';
import { MessageBubleMemo, NoMessageToShow, getAvatarDisplay } from './MessageBubble';
import { ImageViewer } from './image-viewer/ImageViewer';
import CloseIssueComponent from './close-issue/CloseIssueComponent';
import SendText from './send-text/SendText';
import { getLanguage } from '@/src/utilities/storage';

const scrollBarNotVisible = {
  '&::-webkit-scrollbar': {
    width: 0,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '1px solid slategrey',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 16px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
};

const Header = (name: string, surname: string) => (
  <Typography>
    {name} {surname}
  </Typography>
);

const StatusBg = (status: string) => {
  switch (status) {
    case 'Closed':
    case 'Cerrado':
      return '#424867';
    case 'En proceso':
    case 'In progress':
      return '#516F3F';
    case 'Nuevo':
    case 'New':
      return '#CA8A04';
    default:
      break;
  }
};

const SubHeader = ({ number, date, status }: { number: string; date: number; status: string }) => {
  const lang = getLanguage()?.split('-')[0];
  return (
    <Box component="div">
      <Typography variant="body2">{number}</Typography>
      <Typography variant="caption">
        {getFormattedDateByLanguague(lang, getFormattedLocalFullDateNumberEs, getFormattedLocalFullDateNumberEn, date)}
      </Typography>
      <div
        style={{
          width: 'max-content',
          fontSize: '0.8em',
          backgroundColor: `${StatusBg(status)}`,
          color: '#eee',
          padding: '1px 5px',
          borderRadius: '5px',
          fontWeight: 'bolder',
        }}
      >
        {status}
      </div>
    </Box>
  );
};

export const ChatComponent = ({
  data,
  handleOpenImageViewer,
  openBiggerImage,
  imageSelectedUrl,
  handleCloseImageViewer,
  row,
  refetch,
  setSnackBarMessageSuccess,
  chatBoxReference,
  handleCloseModal,
  modalTitle,
}: ChatComponentProps) => (
  <>
    <Box
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '10px',
      }}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        hola
      </Typography>
      <IconButton onClick={handleCloseModal}>
        <CloseRounded />
      </IconButton>
    </Box>
    <Card>
      {openBiggerImage && (
        <ImageViewer open={openBiggerImage} onClose={handleCloseImageViewer} url={imageSelectedUrl as string} />
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
            {getAvatarDisplay(data.customer.name)}
            {getAvatarDisplay(data.customer.surname)}
          </Avatar>
        }
        action={
          <CloseIssueComponent
            row={row}
            setSnackBarMessageSuccess={setSnackBarMessageSuccess}
            status={data.status.code}
          />
        }
        title={Header(data.customer.name, data.customer.surname)}
        subheader={SubHeader({
          number: data.customer.full_phone_number,
          date: data.creation_date,
          status: row.status.name,
        })}
      />
      <CardContent
        id="custom_card_id"
        sx={{
          height: 315,
          width: '100%',
          overflow: 'auto',
          padding: '5px',
          ...scrollBarNotVisible,
        }}
      >
        {data.messages.length > 0 ? (
          data.messages.map((msn: MessageType) => (
            <MessageBubleMemo
              key={msn.id}
              message={msn}
              name={data.customer.name}
              surname={data.customer.surname}
              handleOpenImageViewer={handleOpenImageViewer}
            />
          ))
        ) : (
          <NoMessageToShow message="no_message_to_show" />
        )}
        <div ref={chatBoxReference} />
      </CardContent>
      <CardActions disableSpacing sx={{ position: 'relative' }}>
        {data.status.code !== 'Closed' && <SendText refetch={refetch} id={row.id} />}
      </CardActions>
    </Card>
  </>
);
