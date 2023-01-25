import { TextareaAutosizeProps } from '@mui/material';
import React from 'react';
import { StyledTextArea } from './TextArea.styled';

const CustomTextArea = (props: TextareaAutosizeProps) => <StyledTextArea {...props} />;

export default CustomTextArea;
