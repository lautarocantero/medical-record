import { Outlet } from 'react-router-dom';
import { useExportAssets } from '../../assets/exportFile';
import { Container, FormWrapper, GlassWrapper } from './LoginLayout.styled';

const LoginLayout = () => {
  const { backgroundPic } = useExportAssets();
  return (
    <Container bgimage={backgroundPic}>
      <GlassWrapper>
        <FormWrapper>
          <Outlet />
        </FormWrapper>
      </GlassWrapper>
    </Container>
  );
};

export default LoginLayout;
