import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import UserFormEdit2 from './administrators-modal/administrator-formEdit';
import UserForm2 from './administrators-modal/administrator-form';
import CustomTableAction from '@/src/components/custom-data-table/components/CustomTableAction';
import { ActionColumn, ActionHeader } from '@/src/components/custom-data-table/types/DataTableFormModal';
import { formatPhoneNumber } from '@/src/utilities/helpers/stringsHelper';
import { CustomDataTableColumnsProps } from '@/src/components/custom-data-table/types/CustomDataTableColumnProps';
import { Row } from './types';

export const useColumns = () => {
  const { t } = useTranslation();

  const columns: CustomDataTableColumnsProps<Row>[] = [
    {
      id: 'name',
      name: t('admin_users_list_name_column', { ns: 'users' }),
      selector: (row) => row.name,
      sortField: 'name',
      sortable: true,
    },
    {
      id: 'surname',
      name: t('admin_users_list_surname_column', { ns: 'users' }),
      selector: (row) => row.surname,
      sortField: 'surname',
      sortable: true,
    },
    {
      id: 'email',
      name: t('admin_users_list_email_column', { ns: 'users' }),
      selector: (row) => row.email,
      sortField: 'email',
      sortable: true,
    },
    {
      id: 'phone_number',
      name: t('admin_users_list_phone_number_column', { ns: 'users' }),
      selector: (row) => formatPhoneNumber(row.phone_number),
      sortField: 'phone_number',
      sortable: true,
      right: true,
    },
  ];

  const actionColumns: ActionColumn[] = [
    {
      id: 'edit',
      icon: (props) => <EditIcon sx={props.sx} />,
      component: (props: any) => <UserFormEdit2 {...props} />,
      width: '80%',
    },
  ];

  const headerActions: ActionHeader[] = [
    {
      id: 'administrators-create',
      component: () => (
        <CustomTableAction
          modalTitle="admin-accounts"
          component={(props: any) => <UserForm2 {...props} />}
          Icon={() => <AddIcon />}
          type="create"
          width="80%"
        />
      ),
    },
  ];

  return { columns, actionColumns, headerActions };
};
