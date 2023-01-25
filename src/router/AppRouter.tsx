import { useEffect, useState, useContext } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { AuthLayout } from '../layouts/auth-layout';
import LoginLayout from '../layouts/auth/LoginLayout';
import HelmetLayout from '../layouts/helmet-layout/HelmetLayout';

import {
  // TEMPORARY IMPORT
  LoginContainer as Login,
} from '../pages';
import ForgotPassword from '../pages/forgot-password/ForgotPasswordPage';
import { getMenus } from '../utilities/storage';
import { pages } from './pages';

export const AppRouter = () => {
  const { loginStatus } = useContext(AuthContext);
  const [statusStore, setStatusStore] = useState<string | null>(localStorage.getItem('tokenId'));
  const menus = getMenus();
  const patient = { id: 30, name: 'patients' };
  if (menus) menus.push(patient);

  useEffect(() => {
    setStatusStore(localStorage.getItem('tokenId'));
  }, [loginStatus]);

  return (
    <Routes>
      <Route element={<HelmetLayout />}>
        {menus && menus.length > 0 && statusStore !== null ? (
          <Route element={<AuthLayout />}>
            {menus?.map((menu: any) => (
              <Route key={menu.name} path={`/${menu.name}`} element={pages[menu.name]} />
            ))}
            {/* <Route key={menu.name} path={`/${menu.name}`} element={pages[menu.name]} /> */}
            {menus && menus.length > 0 && <Route path="*" element={<Navigate to={`/${menus[0].name}`} replace />} />}
          </Route>
        ) : (
          <Route path="/auth">
            <Route element={<LoginLayout />}>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            </Route>
          </Route>
        )}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Route>
    </Routes>
  );
};
