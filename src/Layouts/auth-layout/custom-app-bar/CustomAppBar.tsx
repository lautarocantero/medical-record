import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton } from '@mui/material';
import { useExportAssets } from '@/src/assets/exportFile';
import { PanoramaLogo, FixedAppBar, CustomToolBar } from './styled';

const CustomAppBar = ({ openDrawer }: CustomAppBarProps) => {
  const { mainLogo } = useExportAssets();
  return (
    <Box>
      <FixedAppBar>
        <CustomToolBar>
          <IconButton color="inherit" aria-label="open drawer" onClick={openDrawer}>
            <MenuIcon color="primary" />
          </IconButton>
          <PanoramaLogo src={mainLogo} />
        </CustomToolBar>
      </FixedAppBar>
    </Box>
  );
};

export default CustomAppBar;

interface CustomAppBarProps {
  openDrawer: () => void;
}
