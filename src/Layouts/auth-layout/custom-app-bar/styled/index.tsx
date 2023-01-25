import { AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PanoramaLogo = styled('div')((props: { src: any }) => ({
  background: `url(${props.src}) no-repeat center right transparent`,
  backgroundSize: 'contain',
  height: '40px',
  width: '100%',
  marginBottom: '16px',
}));

export const FixedAppBar = styled(AppBar)`
  position: fixed;
  background: white;
`;

export const CustomToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
