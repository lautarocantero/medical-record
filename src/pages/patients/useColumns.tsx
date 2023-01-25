import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import UserFormEdit2 from '../patients/patients-modal/patients-formEdit';
import UserForm from '../patients/patients-modal/patients-form';

import CustomTableAction from '@/src/components/custom-data-table/components/CustomTableAction';
import { ActionColumn, ActionHeader } from '@/src/components/custom-data-table/types/DataTableFormModal';
import { CustomDataTableColumnsProps } from '@/src/components/custom-data-table/types/CustomDataTableColumnProps';
import { formatPhoneNumber } from '@/src/utilities/helpers/stringsHelper';
import { Row } from './types';

export const useColumns = () => {
  const { t } = useTranslation();

  const columns: CustomDataTableColumnsProps<Row>[] = [
    {
      id: 'name',
      name: t('Nombre', { ns: 'patients' }),
      selector: (row) => row.name,
      sortField: 'name',
      sortable: true,
    },
    {
      id: 'document',
      name: t('Documento', { ns: 'patients' }),
      selector: (row) => row.id,
      sortField: 'document',
      sortable: true,
      right: true,
    },
    {
      id: 'last_consult',
      name: t('Ultima Consulta', { ns: 'patients' }),
      selector: (row) => row.phone_number,
      sortField: 'last_consult',
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
      id: 'patients-create',
      component: () => (
        <CustomTableAction
          modalTitle="patient-accounts"
          component={(props: any) => <UserForm {...props} />}
          Icon={() => <AddIcon />}
          type="create"
          width="80%"
        />
      ),
    },
  ];

  return { columns, actionColumns, headerActions };
};
