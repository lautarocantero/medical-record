import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Delete } from '@mui/icons-material';
import { getMonthDayYearValue } from '@/src/utilities/helpers/dateParser';
import CustomLoader from '@/src/components/custom-loader';
import { FadeIn } from '@/src/components/animations';
import { deleteArticle } from '@/src/api/endpoints/feed';
import CreateFeedModal from './create-feed-modal/CreateFeedModal';
import { useGetArticlesById } from './fetchHelperFeed';
import { LoaderContainer } from '@/src/components/loader-container/LoaderContainer';
import RenderFeedImages from './render-images';
import PdfShowFile from './pdf-show-file';
import DeleteDialog from '@/src/components/dialogs/DeleteDialog';

const FeedDetail = ({ idSelected, setIdSelected, setSnackBarMessageError, setSnackBarMessageSuccess }: any) => {
  const queryClient = useQueryClient();
  const [openEditInformation, setOpenEditInformation] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { t } = useTranslation();
  const { dataById, isLoading, refetch } = useGetArticlesById(idSelected);
  const cleanHTML = DOMPurify.sanitize(dataById?.publication?.body, {
    USE_PROFILES: { html: true },
  });

  const { mutate: deleteMutation, status } = useMutation(deleteArticle, {
    onError: async () => {
      setSnackBarMessageError(t('uncatch_error', { ns: 'errors' }));
    },
    onSuccess: async () => {
      queryClient.resetQueries(['publications']);
      setIdSelected(null);
      setSnackBarMessageSuccess(t('successful_publication_deletion_snackbar_text', { ns: 'feed' }));
    },
  });

  const onCloseArticleSelected = () => {
    setIdSelected(null);
  };
  return (
    <>
      <Box sx={{ paddingRight: '20px', overflow: 'auto' }}>
        {isLoading ? (
          <LoaderContainer>
            <CustomLoader />
          </LoaderContainer>
        ) : (
          <FadeIn>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="card-label">
                    P
                  </Avatar>
                }
                title={dataById?.publication?.title}
                titleTypographyProps={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  // minWidth: { xs: '50px', sm: '200px' },
                  // maxWidth: { xs: '100px', sm: '400px' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                subheader={getMonthDayYearValue(new Date(dataById?.publication?.date ?? Date.now()).toString())}
                action={
                  <Box sx={{ width: 'max-content' }}>
                    <Tooltip title={t('edit', { ns: 'cdtModal' })}>
                      <IconButton
                        aria-label="settings"
                        sx={{ color: 'secondary.main' }}
                        onClick={() => setOpenEditInformation(true)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('deletion_dialog_form_title', { resource: 'feed'.replace('-', '_') })}>
                      <IconButton sx={{ color: 'secondary.main' }} onClick={() => setDeleteModal(true)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                    <DeleteDialog
                      title={t('deletion_dialog_form_title', {
                        resource: `${'feed'.replace('-', '_')}_modal_text`,
                      })}
                      contentText={t('deleting_dialog_form_content', {
                        resource: `${'feed'.replace('-', '_')}_modal_text`,
                      })}
                      open={deleteModal}
                      setOpen={setDeleteModal}
                      onDelete={() => deleteMutation(dataById?.publication?.id)}
                      deleteStatus={status}
                    />
                    <Tooltip title={t('close')}>
                      <IconButton
                        onClick={onCloseArticleSelected}
                        aria-label="settings"
                        sx={{ color: 'secondary.main' }}
                      >
                        <ClearRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              />
              {dataById?.publication?.cover_image_url && (
                <CardMedia
                  sx={{ borderRadius: '15px', padding: '3px 10px' }}
                  component="img"
                  height="194"
                  image={dataById?.publication?.cover_image_url ?? ''}
                  alt="cover-image"
                />
              )}
              <CardContent>
                <Typography
                  variant="subtitle1"
                  sx={{ padding: '8px 0 ', fontSize: '1.10rem', color: 'rgba(0, 0, 0, 0.6)' }}
                >
                  {dataById?.publication?.subtitle}
                </Typography>
                {parse(cleanHTML)}
                {dataById?.publication.document_url && <PdfShowFile file={dataById?.publication.document_url} />}
                <RenderFeedImages data={dataById?.publication.publication_images} />
                {dataById?.publication?.video_url && (
                  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <FadeIn duration="3s">
                      <CardMedia
                        sx={{
                          border: 'none',
                          width: 'auto',
                          height: 'auto',
                        }}
                        component="iframe"
                        src={dataById?.publication?.video_url ?? ''}
                      />
                    </FadeIn>
                  </Box>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        )}
      </Box>
      {openEditInformation ? (
        <CreateFeedModal
          dataById={dataById}
          refetchDataById={refetch}
          openModal={openEditInformation}
          setOpenModal={setOpenEditInformation}
          setSnackBarMessageError={setSnackBarMessageError}
          setSnackBarMessageSuccess={setSnackBarMessageSuccess}
        />
      ) : null}
    </>
  );
};

export default FeedDetail;
