import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { imageResize, validImage } from '../utilities/helpers/imageResizer';
import { filesArticle } from '@/src/api/endpoints/feed';
import { errorHandlerHelper } from '../utilities/helpers/errorHandlerHelper';

export const useGenerateImageUrl = () => {
  const [errorSubmittingImage, setErrorSubmittingImage] = useState<
    { code: any; error_messages: any } | undefined | null
  >(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const { mutate: generateImageUrl } = useMutation(filesArticle);

  const getUrl = (e: any) => {
    const submittedImage = e.target.files[0];

    if (submittedImage && validImage(submittedImage)) {
      setErrorSubmittingImage(null);
      setIsLoadingImage(true);
      setIsUploadingImage(true);
      try {
        imageResize(submittedImage).then((convertedFile: any) => {
          const elementsOfUrl = convertedFile.split(',');
          generateImageUrl(
            { image: elementsOfUrl[1], file_name: submittedImage.name },
            {
              onSuccess: ({ data }) => {
                setUrl(data.image_url);
                setErrorSubmittingImage(null);
                setIsLoadingImage(false);
              },
              onError: (err: any) => {
                setIsLoadingImage(false);
                setErrorSubmittingImage(null);
                setErrorSubmittingImage(errorHandlerHelper(err));
              },
              onSettled: () => {
                setIsUploadingImage(false);
              },
            },
          );
        });
      } catch (transformationError: any) {
        throw new Error(transformationError);
      }
    } else {
      setErrorSubmittingImage({
        code: 'Invalid Format',
        error_messages: 'Invalid image format',
      });
    }
  };
  return {
    getUrl,
    isLoadingImage,
    isUploadingImage,
    errorSubmittingImage,
    url,
    setErrorSubmittingImage,
  };
};
