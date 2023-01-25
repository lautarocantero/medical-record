import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Worker, Viewer, Plugin } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { PDFReaderContainer } from '../styles/CreateFeed.styled';

interface PdfReaderProps {
  open: boolean;
  handleClose: () => void;
  pdfUrl: string;
}

export const PdfReaderModal = (props: PdfReaderProps) => {
  const { open, handleClose, pdfUrl } = props;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <PDFReaderContainer component="div">
        <Box sx={{ display: 'flex', justifyContent: 'right', pt: 4, width: '100%' }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance as Plugin]} />
        </Worker>
      </PDFReaderContainer>
    </Modal>
  );
};
