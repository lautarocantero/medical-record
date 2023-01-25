import { createContext, useContext, useMemo, useState } from 'react';

interface CustomDataTableContextProps {
  needRefresh: boolean;
  setNeedRefresh: (value: boolean) => void;
  openSnackBar: boolean;
  setOpenSnackBar: (value: boolean) => void;
  hasError: boolean;
  setHasError: (value: boolean) => void;
  message: string;
  setMessage: (value: string) => void;
  openCreateModal: boolean;
  setOpenCreateModal: (value: boolean) => void;
  showDisabled: boolean;
  setShowDisabled: (value: any) => void;
}

export const CustomDataTableContext = createContext<CustomDataTableContextProps>({} as CustomDataTableContextProps);

export const useCustomDataTable = () => useContext(CustomDataTableContext);

export const CustomDataTableProvider = ({ children }: any) => {
  const [needRefresh, setNeedRefresh] = useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [showDisabled, setShowDisabled] = useState(false);

  const MemoValue = useMemo(() => {
    const value = {
      hasError,
      message,
      needRefresh,
      openCreateModal,
      openSnackBar,
      setHasError,
      setMessage,
      setNeedRefresh,
      setOpenCreateModal,
      setOpenSnackBar,
      setShowDisabled,
      showDisabled,
    };
    return value;
  }, [
    hasError,
    message,
    needRefresh,
    openCreateModal,
    openSnackBar,
    setHasError,
    setMessage,
    setNeedRefresh,
    setOpenCreateModal,
    setOpenSnackBar,
    setShowDisabled,
    showDisabled,
  ]);

  return <CustomDataTableContext.Provider value={MemoValue}>{children}</CustomDataTableContext.Provider>;
};
