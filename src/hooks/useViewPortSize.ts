import { useState, useEffect } from 'react';

export const useViewPortSize = () => {
  const [viewPortW, setViewPortW] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewPortW(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    viewPortW,
  };
};
