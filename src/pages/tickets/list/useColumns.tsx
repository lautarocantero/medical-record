import { useTranslation } from 'react-i18next';
import { MarkChatUnreadRounded } from '@mui/icons-material';
import { CustomDataTableColumnsProps } from '@/src/components/custom-data-table/types/CustomDataTableColumnProps';
import TextLabel from '@/src/components/text-label/TextLabel';
import { Issue, issuesStates } from '../types';
import { ActionColumn, ActionHeader } from '@/src/components/custom-data-table/types/DataTableFormModal';
import { useQueryFilters } from './useQueryFilters';
import ChatComponent from './abm/chat/ChatComponent.container';

export const useColumns = () => {
  const { t } = useTranslation();
  const { queryFilters, StatusSelectorMemo } = useQueryFilters();

  const columns: CustomDataTableColumnsProps<Issue>[] = [
    {
      id: 'id',
      name: t('tickets_list_id_column', { ns: 'tickets' }),
      selector: (row: Issue) => row.id,
      sortField: 'id',
      sortable: false,
      right: true,
      maxWidth: '1%',
    },
    {
      id: 'title',
      name: t('tickets_list_category_column', { ns: 'tickets' }),
      selector: (row: Issue) => row.category?.name,
      sortField: 'title',
      sortable: false,
    },
    {
      id: 'name',
      name: t('tickets_list_name_column', { ns: 'tickets' }),
      selector: (row: Issue) => row.customer.name,
      sortField: 'name',
      sortable: false,
    },
    {
      id: 'surname',
      name: t('tickets_list_surname_column', { ns: 'tickets' }),
      selector: (row: Issue) => row.customer.surname,
      sortField: 'surname',
      sortable: false,
    },
    {
      id: 'email',
      name: t('tickets_list_email_column', { ns: 'tickets' }),
      selector: (row: Issue) => row.customer.email,
      sortField: 'email',
      sortable: false,
    },
    {
      id: 'phone_number',
      name: t('tickets_list_phone_number_column', { ns: 'tickets' }),
      selector: (row: Issue) => row.customer.full_phone_number,
      sortField: 'phone_number',
      sortable: false,
      right: true,
    },
    {
      id: 'status',
      name: t('tickets_list_status_column', { ns: 'tickets' }),
      cell: (row: any) => (
        <TextLabel
          text={row.status.name.toLocaleUpperCase()}
          color="#F7F7F7"
          padding="2px 12px"
          width="100px"
          bg={issuesStates[row.status.code]}
        />
      ),
      selector: (row: Issue) => row.status.code,
      sortField: 'status',
      sortable: false,
      center: true,
    },
  ];

  const headerActions: ActionHeader[] = [
    {
      id: 'status-select',
      component: () => <StatusSelectorMemo />,
    },
  ];

  const actionColumns: ActionColumn[] = [
    {
      id: 'detail',
      customizedTitle: true,
      icon: (props: any) => (
        <MarkChatUnreadRounded
          sx={{ ...props.sx, color: props.row.has_pending_messages ? '#516F3F' : 'secondary.main' }}
        />
      ),
      component: (props: any) => <ChatComponent {...props} />,
    },
  ];

  return { columns, headerActions, actionColumns, queryFilters };
};
