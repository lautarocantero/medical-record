import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import CreateFeedModal from './create-feed-modal/CreateFeedModal';
import FeedDetail from './FeedDetail';
import CustomLoader from '@/src/components/custom-loader';
import useSnackBar from '@/src/components/custom-snackbar/useSnackBar';
import { getArticles } from '@/src/api/endpoints/feed';
import { FeedHeader } from './styles';
import { LoaderContainer } from '@/src/components/loader-container/LoaderContainer';
import FeedCard from './feed-card';
import RefreshButton from '@/src/components/refresh-button/RefreshButton';

type News = {
  cover_image_url: string;
  creation_date: number;
  id: number;
  subtitle: string;
  title: string;
};

export const FeedPage = () => {
  const queryClient = useQueryClient();
  const getArticlesData = async () => {
    const response = await getArticles();
    return response.data;
  };
  const { data, isLoading } = useQuery(['publications'], getArticlesData, {
    // cacheTime: 500,
    refetchOnWindowFocus: true,
  });

  const orderedData = data && data.publications.sort((a: News, b: News) => b.creation_date - a.creation_date);

  const [openModal, setOpenModal] = useState(false);
  const [refreshGrid, setRefreshGrid] = useState(false);
  const { SnackBar, setSnackBarMessageError, setSnackBarMessageSuccess } = useSnackBar();
  const { t } = useTranslation();
  const isMobile = window.innerWidth < 955;

  const [idSelected, setIdSelected] = useState(null);

  useEffect(() => {
    if (refreshGrid) {
      queryClient.resetQueries(['publications']);
      setRefreshGrid(false);
    }
  }, [refreshGrid]);
  // useEffect(
  //   () =>
  //     function cleanUp() {
  //       queryClient.resetQueries(['publications']);
  //     },
  //   [],
  // );
  const handleClick = () => {
    setOpenModal(true);
  };
  return (
    <Box sx={{ height: 'auto' }}>
      <FeedHeader pr={idSelected ? '20px' : '10px'}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
          <Typography variant="h5" component="h1">
            {t('news', { ns: 'feed' })}
          </Typography>
          <RefreshButton refresh={setRefreshGrid} disabled={isLoading} />
        </Box>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          size="small"
          color="primary"
          sx={{ width: { sm: 'auto', xs: 'auto' } }}
          onClick={handleClick}
        >
          {t('new_publication', { ns: 'feed' })}
        </Button>
      </FeedHeader>
      <Grid container justifyContent="center">
        <Grid
          rowGap="20px"
          container
          item
          lg={idSelected ? 4 : 12}
          md={idSelected ? 4 : 12}
          sx={{
            maxHeight: `${isMobile ? 'auto' : '100%'}`,
            height: `${idSelected ? '850px' : '100%'}`,
            display: `${isMobile && idSelected && 'none'}`,
            overflow: 'auto',
            width: '100%',
          }}
        >
          {isLoading ? (
            <LoaderContainer>
              <CustomLoader />
            </LoaderContainer>
          ) : (
            ((!idSelected && isMobile) || !isMobile) &&
            data?.publications?.length > 0 &&
            orderedData.map((item: any) => (
              <Grid
                key={item.id}
                item
                lg={idSelected ? 12 : 4}
                md={idSelected ? 12 : 6}
                sm={12}
                xs={12}
                sx={{
                  paddingRight: '10px',
                }}
              >
                <FeedCard item={item} setIdSelected={setIdSelected} />
              </Grid>
            ))
          )}
        </Grid>
        {idSelected && (
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <FeedDetail
              idSelected={idSelected}
              setIdSelected={setIdSelected}
              setSnackBarMessageError={setSnackBarMessageError}
              setSnackBarMessageSuccess={setSnackBarMessageSuccess}
            />
          </Grid>
        )}
      </Grid>
      <CreateFeedModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setSnackBarMessageError={setSnackBarMessageError}
        setSnackBarMessageSuccess={setSnackBarMessageSuccess}
      />
      <SnackBar />
    </Box>
  );
};
