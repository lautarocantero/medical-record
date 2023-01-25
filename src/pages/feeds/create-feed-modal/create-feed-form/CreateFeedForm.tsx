import { Box, CardMedia, CircularProgress, Grid, IconButton, InputLabel, Typography, Tooltip } from '@mui/material';
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { imageResize, validImage } from '@/src/utilities/helpers/imageResizer';
import CustomInput from '@/src/components/forms/CustomInput';
import { filesArticle } from '@/src/api/endpoints/feed';
import PdfFileUploader from '../PdfFileUploader';
import { CustomDatePicker } from '@/src/components/date-picker/DatePicker';
import VideoUploader from '../VideoUploader';
import { ErrorText } from '@/src/components/error/error-text/ErrorText';
import { errorHandlerHelper } from '@/src/utilities/helpers/errorHandlerHelper';
import { CreateFeedFormProps } from '../../types';
import { FeedImageContainer } from '../../styles/CreateFeed.styled';

const minDate = new Date();

type Config = any;

const CreateFeedForm = ({
  handleSubmit,
  values,
  setFieldValue,
  errors,
  isLoadingSubmit,
  errorMessage,
  disableButton,
  setDisableButton,
}: CreateFeedFormProps) => {
  const { t } = useTranslation();
  const [wrongFooterImages, setWrongFooterImages] = useState<{ code: any; error_messages: any } | null | undefined>(
    null,
  );
  const [wrongCoverImages, setWrongCoverImages] = useState<{ code: any; error_messages: any } | null | undefined>(null);
  const [isCoverLoading, SetIsCoverLoading] = useState(false);

  const editor = useRef(null);

  const joditConfig = {
    defaultMode: 1,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    spellcheck: true,
    readOnly: false,
    hidePoweredByJodit: true,
    buttons: ['source', 'bold', 'link'],
    placeholder: 'Escribe aquí la noticia',
  };
  const { mutate, isLoading } = useMutation(filesArticle);

  const getUrlIn64 = (e: any, forArray: any, from: any) => {
    const submittedImage = e.target.files[0];
    SetIsCoverLoading(forArray !== 'urls');
    setWrongFooterImages(null);
    setWrongCoverImages(null);
    if (submittedImage && validImage(submittedImage)) {
      try {
        setDisableButton(true);
        imageResize(submittedImage).then((convertedFile: any) => {
          const elementsOfUrl = convertedFile.split(',');
          mutate(
            { image: elementsOfUrl[1], file_name: submittedImage.name },
            {
              onSuccess: ({ data }) => {
                forArray === 'urls'
                  ? setFieldValue('publication_image_urls', [
                      ...values.publication_image_urls,
                      { image_url: data.image_url },
                    ])
                  : setFieldValue('cover_image_url', data.image_url);
                SetIsCoverLoading(false);
              },
              onError: (err) => {
                SetIsCoverLoading(false);
                if (from === 'cover_img') {
                  setWrongCoverImages(errorHandlerHelper(err));
                  return;
                }
                if (from === 'footer_img') {
                  setWrongFooterImages(errorHandlerHelper(err));
                }
              },
              onSettled: () => {
                setDisableButton(false);
              },
            },
          );
        });
      } catch (transformationError) {
        throw new Error(transformationError as string);
      }
    }
  };

  const deleteImage = (url?: any, forArray?: any) => {
    forArray === 'urls'
      ? setFieldValue(
          'publication_image_urls',
          values.publication_image_urls.filter((element: any) => element.image_url !== url),
        )
      : setFieldValue('cover_image_url', '');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginY: '5px' }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="subtitle2">{t('attach_header_image', { ns: 'feed' })}</Typography>
        </Grid>
        {values.cover_image_url ? (
          <Grid item xs={12} sm={12} md={12} sx={{ position: 'relative' }}>
            <Tooltip title={t('remove_item_tooltip_msn', { ns: 'feed' })}>
              <IconButton onClick={() => deleteImage()} sx={{ position: 'absolute', right: -15, top: -14 }}>
                <CancelRoundedIcon />
              </IconButton>
            </Tooltip>
            <CardMedia
              sx={{
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
              }}
              component="img"
              height={194}
              image={values.cover_image_url}
              alt="cover-image"
            />
          </Grid>
        ) : (
          <FeedImageContainer from="header">
            {isCoverLoading ? (
              <CircularProgress size={25} />
            ) : (
              <InputLabel htmlFor="image-header">
                <IconButton>
                  <InputLabel htmlFor="image-header">
                    <input
                      id="image-header"
                      onChange={(e: any) => getUrlIn64(e, null, 'cover_img')}
                      style={{ display: 'none' }}
                      type="file"
                      accept="image/*"
                    />
                    <AddPhotoAlternateRoundedIcon fontSize="large" />
                  </InputLabel>
                </IconButton>
              </InputLabel>
            )}
            <ErrorText error={wrongCoverImages?.code} />
            <ErrorText error={errors?.cover_image_url ? t('attach_header_image', { ns: 'feed' }) : null} />
          </FeedImageContainer>
        )}

        <Grid item xs={12} sm={4} md={4}>
          <CustomInput
            field="title"
            noError
            label={t('title', { ns: 'common' })}
            placeholder={t('enter_title', { ns: 'feed' })}
            setFieldValue={setFieldValue}
            values={values}
            autoFocus
            maxLength={100}
            required
          />
          <ErrorText error={errors && errors.title ? t('enter_title', { ns: 'feed' }) : null} />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CustomInput
            field="subtitle"
            noError
            label={t('subtitle', { ns: 'feed' })}
            placeholder={t('enter_subtitle', { ns: 'feed' })}
            setFieldValue={setFieldValue}
            values={values}
            maxLength={100}
            required
          />
          <ErrorText error={errors && errors.subtitle ? t('enter_subtitle', { ns: 'feed' }) : null} />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CustomDatePicker
            value={values.start_date}
            minDate={minDate}
            setFieldValue={setFieldValue}
            fieldValue="start_date"
            isReadOnly={false}
            placeholder={t('start_date', { ns: 'feed' })}
            errorMessage={errors.start_date as string}
          />
        </Grid>
        <Grid item xs={12}>
          <JoditEditor
            ref={editor}
            config={joditConfig as Config | undefined}
            value={values.body}
            onBlur={(value) => {
              setFieldValue('body', value.toString());
            }}
          />
          <ErrorText error={errors.body ? t('enter_message', { ns: 'feed' }) : null} />
        </Grid>
        {/** PDF UPLOADER */}
        <Grid item xs={12} md={6} sx={{ height: 80 }}>
          <PdfFileUploader values={values} setFieldValue={setFieldValue} setDisableButton={setDisableButton} />
        </Grid>
        {/** VIDEO UPLOADER */}
        <Grid item xs={12} md={6} sx={{ height: 80 }}>
          <VideoUploader values={values} setFieldValue={setFieldValue} setDisableButton={setDisableButton} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} mt={4} sx={{ height: 170 }}>
          <Typography variant="subtitle2">Agregar imagenes</Typography>
          <ErrorText error={wrongFooterImages?.code || errors.publication_image_urls} />
          <FeedImageContainer from="footer">
            {isLoading && !isCoverLoading ? (
              <CircularProgress size={35} />
            ) : (
              <InputLabel htmlFor="images-urls">
                <input
                  id="images-urls"
                  onChange={(e) =>
                    values?.publication_image_urls.length < 4 ? getUrlIn64(e, 'urls', 'footer_img') : null
                  }
                  style={{ display: 'none', cursor: 'pointer' }}
                  disabled={values?.publication_image_urls.length >= 4}
                  type="file"
                  accept="image/*"
                />
                <AddPhotoAlternateRoundedIcon cursor="pointer" fontSize="large" />
              </InputLabel>
            )}
            <Box
              component="div"
              sx={{
                width: '90%',
                display: 'flex',
                justifyContent: `${values?.publication_image_urls.length > 3 ? 'space-between' : 'flex-start'}`,
                gap: '10px',
              }}
            >
              {values?.publication_image_urls?.length > 0 &&
                values.publication_image_urls.map((images: any, i: number) => (
                  <Box
                    key={i}
                    component="div"
                    sx={{
                      width: `${
                        values?.publication_image_urls.length > 3
                          ? `${100 / values.publication_image_urls.length}%`
                          : '205px'
                      }`,
                      borderRadius: '20px',
                      position: 'relative',
                      marginBottom: '10px',
                    }}
                  >
                    <IconButton
                      onClick={() => deleteImage(images && images.image_url ? images.image_url : images, 'urls')}
                      sx={{
                        position: 'absolute',
                        top: -15,
                        right: -16,
                      }}
                    >
                      <CancelRoundedIcon />
                    </IconButton>
                    <CardMedia
                      component="img"
                      height={128}
                      image={images && images.image_url ? images.image_url : images}
                      alt="images"
                      sx={{ borderRadius: '20px' }}
                    />
                  </Box>
                ))}
            </Box>
          </FeedImageContainer>
        </Grid>
        {errorMessage && (
          <Grid xs={6} item>
            <ErrorText error={errorMessage} />
          </Grid>
        )}
        <Grid container item xs={errorMessage ? 6 : 12} justifyContent="flex-end">
          <LoadingButton loading={isLoadingSubmit} variant="contained" type="submit" disabled={disableButton}>
            {t('post', { ns: 'feed' })}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(CreateFeedForm);
