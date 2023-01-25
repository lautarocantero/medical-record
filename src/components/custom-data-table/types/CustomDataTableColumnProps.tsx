import { TableColumn } from 'react-data-table-component';

export interface CustomDataTableColumnsProps<T> extends TableColumn<T> {
  sortField: string;
  id: string;
  omitExport?: boolean;
}
