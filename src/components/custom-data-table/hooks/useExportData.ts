import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { axiosAuthenticationInstance } from '@/src/api/instances/authInstance';
import { exportFromJson } from '@/src/utilities/helpers/xlsxExportHelper';
import { lowerFirsLetter } from '@/src/utilities/helpers/stringsHelper';
import { ExtraQueryFiltersProps } from '../types/DataTableFormModal';

const useExportData = (
  resource: string,
  columns: Array<any>,
  pathApi: string,
  extraFilters?: Array<ExtraQueryFiltersProps>,
) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const addExtraQueryFilters = () => {
    let extraQueryFilters = '';
    if (extraFilters?.length === 2 || extraFilters?.length === 1) {
      extraFilters?.forEach((element: ExtraQueryFiltersProps) => {
        extraQueryFilters += `&${element.query}=${element.queryValue}`;
      });
    }
    return extraQueryFilters;
  };

  const handleExportData = () => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await axiosAuthenticationInstance.get(
          `${pathApi}?page=0&pageSize=10000&searchText=${addExtraQueryFilters()}`,
        );

        const columnsToShow = columns
          .filter((x) => !x.omitExport)
          .map((column) => ({
            id: column.id,
            name: column.name,
            selector: column.selector,
          }));

        const resourceFormated = resource.replace('-', '_');

        const formattedData = response.data[resourceFormated].map((x: any) => {
          const row: any = {};
          columnsToShow.forEach(({ name, selector }: { name: string; selector: any }) => {
            row[name as keyof typeof row] = selector(x);
          });
          return row;
        });

        exportFromJson(
          formattedData,
          columnsToShow.map((x) => x.name),
          lowerFirsLetter(t(`${resource.replace('-', '_')}`)),
        );
      } catch (e: any) {
        throw new Error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  };
  return { handleExportData, loading };
};

export default useExportData;
