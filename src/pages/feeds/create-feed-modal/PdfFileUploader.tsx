import React, { useState, useEffect } from 'react';
import { Box, IconButton, SvgIcon, Typography, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { ReactComponent as PdfIcon } from '../../../assets/common/logos/pdfFile.svg';
import { CircularSpinner } from '@/src/components/circular-spinner/CircularSpinner';
import { createNewDocument } from '@/src/api/endpoints/feed';
import { PdfReaderModal } from '../media-readers/PdfReaderModal';

const PdfFileUploader = ({
  values,
  setFieldValue,
  displayTitle = true,
  displayCleanerFunction = true,
  setError,
  setDisableButton,
}: any) => {
  const [pdfFile, setPdfFIle] = useState<{ urlResponse: string } | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [openPdfReader, setOpenPdfReader] = useState(false);
  const { t } = useTranslation();

  const { mutate, isLoading, error } = useMutation(createNewDocument, {
    onError: async () => {
      setError('document', error);
    },
    onSuccess: async (response) => {
      setFieldValue('document', response.data.document_url);
    },
    onSettled: () => {
      setDisableButton && setDisableButton(false);
    },
  });
  const handlePdfSelectorChange = async (e: any) => {
    setFileName(e.target.files[0].name);
    const index = e.target.files[0].name.indexOf('.pdf');
    const formData = new FormData();
    formData.append('File', e.target.files[0]);
    formData.append('FileName', e.target.files[0].name.slice(0, index).replaceAll(' ', '_').toLowerCase());
    if (e.target.files[0].type !== 'application/pdf') {
      setError('document', t('pdf_uploader_invalid_format'));
    } else {
      URL.createObjectURL(e.target.files[0]);
      setDisableButton && setDisableButton(true);
      mutate(formData);
    }
  };

  const cleanerFunction = () => {
    setPdfFIle(null);
    setFieldValue('document', null);
  };

  const handleOpenPdfReader = () => {
    setOpenPdfReader(true);
  };

  const handleClosePdfReader = () => {
    setOpenPdfReader(false);
  };

  useEffect(() => {
    if (values.isEdit && values.document) {
      const arrayOfValuesOfUrl = values.document.split('/');
      const valuesNarrowed = arrayOfValuesOfUrl[arrayOfValuesOfUrl.length - 1];
      const documentName = valuesNarrowed.split('-');
      setFileName(`${documentName[0]}.pdf`);
    }
  }, [values.isEdit, values.document]);

  return (
    <>
      {displayTitle && <Typography variant="subtitle2">{t('attach_pdf', { ns: 'feed' })}</Typography>}
      {(isLoading && (
        <Box sx={{ width: '50px' }}>
          <CircularSpinner size={30} />
        </Box>
      )) ||
        ((pdfFile || values.document) && (
          <Box
            sx={{ marginTop: 1.5, position: 'relative', display: 'flex', flexDirection: !displayTitle ? 'column' : '' }}
          >
            {displayCleanerFunction && (
              <Tooltip id="cancel_btn" title={t('remove_item_tooltip_msn', { ns: 'feed' })}>
                <IconButton sx={{ position: 'absolute', left: '20px', top: '-17px' }} onClick={cleanerFunction}>
                  <CancelRoundedIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip id="pdf_file" title={t('preview_item_tooltip_msn', { ns: 'feed' })}>
              <Box component="div" sx={{ textAlign: 'center' }}>
                <IconButton onClick={handleOpenPdfReader}>
                  <SvgIcon fontSize="large" component={PdfIcon} inheritViewBox />
                </IconButton>
              </Box>
            </Tooltip>
            <Typography variant="caption" ml={1}>
              {fileName}
            </Typography>
          </Box>
        )) || (
          <Tooltip title="Click">
            <IconButton aria-label="fingerprint" color="secondary" component="label" size="large">
              <UploadFileIcon fontSize="large" />
              <input type="file" hidden onChange={(e: any) => handlePdfSelectorChange(e)} accept=".pdf" />
            </IconButton>
          </Tooltip>
        )}
      {openPdfReader && (
        <PdfReaderModal open={openPdfReader} handleClose={handleClosePdfReader} pdfUrl={pdfFile || values.document} />
      )}
    </>
  );
};

export default React.memo(PdfFileUploader);
