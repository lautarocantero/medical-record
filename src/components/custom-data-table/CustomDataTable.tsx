import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Box, Card, CircularProgress, FormControlLabel, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useBreakpoints from '@/src/hooks/useBreakpoints';
import { FadeIn } from '../animations';
import CustomLoader from '../custom-loader';
import AlertNoData from './components/AlertNoData';
import CanDisable from './components/CanDisable';
import CanExport from './components/CanExport';
import CustomTableAction from './components/CustomTableAction';
import CanDelete from './components/delete/CanDelete';
import Search from './components/Search';
import { TableHeader } from './components/TableHeader.styled';
import DataTableStyled from './CustomDataTable.styled';
import { CustomDataTableContext, CustomDataTableProvider } from './CustomDataTableContext';
import useCustomFetch from './hooks/useCustomFetch';
import './style.css';
import { customTheme } from './theme';
import { ActionColumn, ActionHeader, ExtraQueryFiltersProps } from './types/DataTableFormModal';
import useSnackBar from './useSnackBar';
import RefreshButton from '../refresh-button/RefreshButton';
import BackToBaseButton from './components/BackToBaseButton';

interface CustomDataTableProps {
  columns: Array<any>;
  title: string;
  resource: string;
  canDelete?: boolean;
  canDisable?: boolean;
  canExport?: boolean;
  canSearch?: boolean;
  fake?: boolean;
  extraFilters?: Array<ExtraQueryFiltersProps>;
  extraActionsInHeader?: ActionHeader[];
  defaultSortFieldId?: string;
  defaultSortAsc?: boolean;
  listName: string;
  pathApi: string;
  customActionColumns?: ActionColumn[];
  backToBaseGrid?: any;
  exportName?: string;
}

