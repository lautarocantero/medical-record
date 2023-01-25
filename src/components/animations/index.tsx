import { styled, keyframes } from '@mui/material';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const FadeIn = styled('div')(({ duration }: { duration?: string }) => ({
  animation: fadeIn,
  animationDuration: duration || '0.5s',
  animationFillMode: 'both',
}));

const backInRight = keyframes`
  0% {
    transform: translateX(2000px) scale(0.7);
    opacity: 0.7;
  }

  80% {
    transform: translateX(0px) scale(0.7);
    opacity: 0.7;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const BackInRight = styled('div')({
  animation: backInRight,
  animationDuration: '1s',
  animationFillMode: 'both',
});
