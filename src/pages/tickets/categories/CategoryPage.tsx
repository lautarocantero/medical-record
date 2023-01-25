import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomDataTable from '@/src/components/custom-data-table/CustomDataTable';
import { useColumns } from './useColumns';

export const TicketsCategoryPage = () => {
  const { t } = useTranslation();
  const { columns, headerActions, actionColumns } = useColumns();

  return (
    <CustomDataTable
      title={t('tickets_category_page_title', { ns: 'tickets' })}
      columns={columns}
      resource="categories"
      pathApi="support/v1/categories"
      listName="categories"
      canSearch
      extraActionsInHeader={headerActions}
      defaultSortFieldId="name"
      customActionColumns={actionColumns}
      defaultSortAsc={false}
      canDelete
    />
  );
};
