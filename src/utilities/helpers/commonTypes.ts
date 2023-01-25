import { FormikValues, FormikErrors } from 'formik';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export type Order = 'asc' | 'desc';
export type Data = {
  column_1: string;
  column_2: string;
  column_3: string;
  column_4: string;
  column_5: string;
  column_6?: string;
  column_7?: string;
  column_8?: string;
  id?: string;
};

export type HeadCell = {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
};

interface RowsState {
  column_1: string;
  column_2: string;
  column_3: string;
  column_4: Array<string> | string;
  column_5: {
    name: string;
    rowData: {
      action: (id: number) => void;
      icon: OverridableComponent<SvgIconTypeMap<string | unknown, 'svg'>> & { muiName: string };
      id: string;
      tooltip: string;
    }[];
  };
}
export interface TableProps {
  rows: Array<RowsState> | Array<Data>;
  headCells: readonly HeadCell[];
  handleRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dense: boolean;
  isSelected: (name: string) => any;
  order: Order;
  orderBy: keyof Data;
  selected: readonly string[];
  page: number;
  rowsPerPage: number;
  tableTitle?: string;
  isLoading: boolean;
  isData: boolean;
  handlerEditDelete: (arg: string, data: any) => void;
  isCreateButton?: boolean;
  createButtonText?: string;
  createFunction?: () => void;
  openDrawer?: boolean;
  toggleDrawer?: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  handleSubmit?: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  values?: FormikValues;
  errors?: FormikErrors<FormikValues>;
  setFieldValue: (
    field: string,
    value: string | number | boolean,
    shouldValidate?: boolean | undefined,
  ) => void | Promise<void> | Promise<FormikErrors<FormikValues>>;
}

export interface Guests {
  invitation_id: number;
  pre_authorization_date: string;
  pre_authorization_time: string;
  name: string;
  surname: string;
  phone: number;
  functional_unit: number;
  guest_name: string;
  guest_surname: string;
  date: string;
  escorts: number;
  status: boolean;
}

export interface Feeds {
  id: number;
  title: string;
  subtitle: string;
  headerimageurl: number;
}

export type TLanguagesOptions = {
  [key: string]: string;
};

export const languages: TLanguagesOptions = {
  en: 'en-US',
  es: 'es-ES',
};
