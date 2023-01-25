import { useQuery } from '@tanstack/react-query';
import { customerSelected } from '@/src/api/endpoints/users';
import { useGetAdditionalData } from './components/helper/fetchHelper';
import { useColumns } from './user-detail/useColumns';
import UserDetail from './user-detail/UserDetail';

export type CustomDataPropsType = {
  close: () => void;
  row: {
    id: string;
    is_disabled: boolean;
    name: string;
    phone_number: string;
    properties: Array<{ id: number; address: string; code: string; from: number | null; to: number | null }>;
  };
  setSnackBarMessageSuccess: (msj: string) => void;
  setSnackBarMessageError: (msj: string) => void;
};

export const PersonSelected = ({ row }: CustomDataPropsType) => {
  const { data: infoCustomerSelected, isLoading } = useQuery({
    queryKey: [`customerSelected_${row.id}`],
    queryFn: () => customerSelected(row.id),
  });
  const { columnsRelatives, columnsPets, columnsVehicles, handleClose, openDetail, currentRow } = useColumns();
  const { data: relativesData, isLoading: isLoadingRelatives } = useGetAdditionalData('relatives', row.id);
  const { data: VehiclesData, isLoading: isLoadingVehicles } = useGetAdditionalData('vehicles', row.id);
  const { data: PetsData, isLoading: isLoadingPets } = useGetAdditionalData('pets', row.id);
  const isLoadingGneral = isLoading || isLoadingRelatives || isLoadingPets || isLoadingVehicles;

  const customerData = infoCustomerSelected?.data.customer;
  const values = {
    areaCode: customerData?.telephone.area_code ?? '',
    countryCode: customerData?.telephone.country_code ?? '+549',
    email: customerData?.email ?? '',
    name: customerData?.name ?? '',
    phoneNumber: customerData?.telephone.number ?? '',
    properties: customerData?.properties,
    surname: customerData?.surname ?? '',
    avatarSrc: customerData?.avatar_url ?? '',
    birthday: customerData?.birthday ?? '',
    gender: customerData?.gender ?? '',
    isDisabled: row.is_disabled,
  };

  const childProps = {
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
  };

  return <UserDetail {...childProps} />;
};
