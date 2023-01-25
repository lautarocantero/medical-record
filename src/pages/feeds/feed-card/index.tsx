import { Avatar, CardContent, CardHeader, CardMedia } from '@mui/material';
import ImageNotFound from '@/src/assets/common/images/image_not_found.jpg';
import { getMonthDayYearValue } from '@/src/utilities/helpers/dateParser';
import { FeedCardWrapper, FeedCardFooterText } from '../styles/CreateFeed.styled';

const TextReload = (text: string) => {
  const titleReload = text.length > 30 ? `${text.slice(0, 25)}...` : text;
  return titleReload;
};

const FeedCard = ({ item, setIdSelected }: any) => {
  const { id, title, creation_date: creationDate, cover_image_url: coverImageUrl, subtitle } = item;
  const handleClick = (event: any, selectedId: any) => {
    setIdSelected(selectedId);
  };
  return (
    <FeedCardWrapper onClick={(event) => handleClick(event, id)} key={id}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="card-label">
            P
          </Avatar>
        }
        title={TextReload(title)}
        titleTypographyProps={{
          fontWeight: 'bold',
          width: '200px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        subheader={getMonthDayYearValue(creationDate)}
      />
      <CardMedia
        key={id}
        component="img"
        height="180"
        width="100%"
        image={coverImageUrl ?? ImageNotFound}
        alt={title}
      />
      <CardContent>
        <FeedCardFooterText variant="body2">{TextReload(subtitle)}</FeedCardFooterText>
      </CardContent>
    </FeedCardWrapper>
  );
};

export default FeedCard;
