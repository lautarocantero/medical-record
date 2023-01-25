import { Card, CardContent, CardHeader } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FadeIn } from '@/src/components/animations';
import AlertNoData from '@/src/components/custom-data-table/components/AlertNoData';
import DataTableStyled from '@/src/components/custom-data-table/CustomDataTable.styled';
import { DataTableForUserProps } from './types';

const CustomDataTableForUser = ({ title, data, columns }: DataTableForUserProps) => {
  const { t } = useTranslation();
  const pageSize = 2;
  const [page, setPage] = useState(0);
  const currentPage = page * pageSize;
  const finalPage = currentPage !== 0 && currentPage * 2;
  const handlePageChange = (pag: number) => {
    setPage(pag - 1);
  };

  return (
    <FadeIn>
      <Card
        sx={{
          marginBottom: '16px',
          boxShadow: 2,
          width: '100%',
        }}
      >
        <CardHeader title={title} titleTypographyProps={{ variant: 'h6' }} sx={{ padding: '8px' }} />
        <CardContent sx={{ padding: '0px !important' }}>
          <DataTableStyled
            dense
            columns={columns}
            onChangePage={handlePageChange}
            data={data?.slice(currentPage, finalPage || pageSize)}
            noDataComponent={<AlertNoData title={t('no_data_was_found')} />}
            theme="palierGridTheme"
          />
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default CustomDataTableForUser;
