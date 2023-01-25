import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useBreakpoints = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchesLg = useMediaQuery(theme.breakpoints.down('lg'));
  const matchesXl = useMediaQuery(theme.breakpoints.down('xl'));

  return {
    matchesXs,
    matchesSm,
    matchesMd,
    matchesLg,
    matchesXl,
  };
};

export default useBreakpoints;