export const CustomDataTableComponent = ({
  columns,
  title,
  resource,
  canDisable = false,
  canDelete,
  canExport,
  canSearch,
  fake = false,
  extraFilters,
  extraActionsInHeader,
  defaultSortFieldId,
  defaultSortAsc,
  listName,
  pathApi,
  customActionColumns,
  backToBaseGrid,
  exportName,
}: CustomDataTableProps) => {
  const { data, loading, totalRows, pageSize, handlePageChange, handleSort, setSearchText, setNeedRefresh } =
    useCustomFetch(resource, pathApi, listName, canDisable, fake, extraFilters, defaultSortFieldId, defaultSortAsc);
  const { t } = useTranslation();
  const { SnackBar }: any = useSnackBar();
  const { matchesSm } = useBreakpoints();
  const { showDisabled, setShowDisabled } = useContext(CustomDataTableContext);
  customTheme();
  const handleSearchChange = async (e: any) => {
    setTimeout(() => {
      setSearchText(e.target.value);
    }, 1000);
  };

  const extraColumnsActions = React.useCallback(
    (row: any) => (
      <Stack direction="row" spacing={2}>
        {customActionColumns &&
          customActionColumns?.length > 0 &&
          customActionColumns.map((customActionColumn: ActionColumn) => {
            if (customActionColumn.isHidden && customActionColumn.isHidden(row))
              return <Box key={customActionColumn.id} sx={{ width: '25px' }} />;
            if (customActionColumn.onIconClick) {
              return (
                <Tooltip
                  key={customActionColumn.id}
                  title={t(customActionColumn.id.replace('-', '_'), { ns: 'cdtModal' })}
                >
                  <Box onClick={() => customActionColumn.onIconClick(row)}>
                    {customActionColumn.icon({ sx: { color: 'secondary.main', cursor: 'pointer' }, row })}
                  </Box>
                </Tooltip>
              );
            }
            return (
              <CustomTableAction
                key={customActionColumn.id}
                row={row}
                component={customActionColumn.component}
                Icon={customActionColumn.icon}
                width={customActionColumn.width}
                modalTitle={resource}
                type={`${customActionColumn.id}`}
                customizedTitle={customActionColumn.customizedTitle}
              />
            );
          })}
        {canDisable && <CanDisable id={row.id} resource={resource} isDisabled={row.is_disabled} />}
        {canDelete && <CanDelete id={row.id} resource={resource} fake={fake} pathApi={pathApi} />}
      </Stack>
    ),
    [],
  );

  let finalColumns = columns;
  if (canDisable || canDelete || (customActionColumns && customActionColumns?.length > 0))
    finalColumns = columns.concat([
      {
        cell: extraColumnsActions,
        name: t('actions'),
        center: true,
        maxWidth: '200px',
      },
    ]);

  const DisableFilter = ({ disabled, disableLoading }: { disabled: boolean; disableLoading: boolean }) => {
    if (!canDisable) {
      return null;
    }
    const iconStyles = {
      backgroundColor: 'transparent',
      border: '1px solid primary',
      color: disableLoading ? 'rgba(0, 0, 0, 0.26)' : 'primary.main',
      borderRadius: '4px',
      marginLeft: matchesSm ? '3px' : '0px',
      ':hover': {
        textDecoration: 'none',
      },
    };
    return (
      <FormControlLabel
        disabled={disableLoading}
        control={
          <IconButton disabled={disableLoading} onClick={() => setShowDisabled((prevState: boolean) => !prevState)}>
            {disabled ? <VisibilityOffRoundedIcon sx={iconStyles} /> : <VisibilityRoundedIcon sx={iconStyles} />}
          </IconButton>
        }
        label={disabled ? t(`hide_${resource.replaceAll('-', '_')}`) : t(`show_${resource.replaceAll('-', '_')}`)}
      />
    );
  };
  const tableHeader = useMemo(
    () => (
      <TableHeader
        left={
          <>
            <div className="flex">
              {backToBaseGrid && <BackToBaseButton disabled={loading} backToBase={backToBaseGrid} />}
              <Typography sx={{ fontSize: '26px', fontWeight: 400, alignSelf: 'center' }}>{title}</Typography>
            </div>
            {matchesSm ? (
              <div>
                <RefreshButton refresh={setNeedRefresh} disabled={loading} />
                {canExport && (
                  <CanExport
                    pageLoading={loading}
                    resource={exportName || resource}
                    columns={columns}
                    pathApi={pathApi}
                    fake={fake}
                    extraFilters={extraFilters}
                  />
                )}
              </div>
            ) : (
              <RefreshButton refresh={setNeedRefresh} disabled={loading} />
            )}
          </>
        }
        right={
          <>
            {canSearch && <Search handleSearchChange={handleSearchChange} disabled={loading} />}
            {canSearch && <DisableFilter disableLoading={loading} disabled={showDisabled} />}
            {loading && extraActionsInHeader ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress color="primary" size="1rem" />
              </Box>
            ) : (
              extraActionsInHeader?.map((item: ActionHeader) => <item.component key={item.id} />)
            )}
            {canExport && !matchesSm && (
              <CanExport
                pageLoading={loading}
                resource={exportName || resource}
                columns={columns}
                pathApi={pathApi}
                fake={fake}
                extraFilters={extraFilters}
              />
            )}
          </>
        }
      />
    ),
    [t, showDisabled, loading],
  );

  const actionsMemo = useMemo(
    () => (
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        {canSearch && (
          <>
            <Search handleSearchChange={handleSearchChange} />
            {DisableFilter}
          </>
        )}
        {canExport && (
          <CanExport
            resource={exportName || resource}
            pageLoading={loading}
            columns={columns}
            pathApi={pathApi}
            fake={fake}
          />
        )}
      </Stack>
    ),
    [t],
  );

  return (
    <Box>
      <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 24px #22292f1a' }}>
        <FadeIn>{tableHeader}</FadeIn>
        <FadeIn>
          <DataTableStyled
            dense
            className="react_dataTable"
            data={data}
            columns={finalColumns}
            noDataComponent={<AlertNoData title={t('no_data_was_found')} />}
            title={title}
            progressPending={loading}
            progressComponent={<CustomLoader />}
            pagination
            paginationServer
            paginationPerPage={pageSize}
            paginationTotalRows={totalRows}
            paginationComponentOptions={{ noRowsPerPage: true }}
            onChangePage={handlePageChange}
            actions={actionsMemo}
            sortServer
            noHeader
            onSort={handleSort}
            defaultSortFieldId={defaultSortFieldId}
            defaultSortAsc={defaultSortAsc}
            theme="palierGridTheme"
          />
        </FadeIn>
      </Card>
      <SnackBar />
    </Box>
  );
};

const CustomDataTable = ({ ...props }: CustomDataTableProps) => (
  <CustomDataTableProvider>
    <CustomDataTableComponent {...props} />
  </CustomDataTableProvider>
);

CustomDataTableComponent.defaultProps = {
  canDelete: false,
  canDisable: false,
  canExport: false,
  canSearch: false,
  extraActionsInHeader: null,
  fake: false,
};
CustomDataTable.defaultProps = {
  canDelete: false,
  canDisable: false,
  canExport: false,
  canSearch: false,
  extraActionsInHeader: null,
  fake: false,
};

export default CustomDataTable;
