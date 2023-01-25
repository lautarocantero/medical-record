import { useTranslation } from 'react-i18next';
import CustomDataTable from '@/src/components/custom-data-table/CustomDataTable';
import { useColumns } from './useColumns';

export const TicketsPage = () => {
  const { t } = useTranslation();
  const { columns, headerActions, queryFilters, actionColumns } = useColumns();

  return (
    <CustomDataTable
      title={t('tickets_page_title', { ns: 'tickets' })}
      columns={columns}
      resource="issues"
      pathApi="support/v1/issues"
      listName="issues"
      canSearch
      canExport
      defaultSortFieldId="title"
      defaultSortAsc={false}
      extraFilters={queryFilters}
      extraActionsInHeader={headerActions}
      customActionColumns={actionColumns}
    />
  );
};
