import { useState } from 'react';
import { Typography } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { PdfReaderModal } from '../media-readers/PdfReaderModal';
import { useExportAssets } from '@/src/assets/exportFile';
import { PDFPreviewContainer } from '../styles/CreateFeed.styled';

const PdfShowFile = ({ file }: PdfShowFileProps) => {
  const [openPdfReader, setOpenPdfReader] = useState(false);
  const { pdfIcon } = useExportAssets();
  const getFilenameFromUrl = (url: string) => {
    const aux = url.split('/');
    const filenameWithType = aux[aux.length - 1];
    return filenameWithType.split('.pdf')[0];
  };

  return (
    <PDFPreviewContainer>
      <img src={pdfIcon} alt="PDF" style={{ height: '40px', width: '40px', marginRight: 10 }} />
      <Typography component="span">{getFilenameFromUrl(file)}</Typography>
      <Visibility
        sx={{ color: '#A68B5C', marginLeft: '4px', cursor: 'pointer' }}
        onClick={() => setOpenPdfReader(true)}
      />
      {openPdfReader && (
        <PdfReaderModal open={openPdfReader} handleClose={() => setOpenPdfReader(!openPdfReader)} pdfUrl={file} />
      )}
    </PDFPreviewContainer>
  );
};

type PdfShowFileProps = {
  file: string;
};

export default PdfShowFile;
