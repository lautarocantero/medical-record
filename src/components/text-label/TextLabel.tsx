import { Typography } from '@mui/material';
import React from 'react';

const TextLabel = ({ text, color, size, padding, bg, width }: TextLabelProps) => (
  <Typography
    sx={{
      color,
      padding,
      backgroundColor: bg,
      borderRadius: '12px',
      fontSize: size ?? '12px',
      fontWeight: 500,
      lineHeight: '20px',
      width,
      minWidth: 'max-content',
      textAlign: 'center',
      alignSelf: 'center',
    }}
  >
    {text}
  </Typography>
);

interface TextLabelProps {
  text: string;
  color?: string;
  padding?: string;
  bg?: string;
  size?: number;
  width?: string;
}
export default TextLabel;
