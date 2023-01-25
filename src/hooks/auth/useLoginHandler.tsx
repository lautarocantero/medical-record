import { useContext, useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { login, logout } from '@/src/api/endpoints/auth';
import { errorHandlerHelper } from '@/src/utilities/helpers/errorHandlerHelper';
import { AuthContext } from '../../context/AuthContext';
import { cleanStorage } from '@/src/utilities/storage';
import useSnackBar from '@/src/components/custom-snackbar/useSnackBar';

export const useLogin = (isPasswordChanged?: boolean | undefined) => {
  const { setLoginStatus, setUser, setNoUserAllowedErrorMessage, noUserAllowedErrorMessage } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<{ code: string; error_messages: string } | null | undefined>(null);
  const { SnackBar, setSnackBarMessageSuccess } = useSnackBar();
  const { t } = useTranslation();

  useEffect(() => {
    if (isPasswordChanged !== undefined) {
      setSnackBarMessageSuccess(t('change_password_success', { ns: 'auth' }));
    }
  }, [isPasswordChanged]);

  const { mutate: onLogin, isLoading } = useMutation(login, {
    onSuccess: async (payload: any) => {
      setUser(payload.data.user);
      if (payload.data.menus.length > 0) {
        localStorage.setItem('menus', JSON.stringify(payload.data.menus));
        localStorage.setItem('accessToken', payload.data.access_token);
        localStorage.setItem('refreshToken', payload.data.refresh_token);
        localStorage.setItem('tokenId', payload.data.access_token);
        localStorage.setItem('expiration_date', payload.data.expiration_date);
        localStorage.setItem('user', JSON.stringify(payload.data.user));
        i18n.changeLanguage(i18n.language.split('-')[0]);
        setLoginStatus('authenticated');
        setNoUserAllowedErrorMessage(null);
      } else {
        setNoUserAllowedErrorMessage({ code: 'no_user_allowed_error_message' });
      }
    },
    onError: async (err: any) => {
      setLoginStatus('not-authenticated');
      setErrorMessage(errorHandlerHelper(err));
    },
  });

  const { mutate: onLogout } = useMutation(logout, {
    onSuccess: async () => {
      cleanStorage();
      setLoginStatus('not-authenticated');
    },
    onError: async (err) => {
      setErrorMessage(errorHandlerHelper(err));
    },
  });

  return { onLogin, errorMessage, isLoading, onLogout, noUserAllowedErrorMessage, SnackBar };
};
