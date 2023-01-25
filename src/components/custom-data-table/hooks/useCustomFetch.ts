import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axiosAnonInstanceFake from '@/src/api/instances/anonInstancesFake';
import { axiosAuthenticationInstance } from '@/src/api/instances/authInstance';
import useSnackBar from '../useSnackBar';
import { useCustomDataTable } from '../CustomDataTableContext';
import useBreakpoints from '@/src/hooks/useBreakpoints';
import { ExtraQueryFiltersProps } from '../types/DataTableFormModal';

const useCustomFetch = (
  resource: string,
  pathApi: string,
  listName: string,
  canDisable: boolean,
  fake?: boolean,
  extraFilters?: Array<ExtraQueryFiltersProps>,
  defaultSortFieldId?: string,
  defaultSortAsc?: boolean,
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const { SnackBar } = useSnackBar();
  const { i18n } = useTranslation();
  const { needRefresh, setNeedRefresh, showDisabled } = useCustomDataTable();
  const { matchesSm } = useBreakpoints();
  const pageSize: number = Math.ceil((window.innerHeight - (matchesSm ? 350 : 260)) / 30) - 1;

  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [orderField, setOrderField] = useState(defaultSortFieldId);
  const [orderDescending, setOrderDescending] = useState<boolean>(!defaultSortAsc);
  const addExtraQueryFilters = () => {
    let extraQueryFilters = '';
    if (canDisable) extraQueryFilters = `&showDisabled=${showDisabled}`;
    if (resource === 'people') {
      extraQueryFilters += `&justLeaseSigners=${!showDisabled}`;
    }
    if (extraFilters?.length === 2 || extraFilters?.length === 1) {
      extraFilters?.forEach((element: ExtraQueryFiltersProps) => {
        extraQueryFilters += `&${element.query}=${element.queryValue}`;
      });
    }
    return extraQueryFilters;
  };

  const loadData = async (abort?: any) => {
    setLoading(true);
    const url = `${pathApi}?page=${page}&pageSize=${pageSize}&searchText=${searchText}&orderField=${orderField}&orderDescending=${orderDescending}${addExtraQueryFilters()}`;
    setTimeout(async () => {
      try {
        const instance = fake ? axiosAnonInstanceFake : axiosAuthenticationInstance;
        const response = await instance.get(url, abort);
        const resp = response.data;
        const listNameSplit = listName.split('.');
        let getAllObject: any = null;
        listNameSplit.forEach((element) => {
          if (!getAllObject) {
            getAllObject = resp[element];
          } else {
            getAllObject = getAllObject[element];
          }
        });
        setData(getAllObject);
        setTotalRows(resp.total_count);
        setLoading(false);
      } catch (e: any) {
        setData([]);
      }
    }, 1000);
  };
  useEffect(() => {
    const abortCont = new AbortController();
    loadData({ signal: abortCont.signal });
    return () => abortCont.abort();
  }, [page, searchText, orderField, orderDescending, showDisabled, i18n.language, extraFilters]);

  useEffect(() => {
    // const abortCont = new AbortController();
    if (needRefresh) loadData();
    return function cleanup() {
      setNeedRefresh(false);
    };
  }, [needRefresh]);

  const handlePageChange = (pag: number) => {
    setPage(pag - 1);
  };

  const handleSort = (column: any, sortDirection: string) => {
    if (column?.sortField !== undefined) {
      setOrderField(column.sortField);
    }

    setOrderDescending(sortDirection === 'desc');
  };

  return {
    SnackBar,
    data,
    handlePageChange,
    handleSort,
    loading,
    pageSize,
    setSearchText,
    totalRows,
    setNeedRefresh,
  };
};

export default useCustomFetch;
