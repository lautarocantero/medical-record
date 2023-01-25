import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import UserCard from './UserCard';
import CustomLoader from '@/src/components/custom-loader';
import CommentModal from './CommentModal';
import CustomDataTableForUser from './CustomDataTableForUser';

const UserDetail = ({
  values,
  relativesData,
  VehiclesData,
  PetsData,
  columnsRelatives,
  columnsPets,
  columnsVehicles,
  handleClose,
  openDetail,
  currentRow,
  isLoadingGneral,
}: any) => {
  const { t } = useTranslation();
  const hasTables =
    relativesData?.relatives.length > 0 || PetsData?.pets.length > 0 || VehiclesData?.vehicles.length > 0;

  const style = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      flexDirection: { xs: 'column', lg: 'row' },
      gap: { xs: 3, md: '8px' },
      marginTop: '8px',
    },
    containerFirstChildren: {},
    tableContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  };

  return isLoadingGneral ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <CustomLoader />
    </Box>
  ) : (
    <Box sx={style.container}>
      <UserCard values={values} hasTables={hasTables} />
      {hasTables && (
        <Box sx={style.tableContainer}>
          {relativesData.relatives.length > 0 && (
            <CustomDataTableForUser
              title={t('relatives', { ns: 'customerUsers' })}
              columns={columnsRelatives}
              data={relativesData.relatives}
            />
          )}
          {PetsData.pets.length > 0 && (
            <CustomDataTableForUser
              title={t('pets', { ns: 'customerUsers' })}
              columns={columnsPets}
              data={PetsData.pets}
            />
          )}
          {VehiclesData.vehicles.length > 0 && (
            <CustomDataTableForUser
              title={t('vehicles', { ns: 'customerUsers' })}
              columns={columnsVehicles}
              data={VehiclesData.vehicles}
            />
          )}
        </Box>
      )}
      {openDetail && <CommentModal row={currentRow} open={openDetail} handleClose={handleClose} />}
    </Box>
  );
};
export default UserDetail;
