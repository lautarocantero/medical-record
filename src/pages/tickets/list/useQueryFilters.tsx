import { Autocomplete, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IssueState, TicketsStateProps } from '../types';

export const useQueryFilters = () => {
  const [queryFilters, setQueryFilters] = useState<Array<TicketsStateProps['filter']>>([
    { query: 'issueStateCode', queryValue: '' },
  ]);
  const { t } = useTranslation();
  const issuesStates = [
    {
      key: 'Open',
      value: t('issue_open_state', { ns: 'tickets' }),
    },
    {
      key: 'InProgress',
      value: t('issue_inprogress_state', { ns: 'tickets' }),
    },
    {
      key: 'Closed',
      value: t('issue_closed_state', { ns: 'tickets' }),
    },
  ];

  const handleStateClick = (state: IssueState) => {
    setQueryFilters([{ query: 'issueStateCode', queryValue: state?.key ?? '' }]);
  };
  const StatusSelector = () => (
    <Autocomplete
      id="statusFilter"
      sx={{
        width: '180px',
      }}
      size="small"
      value={issuesStates?.find((issueState: any) => queryFilters[0].queryValue === issueState.key)}
      getOptionLabel={(option: any) => option?.value}
      options={issuesStates}
      onChange={(e: any, value: any) => {
        handleStateClick(value);
      }}
      renderInput={(params: any) => (
        <TextField
          {...params}
          sx={{ width: '100%' }}
          variant="outlined"
          label={t('tickets_list_status_filter_label', { ns: 'tickets' })}
          placeholder={t('tickets_list_status_filter_placeholder', { ns: 'tickets' })}
        />
      )}
    />
  );
  const StatusSelectorMemo = useMemo(() => StatusSelector, [t]);

  return { queryFilters, StatusSelectorMemo };
};
