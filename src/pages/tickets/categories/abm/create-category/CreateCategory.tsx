import React from 'react';
import { useCreateCategory } from './useCreateCategory';
import { FormCategory } from '../common/FormCategory';
import { CreateCategoryProps } from '../../../types';

export const CreateCategory = (props: CreateCategoryProps) => {
  const {
    codes,
    isLoading,
    creationValues,
    handleOnChange,
    creationErrors,
    handleCreateCategory,
    creationMessageError,
    isCreationLoading,
  } = useCreateCategory(props);
  return (
    <FormCategory
      codes={codes}
      creationError={creationMessageError}
      isLoading={isLoading}
      createEditLoading={isCreationLoading}
      errors={creationErrors}
      values={creationValues}
      handleOnChange={handleOnChange}
      handleCreateCategory={handleCreateCategory}
    />
  );
};
