import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export interface Issue {
  id: number;
  creation_date: number;
  has_pending_messages: boolean;
  category: {
    name: string;
  };
  customer: {
    name: string;
    surname: string;
    email: string;
    full_phone_number: string;
  };
  status: {
    name: string;
    code: string;
  };
}

export type TIssueStateOptions = {
  [key: string]: string;
};

export const issuesStates: TIssueStateOptions = {
  Open: '#CA8A04',
  InProgress: '#516F3F',
  Closed: '#424867',
};

export type TicketsStateProps = {
  filter: {
    query: string | null;
    queryValue: string | null;
  };
};

export type IssueState = { key: string; value: string };
export type CategoryRow = { id: number; name: string };

export interface CreateCategoryProps {
  close: () => void;
  row: CategoryRow;
  setSnackBarMessageError: (message: string) => void;
  setSnackBarMessageSuccess: (message: string) => void;
}

export interface ClosingIssueProps {
  open: boolean;
  onProceed: () => void;
  proceed: boolean;
  onClose: () => void;
  issueName: string;
  closingComment: string;
  setClosingComment: (value: string) => void;
  handleClosiingIssueComplete: () => void;
  isLoading: boolean;
  errorClosingIssue: string | null;
}

export type RowProps = {
  creation_date: number;
  customer: { name: string; surname: string; email: string; full_phone_number: string };
  id: number;
  status: { name: string; code: string };
  title: string;
};
export interface ChatComponentProps {
  data: {
    creation_date: number;
    customer: { name: string; surname: string; email: string; full_phone_number: string };
    id: number;
    messages: Array<MessageType>;
    status: { name: string; code: string };
    title: string;
  };
  handleOpenImageViewer: (textInfo: MessageType) => void;
  openBiggerImage: boolean;
  imageSelectedUrl: string | null;
  handleCloseImageViewer: () => void;
  setSnackBarMessageSuccess: (argument: string) => void;
  row: RowProps;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
  chatBoxReference: React.MutableRefObject<HTMLDivElement | null>;
  handleCloseModal: () => void;
  modalTitle: string;
}

export type MessageType = {
  creation_date: number;
  id: 1;
  image_url: string | null;
  origin: 'App' | 'BackOffice';
  text: string;
};

export interface IncomingTableProps {
  row: RowProps;
  close: () => void;
  setSnackBarMessageError: (msj: string) => void;
  setSnackBarMessageSuccess: (msj: string) => void;
}
