import { useEditCategory } from './useEditCategory';
import { FormCategory } from '../common/FormCategory';
import { CreateCategoryProps } from '../../../types';

export const EditCategory = (props: CreateCategoryProps) => {
  const {
    codes,
    editValues,
    isLoading,
    handleOnChange,
    handleEditCategory,
    errorEditValues,
    editionMessageError,
    isEditionLoading,
  } = useEditCategory(props);

  return (
    <FormCategory
      codes={codes}
      creationError={editionMessageError}
      isLoading={isLoading}
      createEditLoading={isEditionLoading}
      errors={errorEditValues}
      values={editValues}
      handleOnChange={handleOnChange}
      handleCreateCategory={handleEditCategory}
    />
  );
};
