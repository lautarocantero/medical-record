import { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { CreateCategoryProps } from '../../../types';
import { getsCategory, updatesCategory } from '@/src/api/endpoints/support';
import { useGetLanguages, getCodes } from '../hook/useGetLanguages';

export const useEditCategory = ({ row, setSnackBarMessageSuccess, close }: CreateCategoryProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { codes, languages, isLoading } = useGetLanguages();
  const [editValues, setyEditValues] = useState<any>({});
  const [errorEditValues, setErrorEditValues] = useState<any>({});
  const [editionMessageError, setEditionMessageError] = useState<string | null>(null);
  const { data, isLoading: isDataLoading } = useQuery({
    queryKey: [`caterory_${row.id}`],
    queryFn: () => getsCategory({ id: row.id }),
    refetchOnWindowFocus: false,
  });
  const { mutate, isLoading: isEditionLoading } = useMutation(updatesCategory);

  useEffect(
    () =>
      function cleanUp() {
        queryClient.resetQueries([`caterory_${row.id}`]);
      },
    [],
  );

  useEffect(() => {
    if (languages && data) {
      const initialState: any = {};
      const filtered = data.data.category.category_translations.map((item: any, index: number) => ({
        id: item.language.id,
        name: item.name,
        category_id: data.data.category.id,
        code: getCodes(languages[index]),
      }));
      for (const i of filtered) {
        initialState[`${i.code}Id`] = i.id;
        initialState[i.code] = i.name;
        initialState.category_id = i.category_id;
        initialState.code = i.code;
      }

      setyEditValues(initialState);
    }
  }, [languages, data]);

  const handleEditCategory = (e: any) => {
    e.preventDefault();
    const valueKeys: any = Object.keys(errorEditValues);
    const filteredErrors: any = valueKeys.filter((item: any) => errorEditValues[item] === true);
    if (filteredErrors.length > 0) {
      setEditionMessageError(t('category_edition_all_fields_requiredment', { ns: 'tickets' }));
      return;
    }
    const updatedValues: Array<{ name: string; language_id: number }> = [];
    for (const i of codes) {
      updatedValues.push({
        name: editValues[i],
        language_id: editValues[`${i}Id`],
      });
    }
    mutate(
      { id: editValues.category_id, category_translations: updatedValues },
      {
        onSuccess: async () => {
          setSnackBarMessageSuccess(t('category_edition_success_message', { ns: 'tickets' }));
          close();
        },
        onError: async () => {
          setEditionMessageError(t('category_edition_error_message', { ns: 'tickets' }));
        },
      },
    );
  };

  const handleOnChange = (code: string, value: any) => {
    if (value.length === 0) {
      setErrorEditValues({ ...errorEditValues, [code]: true });
      setyEditValues({ ...editValues, [code]: '' });
    } else {
      setErrorEditValues({ ...errorEditValues, [code]: null });
      setyEditValues({ ...editValues, [code]: value });
    }
  };

  return {
    codes,
    editValues,
    isLoading: isLoading || isDataLoading,
    isEditionLoading,
    handleOnChange,
    handleEditCategory,
    errorEditValues,
    editionMessageError,
  };
};
