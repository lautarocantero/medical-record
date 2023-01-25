import { useTranslation } from 'react-i18next';
import CustomDataTable from '@/src/components/custom-data-table/CustomDataTable';
import { useColumns } from './useColumns';

export const PatientsPage = () => {
  const { columns, actionColumns, headerActions } = useColumns();
  const { t } = useTranslation();

  return (
    <CustomDataTable
      title={t('Pacientes')}
      columns={columns}
      resource="patients-accounts"
      pathApi="v1/admin-accounts"
      listName="admin_accounts"
      canDisable
      canExport
      canSearch
      defaultSortFieldId="name"
      defaultSortAsc
      extraActionsInHeader={headerActions}
      customActionColumns={actionColumns}
    />
  );
};
