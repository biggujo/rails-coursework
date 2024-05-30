import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import {
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from '@mui/icons-material';
import MyMenu from '../MyMenu';
import { PostEntity } from '../../interfaces';
import DateFormatter from '../../utils/date-formatter.ts';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { AppDispatch } from '../../redux/store.ts';
import PostsOperations from '../../redux/posts/operations.ts';
import { useDispatch } from 'react-redux';
import myToast from '../../utils/myToast.tsx';
import PostUpdateModal from '../PostUpdateModal';

interface Props {
  data: PostEntity;
}

export default function PostItem({ data }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();

  const formattedDate = DateFormatter.formatRelativeToNow(data.created_at);

  return (
    <Card
      sx={{
        width: '100%',
        border: `1px solid ${theme.palette.primary.light}`,
        boxShadow: 'none',
      }}
    >
      <CardHeader
        avatar={
          <MyAvatar
            alt={data.user.nickname}
            src={data.user.profile_photo}
            size={'bigger'}
          />
        }
        action={
          <MyMenu
            actions={[
              {
                title: 'Delete',
                action: async () => {
                  try {
                    await dispatch(
                      PostsOperations.deleteById(data.id)
                    ).unwrap();

                    myToast({
                      message: 'The post has been deleted',
                      severity: 'success',
                    });
                  } catch (e) {
                    myToast({
                      message: e,
                      severity: 'error',
                    });
                  }
                },
              },
            ]}
          />
        }
        title={data.title}
        subheader={formattedDate}
        titleTypographyProps={{ variant: 'h6', component: 'h3' }}
      />
      {/*<CardMedia*/}
      {/*  component="img"*/}
      {/*  height="350"*/}
      {/*  image="https://media.istockphoto.com/id/1397698601/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B2%D0%B5%D1%81%D0%BD%D1%8F%D0%BD%D0%B8%D0%B9-%D0%BF%D0%B5%D0%B9%D0%B7%D0%B0%D0%B6.jpg?s=612x612&w=0&k=20&c=SpQCEsgBKMdIGl4NvWz7cL0jGmfLxDh9QTDct_cEYmU="*/}
      {/*  alt="Field"*/}
      {/*/>*/}
      <CardContent>
        <Typography color={'text.secondary'}>{data.content}</Typography>
        <PostUpdateModal postId={data.id} />
      </CardContent>
      <CardActions>
        <IconButton>
          <Checkbox icon={<ThumbUpOutlined />} checkedIcon={<ThumbUp />} />
        </IconButton>
        <IconButton>
          <Checkbox icon={<ThumbDownOutlined />} checkedIcon={<ThumbDown />} />
        </IconButton>
        <IconButton>
          <Checkbox icon={<ShareIcon />} checkedIcon={<ShareIcon />} />
        </IconButton>
      </CardActions>
    </Card>
  );
}