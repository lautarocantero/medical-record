import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useBreakpoints from '@/src/hooks/useBreakpoints';
import { LanguageModal } from './language-modal/LanguageModal';
import { Drawer } from './drawer/Drawer';
import CustomAppBar from './custom-app-bar/CustomAppBar';
import DrawerModal from './drawer/DrawerModal';
import { AuthLayoutContainer, AuthLayoutNav, AuthLayoutMain } from './AuthLayout.styled';

export const AuthLayout = () => {
  const { matchesSm, matchesMd } = useBreakpoints();
  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(
    matchesMd ? true : localStorage.getItem('menuCollapsed') === 'false',
  );

  const [open, setOpen] = React.useState(false);
  const [drawerwidth, setDrawerwidth] = useState(!open ? 56 : 240);

  useEffect(() => {
    setDrawerwidth(!menuCollapsed || open ? 240 : 56);
  }, [open, menuCollapsed]);

  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AuthLayoutContainer>
      <AuthLayoutNav component="nav" width={drawerwidth} aria-label="mailbox folders">
        {!matchesMd && (
          <Drawer
            open={!menuCollapsed || open}
            handleDrawerClose={handleDrawerClose}
            theme={theme}
            drawerwidth={drawerwidth}
            handleDrawerOpen={handleDrawerOpen}
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          />
        )}
      </AuthLayoutNav>
      <AuthLayoutMain component="main" width={matchesSm ? '100%' : `calc(100% - ${drawerwidth}px)`}>
        {matchesMd && <CustomAppBar openDrawer={handleDrawerOpen} />}
        <Outlet />
        <LanguageModal />
        {matchesMd && <DrawerModal open={open} onClose={handleDrawerClose} theme={theme} />}
      </AuthLayoutMain>
    </AuthLayoutContainer>
  );
};
