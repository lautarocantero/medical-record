import { useTranslation } from 'react-i18next';
import CustomDataTable from '@/src/components/custom-data-table/CustomDataTable';
import { useColumns } from './useColumns';

export const AdministratorsPage = () => {
  const { columns, actionColumns, headerActions } = useColumns();
  const { t } = useTranslation();
  return (
    <CustomDataTable
      title={t('administrators')}
      columns={columns}
      resource="admin-accounts"
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
