import { styled } from '@mui/material';
import { FadeIn } from '@/src/components/animations';

export const Container = styled(FadeIn)(({ bgimage }: { bgimage: any }) => ({
  width: '100%',
  height: '100vh',
  background: `url(${bgimage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

export const GlassWrapper = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  align-content: center;
  position: relative;
  background: rgba(89, 80, 80, 0.55);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
`;

export const FormWrapper = styled('div')`
  position: absolute;
  top: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: auto;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  border-radius: 15.5px;
  -webkit-box-shadow: 4px 5px 36px -9px rgba(0, 0, 0, 0.98);
  -moz-box-shadow: 4px 5px 36px -9px rgba(0, 0, 0, 0.98);
  box-shadow: 4px 5px 36px -9px rgba(0, 0, 0, 0.98);
`;

export const Logo = styled('img')({
  width: '50%',
  margin: '5% 0% 10% 0%',
});
