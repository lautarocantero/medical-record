import { useState, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '@/src/context/AuthContext';
import { getUserInfo, updateUserInfo } from '@/src/api/endpoints/admin-users';
import { errorHandlerHelper } from '@/src/utilities/helpers/errorHandlerHelper';
import { User } from './types';

export const useGetUserInfo = () => {
  const [errorMessage, setErrorMessage] = useState<{ code: string; error_messages: string } | null | undefined>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isUserUpdatedStatus, setIsUserUpdatedStatus] = useState<'idle' | 'fulfilled' | 'rejected'>('idle');
  const { user } = useContext(AuthContext);

  const ResetStatus = () => {
    setIsUserUpdatedStatus('idle');
  };

  const { mutate: onGetUserInfo, isLoading } = useMutation(getUserInfo, {
    onSuccess: async (payload: any) => {
      setUserInfo(payload.data.profile);
      ResetStatus();
    },
    onError: async (err: any) => {
      setErrorMessage(errorHandlerHelper(err));
    },
  });

  const { mutate: onUpdateUser, isLoading: isUpdateUserLoading } = useMutation(updateUserInfo, {
    onSuccess: async () => {
      setIsUserUpdatedStatus('fulfilled');
    },
    onError: async (err: any) => {
      setIsUserUpdatedStatus('rejected');
      setErrorMessage(errorHandlerHelper(err));
    },
  });

  return {
    onGetUserInfo,
    userInfo,
    isLoading,
    isUpdateUserLoading,
    errorMessage,
    isUserUpdatedStatus,
    onUpdateUser,
    ResetStatus,
    user,
  };
};
