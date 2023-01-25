import { styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
import { LoaderContainer } from '@/src/components/loader-container/LoaderContainer';

export const ModalContentWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  padding: 16px;
`;

export const FeedImageContainer = styled(LoaderContainer)(({ from }: { from: string }) => ({
  height: `${from === 'header' ? '202px' : '150px'}`,
  border: `${from === 'header' ? '1px dotted gray' : 'none'}`,
  alignItems: 'center',
  borderRadius: `${from === 'header' ? '10px' : 0}`,
  marginLeft: `${from === 'header' ? '10px' : 0}`,
  padding: `${from === 'footer' ? '10px' : 0}`,
}));

export const FeedCardWrapper = styled(Card)(() => ({
  transition: 'all .3s ease-in-out,background 0s,color 0s,border-color 0s',
  height: '310px',
  width: '100%',
  boxShadow: '0px 3px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
  ':hover': {
    cursor: 'pointer',
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 25px 0 rgb(34 41 47 / 25%)',
  },
}));

export const FeedCardFooterText = styled(Typography)`
  font-size: 0.8rem;
  padding: 0px 8px;
  word-wrap: break-word;
  color: rgba(0, 0, 0, 0.6);
`;

export const PDFPreviewContainer = styled('div')`
  padding: 15px;
  border-radius: 20px;
  background: rgba(166, 139, 92, 0.1);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const PDFReaderContainer = styled(Box)`
  background-color: #e4e4e4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 800px;
`;
