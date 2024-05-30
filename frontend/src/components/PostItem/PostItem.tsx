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

const handleLikeDislike =
  ({ dispatch, operation }) =>
  async () => {
    try {
      await dispatch(operation).unwrap();
    } catch (e) {
      myToast({
        message: e instanceof Error ? e.message : (e as string),
        severity: 'error',
      });
    }
  };

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
                title: <PostUpdateModal postId={data.id} />,
                action: null,
              },
              {
                title: 'Delete',
                action: async () => {
                  try {
                    if (!confirm('Are you sure you want to delete the post?')) {
                      return;
                    }

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
      </CardContent>
      <CardActions
        sx={{
          px: 4,
        }}
      >
        <Typography>{data.likes_count}</Typography>
        <IconButton
          onClick={handleLikeDislike({
            dispatch,
            operation: PostsOperations.likeById(data.id),
          })}
        >
          <Checkbox
            icon={<ThumbUpOutlined />}
            checkedIcon={<ThumbUp />}
            checked={data.liked}
          />
        </IconButton>
        <IconButton
          onClick={handleLikeDislike({
            dispatch,
            operation: PostsOperations.dislikeById(data.id),
          })}
        >
          <Typography>{data.dislikes_count}</Typography>
          <Checkbox
            icon={<ThumbDownOutlined />}
            checkedIcon={<ThumbDown />}
            checked={data.disliked}
          />
        </IconButton>
        <IconButton>
          <Checkbox icon={<ShareIcon />} checkedIcon={<ShareIcon />} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
