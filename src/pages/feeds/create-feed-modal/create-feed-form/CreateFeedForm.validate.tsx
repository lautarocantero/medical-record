import * as Yup from 'yup';

export const validate = (minPics: string) =>
  Yup.lazy(() =>
    Yup.object().shape({
      title: Yup.string().required('Ingrese un título'),
      /*  start_date: Yup.string().required('Ingrese una fecha'), */
      subtitle: Yup.string().required('Ingrese un subtítulo'),
      body: Yup.string().required('Ingrese un mensaje'),
      cover_image_url: Yup.string().required('Ingrese una foto de portada') /* Yup.object()
      .required('Ingrese una foto de portada')
      .nullable(), */,
      /*  video: Yup.object().nullable(),
      document: Yup.object().nullable(), */
      publication_image_urls: Yup.array().required('').min(1, minPics).nullable(),
    }),
  );
