import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import { CustomDataTableColumnsProps } from '@/src/components/custom-data-table/types/CustomDataTableColumnProps';
import { CategoryRow } from '../types';
import CustomTableAction from '@/src/components/custom-data-table/components/CustomTableAction';
import { ActionColumn, ActionHeader } from '@/src/components/custom-data-table/types/DataTableFormModal';
import { CreateCategory, EditCategory } from './abm';

export const useColumns = () => {
  const { t } = useTranslation();

  const columns: CustomDataTableColumnsProps<CategoryRow>[] = [
    {
      id: 'name',
      name: t('tickets_list_name_column', { ns: 'tickets' }),
      selector: (row: CategoryRow) => row.name,
      sortField: 'name',
      sortable: false,
    },
  ];

  const headerActions: ActionHeader[] = [
    {
      id: 'categories-create',
      component: () => (
        <CustomTableAction
          modalTitle="categories"
          component={(props: any) => <CreateCategory {...props} />}
          Icon={() => <AddIcon />}
          type="create"
        />
      ),
    },
  ];

  const actionColumns: ActionColumn[] = [
    {
      id: 'edit',
      icon: (props: any) => <ModeEditOutlineRoundedIcon sx={props.sx} />,
      component: ({ close, row, setSnackBarMessageError, setSnackBarMessageSuccess }: any) => (
        <EditCategory
          close={close}
          row={row}
          setSnackBarMessageError={setSnackBarMessageError}
          setSnackBarMessageSuccess={setSnackBarMessageSuccess}
        />
      ),
      width: '40%',
    },
  ];

  return {
    columns,
    headerActions,
    actionColumns,
  };
};
