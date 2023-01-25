import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Box, CircularProgress, IconButton, Snackbar } from '@mui/material';
import useExportData from '../hooks/useExportData';
import { CanExportProps } from '../types/DataTableFormModal';

const CanExport = ({ resource, columns, pathApi, extraFilters, pageLoading }: CanExportProps) => {
  const { loading, handleExportData } = useExportData(resource, columns, pathApi, extraFilters);
  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress color="primary" size="1rem" />
        </Box>
      ) : (
        <IconButton
          disabled={pageLoading}
          aria-label="export"
          onClick={handleExportData}
          sx={{
            backgroundColor: 'transparent',
            border: '1px solid primary',
            color: 'primary.main',
            borderRadius: '4px',
            ':hover': {
              textDecoration: 'none',
            },
          }}
        >
          <SaveAltIcon />
        </IconButton>
      )}

      <Snackbar />
    </>
  );
};

export default CanExport;
