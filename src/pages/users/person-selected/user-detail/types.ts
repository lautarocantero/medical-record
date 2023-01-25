import { FormikValues } from 'formik';

export interface ColumnsRelativesType {
  id: number;
  person: {
    area_code: string;
    avatar_url: string | null;
    country_code: string;
    email: string;
    id: number;
    name: string;
    phone_number: string;
    surname: string;
  };
  relationship_type: { name: string };
}

export interface ColumnsPetsType {
  birthday: number;
  comments: string;
  fur_type: { name: string };
  id: number;
  is_sterilized: boolean;
  last_vaccination_date: number;
  name: string;
  sex: { name: string };
  size: { name: string };
  type: { name: string };
}

export interface ColumnsVehiclesType {
  brand: { name: string };
  color: { name: string };
  comments: string;
  fuel_type: { name: string };
  id: number;
  is_rented: boolean;
  license_plate: string;
  model: { name: string };
}

export interface DataTableForUserProps {
  title: string | undefined;
  data: Array<ColumnsRelativesType | ColumnsVehiclesType | ColumnsPetsType>;
  columns: Array<{
    id: string | number;
    name: string;
    selector: (row: ColumnsRelativesType | ColumnsVehiclesType | ColumnsPetsType) => string;
    sortField: string;
    sortable: boolean;
    minWidth?: string;
  }>;
}

export interface DetailGenericoProps {
  row: ColumnsPetsType | ColumnsVehiclesType | null;
  open: any;
  handleClose: any;
}

export interface UserCardProps {
  values: FormikValues;
  hasTables: boolean;
}
