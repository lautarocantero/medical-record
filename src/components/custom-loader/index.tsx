import { Box } from '@mui/material';
import React from 'react';
import './styles.css';
import Lottie from 'react-lottie-player';
import LoaderAnimation from '@/src/assets/animations/customLoader2.json';

const CustomLoader = () => (
  <Lottie
    loop
    animationData={LoaderAnimation}
    play
    style={{ display: 'flex', width: 150, height: 150, justifyContent: 'center', alignItems: 'center' }}
  />
);

export const CustomLoader2 = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} minHeight="200px">
    <div className="sk-chase">
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
    </div>
  </Box>
);

export default CustomLoader;
