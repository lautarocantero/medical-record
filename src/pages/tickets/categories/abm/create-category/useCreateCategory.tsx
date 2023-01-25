import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { createsCategory } from '@/src/api/endpoints/support';
import { CreateCategoryProps } from '../../../types';
import { useGetLanguages, getCodes, Lang } from '../hook/useGetLanguages';

export const useCreateCategory = ({ close, setSnackBarMessageSuccess }: CreateCategoryProps) => {
  const { t } = useTranslation();
  const [creationValues, setCreationValues] = useState<any>({});
  const [creationErrors, setCreationErrors] = useState<any>({});
  const [incomingLanguages, setIncomingLanguages] = useState<Array<Lang>>([]);
  const [creationMessageError, setCreationMessageError] = useState<string | null>(null);
  const { languages, codes, isLoading } = useGetLanguages();
  const { mutate, isLoading: isCreationLoading } = useMutation(createsCategory);

  useEffect(() => {
    if (languages && languages.length > 0) {
      const errorObject: any = {};
      const valuesObject: any = {};
      const iconmingLan: Array<Lang> = [];
      for (const i of languages) {
        errorObject[getCodes(i)] = null;
        valuesObject[getCodes(i)] = '';
        iconmingLan.push({ id: i.id, code: getCodes(i) });
      }
      setCreationValues(valuesObject);
      setCreationErrors(errorObject);
      setIncomingLanguages(iconmingLan);
    }
  }, [languages]);

  const handleCreateCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valueKeys: any = Object.keys(creationErrors);
    const filteredErrors: any = valueKeys.filter(
      (item: any) => creationErrors[item] === null || creationErrors[item] === true,
    );
    if (filteredErrors.length > 0) {
      const noValueSubmitted: any = {};
      for (const i of filteredErrors) {
        noValueSubmitted[i] = true;
      }
      setCreationErrors(noValueSubmitted);
    } else {
      const categoryTranslations: Array<{ language_id: number; name: string }> = incomingLanguages.map(
        (lang: Lang) => ({
          language_id: lang.id,
          name: creationValues[lang.code],
        }),
      );
      mutate(
        { category_translations: categoryTranslations },
        {
          onSuccess: async () => {
            setSnackBarMessageSuccess(t('category_creation_success_message', { ns: 'tickets' }));
            close();
          },
          onError: async () => {
            setCreationMessageError(t('category_creation_error_message', { ns: 'tickets' }));
          },
        },
      );
    }
  };

  const handleOnChange = (code: string, value: string) => {
    if (value.length > 0) {
      setCreationValues({ ...creationValues, [code]: value });
      setCreationErrors({ ...creationErrors, [code]: false });
    } else {
      setCreationValues({ ...creationValues, [code]: '' });
      setCreationErrors({ ...creationErrors, [code]: null });
    }
  };
  return {
    codes,
    isLoading,
    isCreationLoading,
    creationValues,
    handleOnChange,
    creationErrors,
    setCreationErrors,
    handleCreateCategory,
    creationMessageError,
  };
};
