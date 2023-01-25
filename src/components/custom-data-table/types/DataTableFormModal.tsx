import { FunctionComponent } from 'react';
import { TLanguagesOptions } from '@/src/utilities/helpers/commonTypes';

export interface DataTableFormModal {
  close: () => void;
  setSnackBarMessageError: (message: string) => void;
  setSnackBarMessageSuccess: (message: string) => void;
}

export interface DataTableEditFormModal extends DataTableFormModal {
  entity: any;
}

export interface CustomIconProps {
  sx: { color: string; cursor: string };
  row: any;
}

export interface ActionColumn {
  id: string;
  component?: FunctionComponent;
  icon: (props: CustomIconProps) => JSX.Element;
  width?: string | TLanguagesOptions;
  onIconClick?: any;
  isHidden?: (props: any) => boolean;
  customizedTitle?: boolean;
}

export interface ActionHeader {
  id: string;
  component: FunctionComponent;
}

export interface ExtraQueryFiltersProps {
  query: string | null;
  queryValue: string | number | boolean | null;
}

export interface CanExportProps {
  resource: string;
  columns: Array<any>;
  pathApi: string;
  extraFilters?: Array<ExtraQueryFiltersProps>;
  pageLoading: boolean;
  fake?: boolean;
}
