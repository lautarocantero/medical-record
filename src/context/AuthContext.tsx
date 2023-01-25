import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';
import { User } from '../hooks/auth/types';

type IntialState = {
  loginStatus: string;
  setLoginStatus: Dispatch<SetStateAction<string>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<string | null>>;
  isPasswordUpdated: string;
  setIsPasswordUpdated: Dispatch<SetStateAction<string>>;
  ResetStatus: () => void;
  noUserAllowedErrorMessage: { code: string } | null;
  setNoUserAllowedErrorMessage: Dispatch<SetStateAction<{ code: string } | null>>;
};

export const AuthContext = createContext({} as IntialState);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loginStatus, setLoginStatus] = useState('idle');
  const [user, setUser] = useState(JSON.parse(String(localStorage.getItem('user-old'))));
  const [isPasswordUpdated, setIsPasswordUpdated] = useState('idle');
  const [noUserAllowedErrorMessage, setNoUserAllowedErrorMessage] = useState<{ code: string } | null>(null);
  const ResetStatus = () => {
    setIsPasswordUpdated('idle');
    setLoginStatus('idle');
  };

  const memoedValue = useMemo(() => {
    const value = {
      loginStatus,
      setLoginStatus,
      user,
      setUser,
      isPasswordUpdated,
      setIsPasswordUpdated,
      ResetStatus,
      noUserAllowedErrorMessage,
      setNoUserAllowedErrorMessage,
    };
    return value;
  }, [
    loginStatus,
    setLoginStatus,
    user,
    setUser,
    isPasswordUpdated,
    setIsPasswordUpdated,
    ResetStatus,
    noUserAllowedErrorMessage,
    setNoUserAllowedErrorMessage,
  ]);

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
