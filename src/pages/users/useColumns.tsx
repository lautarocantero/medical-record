import { useTranslation } from 'react-i18next';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { UserRowProps } from './types';
import { formatPhoneNumber } from '@/src/utilities/helpers/stringsHelper';
import { PersonSelected } from './person-selected/PersonSelected';
import { CustomDataTableColumnsProps } from '@/src/components/custom-data-table/types/CustomDataTableColumnProps';
import { ActionColumn } from '@/src/components/custom-data-table/types/DataTableFormModal';

export const useColumns = () => {
  const { t } = useTranslation();
  const columns: CustomDataTableColumnsProps<UserRowProps>[] = [
    {
      id: 'name',
      name: t('name', { ns: 'common' }),
      selector: (row: UserRowProps) => row.name,
      sortField: 'name',
      sortable: true,
    },
    {
      id: 'surname',
      name: t('surname', { ns: 'common' }),
      selector: (row: UserRowProps) => row.surname,
      sortField: 'surname',
      sortable: true,
    },
    {
      id: 'property_code',
      name: t('property_code', { ns: 'customerUsers' }),
      selector: (row: UserRowProps) => row.property_code,
      sortField: 'property_code',
      sortable: true,
    },
    {
      id: 'phone_number',
      name: t('residents_list_phone_number_column', { ns: 'customerUsers' }),
      selector: (row: UserRowProps) => formatPhoneNumber(row.phone_number),
      sortField: 'phone_number',
      sortable: true,
    },
  ];

  const actionColumns: ActionColumn[] = [
    {
      id: 'view',
      icon: (props: any) => <VisibilityRoundedIcon sx={props.sx} />,
      component: (props: any) => <PersonSelected {...props} />,
      width: { xs: '90%', sm: '80%', lg: 'max-content' },
    },
  ];

  return {
    columns,
    actionColumns,
  };
};
