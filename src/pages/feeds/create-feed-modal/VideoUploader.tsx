import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import TheatersIcon from '@mui/icons-material/Theaters';
import axios from 'axios';
import { ErrorText } from '@/src/components/error/error-text/ErrorText';
import { CircularSpinner } from '@/src/components/circular-spinner/CircularSpinner';
import { preFetchVideoUrl } from '@/src/api/endpoints/feed';
import { VideoReaderModal } from '../media-readers/VideoReaderModal';

const VideoUploader = ({ values, setFieldValue, setDisableButton }: any) => {
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [videoInfo, setVideoInfo] = useState<string | null>(null);
  const [openVideoReaderModal, setOpenVideoReaderModal] = useState(false);
  const [err, setErr] = useState<any>(null);
  const { t } = useTranslation();
  const { mutate } = useMutation(preFetchVideoUrl);

  const getVideoUrl = (e: any) => {
    setIsLoadingVideo(true);
    setVideoInfo(e.target.files[0].name);
    setDisableButton(true);
    mutate(
      { file_name: e.target.files[0].name },
      {
        onError: async (error: any) => {
          setIsLoadingVideo(false);
          setIsLoadingVideo(false);
          if (error.response.status === 403 && error.response.statusText === 'Forbidden') {
            setErr(t('too_large_file', { ns: 'feed' }));
            return;
          }
          setErr(t('InternalServerError', { ns: 'errors' }));
        },
        onSuccess: async (response) => {
          const file = e.target.files[0];
          const { presigned_url: presignedUrl } = response.data;
          const videoUrl = presignedUrl.split('?');
          setFieldValue('video', videoUrl[0]);
          const saveVideoUrlRequest = async () => {
            try {
              await axios({
                method: 'put',
                url: presignedUrl,
                data: file,
                headers: {
                  'Content-type': file.type,
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Method': 'put',
                },
              });
              setIsLoadingVideo(false);
              setDisableButton(false);
            } catch (error: any) {
              setIsLoadingVideo(false);
              if (error.response.status === 403 && error.response.statusText === 'Forbidden') {
                setErr(t('too_large_file', { ns: 'feed' }));
                return;
              }
              setErr(t('InternalServerError', { ns: 'errors' }));
            }
          };
          saveVideoUrlRequest();
        },
      },
    );
  };

  const cleanerFunction = () => {
    setVideoInfo(null);
    setErr(null);
    setFieldValue('video', null);
  };

  const handleOpenVideoReader = () => {
    setOpenVideoReaderModal(true);
  };

  const handleCloseVideoReader = () => {
    setOpenVideoReaderModal(false);
  };

  useEffect(() => {
    if (values.isEdit && values.video) {
      const arrayOfValuesOfUrl = values.video.split('/');
      const valuesNarrowed = arrayOfValuesOfUrl[arrayOfValuesOfUrl.length - 1];
      const documentName = valuesNarrowed.split('-');
      setVideoInfo(`${documentName[0]}.mp4`);
    }
  }, [values.isEdit]);

  return (
    <>
      <Typography variant="subtitle2">{t('attach_video', { ns: 'feed' })}</Typography>
      {isLoadingVideo && (
        <div style={{ width: '50px' }}>
          <CircularSpinner size={30} />
        </div>
      )}
      {videoInfo || values.video ? (
        <Box component="div" mt={1} sx={{ position: 'relative' }}>
          <Tooltip title={t('remove_item_tooltip_msn', { ns: 'feed' })}>
            <IconButton sx={{ position: 'absolute', left: '30px', top: '-12px' }} onClick={cleanerFunction}>
              <CancelRoundedIcon />
            </IconButton>
          </Tooltip>
          {values.isEdit ? (
            <Tooltip id="video_preview" title={t('preview_item_tooltip_msn', { ns: 'feed' })}>
              <IconButton onClick={handleOpenVideoReader}>
                <TheatersIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          ) : (
            <TheatersIcon fontSize="large" />
          )}
          <Typography variant="caption" ml={1}>
            {videoInfo}
          </Typography>
        </Box>
      ) : (
        <Tooltip title="Click">
          <IconButton aria-label="fingerprint" color="secondary" component="label" size="large">
            <VideoCallIcon fontSize="large" sx={{ fontSize: '40px' }} />
            <input type="file" hidden onChange={getVideoUrl} accept="video/mp4" />
          </IconButton>
        </Tooltip>
      )}
      <div>
        <ErrorText error={err as string} />
      </div>
      {openVideoReaderModal && values.isEdit && (
        <VideoReaderModal open={openVideoReaderModal} videoUrl={values.video} handleClose={handleCloseVideoReader} />
      )}
    </>
  );
};

export default React.memo(VideoUploader);
