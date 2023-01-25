import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomDataTable from '@/src/components/custom-data-table/CustomDataTable';
import { useColumns } from './useColumns';

export const UsersPage = () => {
  const { columns, actionColumns } = useColumns();
  const { t } = useTranslation();
  return (
    <CustomDataTable
      title={t('customers', { ns: 'common' })}
      columns={columns}
      resource="customers"
      pathApi="v1/customers"
      listName="customers"
      canExport
      canSearch
      canDisable
      defaultSortFieldId="name"
      defaultSortAsc
      customActionColumns={actionColumns}
    />
  );
};
