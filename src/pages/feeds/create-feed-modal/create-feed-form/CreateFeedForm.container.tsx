import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import CreateFeedForm from './CreateFeedForm';
import { validate } from './CreateFeedForm.validate';
import { newArticle, editArticle, getArticles } from '@/src/api/endpoints/feed';

const actualDate = new Date().getTime();

const CreateFeedFormContainer = ({ dataById, close, refetchDataById, setSnackBarMessageSuccess }: any) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const getArticlesData = async () => {
    const response = await getArticles();
    return response.data;
  };
  const { refetch } = useQuery(['publications'], getArticlesData, {
    // cacheTime: 500,
    refetchOnWindowFocus: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { mutate } = useMutation(newArticle);
  const { mutate: mutateEdit } = useMutation(editArticle);

  const getInitialValues = () => ({
    title: dataById ? dataById.title : '',
    subtitle: dataById ? dataById.subtitle : '',
    start_date: dataById ? dataById.date : actualDate,
    document: dataById ? dataById.document_url : null,
    video: dataById ? dataById.video_url : null,
    video_url_64: null,
    cover_image_url: dataById ? dataById.cover_image_url : '',
    body: dataById ? dataById.body : '',
    publication_image_urls: dataById ? dataById.publication_images : [],
    isEdit: !!dataById,
    editId: dataById ? dataById.id : null,
  });

  const onSubmit = (data: any) => {
    setIsLoading(true);
    const imageUrls: any = [];
    data.publication_image_urls.map((imageUrl: { image_url: string }) => imageUrls.push(imageUrl.image_url));

    if (!data.isEdit) {
      const formattedDataToCreate = {
        title: data.title,
        subtitle: data.subtitle,
        start_date: data.start_date,
        document_url: data.document,
        video_url: data.video || '',
        cover_image_url: data.cover_image_url,
        body: data.body,
        publication_image_urls: imageUrls,
      };

      mutate(
        { formattedDataToCreate },
        {
          onSuccess: async () => {
            setIsLoading(false);
            refetch();
            setSnackBarMessageSuccess(t('successful_publication_creation_snackbar_text', { ns: 'feed' }));
            close();
          },
          onError: async () => {
            setIsLoading(false);
            setErrorMessage(t('failed_publication_creation_snackbar_text', { ns: 'feed' }));
          },
        },
      );
    }

    if (data.isEdit) {
      const formattedDataToEdit = {
        title: data.title,
        subtitle: data.subtitle,
        start_date: data.start_date,
        document_url: data.document,
        video_url: data.video || '',
        cover_image_url: data.cover_image_url,
        body: data.body,
        publication_image_urls: imageUrls,
      };

      mutateEdit(
        { id: dataById.id, formattedDataToEdit },
        {
          onSuccess: async () => {
            setIsLoading(false);
            refetch();
            refetchDataById(dataById.id);
            setSnackBarMessageSuccess(t('successful_publication_edition_snackbar_text', { ns: 'feed' }));
            close();
          },
          onError: async () => {
            setIsLoading(false);
            setErrorMessage(t('failed_publication_edition_snackbar_text', { ns: 'feed' }));
          },
        },
      );
    }
  };

  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: getInitialValues(),
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: validate(t('min_pics_error', { ns: 'feed' })),
  });

  const childProps = {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    isLoadingSubmit: isLoading,
    errorMessage,
    disableButton,
    setDisableButton,
  };

  return <CreateFeedForm {...childProps} />;
};

export default CreateFeedFormContainer;
