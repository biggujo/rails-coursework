import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { FavoriteBorder } from '@mui/icons-material';

type Props = {};

export default function PostCard({}: Props) {
  return (
    <Card>
      <CardHeader avatar={
        <Avatar sx={{ bgcolor: blue[500] }}>
          R
        </Avatar>
      }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="Lorem ipsum"
                  subheader="5 minutes ago" />
      <CardMedia
        component="img"
        height="400"
        image="https://media.istockphoto.com/id/1397698601/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B2%D0%B5%D1%81%D0%BD%D1%8F%D0%BD%D0%B8%D0%B9-%D0%BF%D0%B5%D0%B9%D0%B7%D0%B0%D0%B6.jpg?s=612x612&w=0&k=20&c=SpQCEsgBKMdIGl4NvWz7cL0jGmfLxDh9QTDct_cEYmU="
        alt="Field"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet.
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<FavoriteIcon />}
          />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
