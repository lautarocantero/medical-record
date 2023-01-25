import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../context/AuthContext';
import { changePassword } from '@/src/api/endpoints/auth';
import { errorHandlerHelper } from '@/src/utilities/helpers/errorHandlerHelper';

export const usePasswordHandler = () => {
  const { setIsPasswordUpdated } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<{ code: string; error_messages: string } | null | undefined>(null);
  const { mutate: onChangePassword, isLoading } = useMutation(changePassword, {
    onSuccess: async () => {
      setIsPasswordUpdated('fulfilled');
    },
    onError: async (err: any) => {
      setIsPasswordUpdated('rejected');
      setErrorMessage(errorHandlerHelper(err));
    },
  });

  return { onChangePassword, isLoading, errorMessage };
};
