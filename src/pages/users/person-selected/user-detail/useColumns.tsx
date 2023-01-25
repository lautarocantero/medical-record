import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Visibility } from '@mui/icons-material';
import { ColumnsPetsType, ColumnsRelativesType, ColumnsVehiclesType } from './types';
import { CustomDataTableColumnsProps } from '@/src/components/custom-data-table/types/CustomDataTableColumnProps';

export const useColumns = () => {
  const { t } = useTranslation();
  const [openDetail, setOpenDetail] = useState(false);
  const [currentRow, setCurrentRow] = useState<ColumnsPetsType | ColumnsVehiclesType | null>(null);
  const handleClose = () => {
    setCurrentRow(null);
    setOpenDetail(false);
  };
  const handleOpen = (current: any) => {
    setCurrentRow(current);
    setOpenDetail(true);
  };
  const columnsRelatives = [
    {
      name: t('relationship', { ns: 'customerUsers' }),
      selector: (row: ColumnsRelativesType) => row.relationship_type.name,
      sortable: true,
      minWidth: '140px',
    },
    {
      name: t('name'),
      selector: (row: ColumnsRelativesType) => `${row.person.name}`,
      sortable: true,
    },
    {
      name: t('surname'),
      selector: (row: ColumnsRelativesType) => `${row.person.surname}`,
      sortable: true,
      minWidth: '140px',
    },
    {
      name: t('email', { ns: 'common' }),
      selector: (row: ColumnsRelativesType) => row.person.email,
      sortable: true,
      minWidth: '180px',
    },
    {
      name: t('residents_list_phone_number_column', { ns: 'customerUsers' }),
      selector: (row: ColumnsRelativesType) =>
        `${row.person.country_code} ${row.person.area_code} ${row.person.phone_number}`,
      sortable: true,
      minWidth: '180px',
    },
  ];

  const columnsPets: CustomDataTableColumnsProps<any>[] = [
    {
      id: 'name',
      sortField: 'name',
      name: t('name'),
      selector: (row: ColumnsPetsType) => row.name,
      sortable: true,
    },
    {
      id: 'kind',
      sortField: 'kind',
      name: t('kind', { ns: 'customerUsers' }),
      selector: (row: ColumnsPetsType) => row.type?.name,
      sortable: true,
    },
    {
      id: 'birthday',
      sortField: 'birthday',
      name: t('birthday', { ns: 'customerUsers' }),
      selector: (row: ColumnsPetsType) => row.birthday,
      sortable: true,
    },
    {
      id: 'padron',
      sortField: 'padron',
      name: t('size', { ns: 'customerUsers' }),
      selector: (row: ColumnsPetsType) => row.size?.name,
      sortable: true,
    },
    {
      id: 'sex',
      sortField: 'sex',
      name: t('sex', { ns: 'customerUsers' }),
      selector: (row: ColumnsPetsType) => row.sex?.name,
      sortable: true,
    },
    {
      id: 'fur_type',
      sortField: 'fur_type',
      name: t('fur_type', { ns: 'customerUsers' }),
      selector: (row: ColumnsPetsType) => row.fur_type?.name,
      sortable: true,
    },
    {
      id: 'is_sterialized',
      sortField: 'is_sterialized',
      name: t('is_sterialized', { ns: 'customerUsers' }),
      selector: (row: ColumnsPetsType) => (row.is_sterilized ? `${t('yes')}` : 'No'),
      sortable: false,
    },
    {
      id: 'comments',
      sortField: 'comments',
      name: t('comments', { ns: 'customerUsers' }),
      center: true,
      maxWidth: '200px',
      cell: (row: ColumnsPetsType) =>
        row.comments ? (
          <Visibility cursor="pointer" onClick={() => handleOpen(row)} sx={{ color: 'secondary.main' }} />
        ) : (
          '-'
        ),
    },
  ];

  const columnsVehicles: CustomDataTableColumnsProps<any>[] = [
    {
      id: 'vehicle_brand',
      sortField: 'vehicle_brand',
      name: t('vehicle_brand', { ns: 'customerUsers' }),
      selector: (row: ColumnsVehiclesType) => row.brand.name,
      sortable: true,
    },
    {
      id: 'vehicle_model',
      sortField: 'vehicle_model',
      name: t('vehicle_model', { ns: 'customerUsers' }),
      selector: (row: ColumnsVehiclesType) => row.model.name,
      sortable: true,
    },
    {
      id: 'vehicle_color',
      sortField: 'vehicle_color',
      name: t('vehicle_color', { ns: 'customerUsers' }),
      selector: (row: ColumnsVehiclesType) => row.color.name,
      sortable: true,
    },
    {
      id: 'vehicle_plate',
      sortField: 'vehicle_plate',
      name: t('vehicle_plate', { ns: 'customerUsers' }),
      selector: (row: ColumnsVehiclesType) => row.license_plate,
      sortable: true,
    },
    {
      id: 'fuel_type_value',
      sortField: 'fuel_type_value',
      name: t('fuel_type_value', { ns: 'customerUsers' }),
      selector: (row: ColumnsVehiclesType) => row.fuel_type.name,
      sortable: true,
    },
    {
      id: 'is_rented',
      sortField: 'is_rented',
      name: t('is_rented', { ns: 'customerUsers' }),
      selector: (row: ColumnsVehiclesType) => (row.is_rented ? `${t('yes')}` : 'No'),
      sortable: false,
    },
    {
      id: 'comments',
      sortField: 'comments',
      name: t('comments', { ns: 'customerUsers' }),
      center: true,
      maxWidth: '200px',
      cell: (row: ColumnsVehiclesType) =>
        row.comments ? (
          <Visibility cursor="pointer" onClick={() => handleOpen(row)} sx={{ color: 'secondary.main' }} />
        ) : (
          '-'
        ),
    },
  ];

  return {
    columnsRelatives,
    columnsPets,
    columnsVehicles,
    handleClose,
    currentRow,
    openDetail,
    handleOpen,
  };
};
