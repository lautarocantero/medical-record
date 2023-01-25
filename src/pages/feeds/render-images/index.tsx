import { CardMedia, Box } from '@mui/material';
import { FadeIn } from '@/src/components/animations';

const RenderFeedImages = ({ data }: RenderFeedImagesProps) => (
  <FadeIn duration="3s">
    <Box
      display="flex"
      justifyContent="space-around"
      sx={{ maxWidth: '100%', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}
    >
      {data.map((item: FeedImage) => (
        <CardMedia
          key={item.id}
          sx={{
            border: 'none',
            width: {
              lg: '175px',
              md: '120px',
              sm: '120px',
              xs: '80px',
            },
            height: {
              lg: '175px',
              md: '120px',
              sm: '120px',
              xs: '80px',
            },
            borderRadius: '20px',
            marginRight: '20px',
            marginBottom: '20px',
          }}
          component="img"
          src={item.image_url}
        />
      ))}
    </Box>
  </FadeIn>
);

type FeedImage = {
  id: number;
  image_url: string;
};
type RenderFeedImagesProps = {
  data: Array<FeedImage>;
};

export default RenderFeedImages;
