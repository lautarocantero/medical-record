import { Theme } from '@mui/material';
import useBreakpoints from '@/src/hooks/useBreakpoints';
import DrawerList from './DrawerList';
import { StyledDrawer, DrawerHeader, DrawerLogo, DrawerHolderBox } from './StyledDrawer';
import { useDrawerTools } from './UseDrawerTools';
import { useExportAssets } from '@/src/assets/exportFile';

interface Props {
  open: boolean;
  handleDrawerClose: () => void;
  theme: Theme;
  drawerwidth: number;
  handleDrawerOpen: () => void;
  menuCollapsed: boolean;
  setMenuCollapsed: (value: boolean) => void;
}
export const Drawer = ({
  open,
  handleDrawerClose,
  theme,
  drawerwidth,
  handleDrawerOpen,
  menuCollapsed,
  setMenuCollapsed,
}: Props) => {
  const { listButtonSelected, handleNavigate } = useDrawerTools();
  const { mainLogo } = useExportAssets();
  const handleMenuCollapse = () => {
    setMenuCollapsed(!menuCollapsed);
    localStorage.setItem('menuCollapsed', menuCollapsed.toString());
  };
  const { matchesMd } = useBreakpoints();

  return (
    <StyledDrawer
      variant="permanent"
      open={open}
      drawerwidth={drawerwidth}
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
    >
      <DrawerHeader>
        <DrawerLogo src={mainLogo} open={open} />
      </DrawerHeader>
      <DrawerList open={open} theme={theme} listButtonSelected={listButtonSelected} handleNavigate={handleNavigate} />
      {open && !matchesMd && (
        <DrawerHolderBox>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            data-tour="toggle-icon"
            style={{
              cursor: 'pointer',
            }}
            className="text-primary toggle-icon d-none d-xl-block"
            onClick={handleMenuCollapse}
          >
            {menuCollapsed ? (
              <circle cx="12" cy="12" r="10" />
            ) : (
              <>
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
              </>
            )}
          </svg>
        </DrawerHolderBox>
      )}
    </StyledDrawer>
  );
};
