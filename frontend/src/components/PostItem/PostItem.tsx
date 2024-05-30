import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import {
  Chat,
  Delete,
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
import { useDispatch, useSelector } from 'react-redux';
import myToast from '../../utils/myToast.tsx';
import PostUpdateModal from '../PostUpdateModal';
import CommentList from '../CommentList';
import useToggle from '../../hooks/useToggle.ts';
import CommentCreateForm from '../CommentCreateForm';
import useHandleOperationWithNotify from '../../hooks/useHandleOperationWithNotify.ts';
import { selectAuthUser } from '../../redux/auth/selectors.ts';

interface Props {
  data: PostEntity;
}

export default function PostItem({ data }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const operationHandler = useHandleOperationWithNotify();
  const currentUser = useSelector(selectAuthUser);
  const theme = useTheme();

  const { isOpen, toggle } = useToggle();

  const formattedDate = DateFormatter.formatRelativeToNow(data.created_at);

  return (
    <Card
      sx={{
        width: '100%',
        px: 2,
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
          currentUser.id === data.user.id && (
            <MyMenu
              actions={[
                {
                  title: <PostUpdateModal postId={data.id} />,
                  action: null,
                },
                {
                  title: <Button startIcon={<Delete />}>Delete</Button>,
                  action: async () => {
                    try {
                      if (
                        !confirm('Are you sure you want to delete the post?')
                      ) {
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
          )
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
      <CardActions>
        <Stack
          width={'100%'}
          direction={'row'}
          justifyContent={'space-between'}
        >
          <Box>
            <IconButton
              onClick={operationHandler({
                dispatch,
                operation: PostsOperations.likeById(data.id),
              })}
            >
              <Typography>{data.likes_count}</Typography>
              <Checkbox
                icon={<ThumbUpOutlined />}
                checkedIcon={<ThumbUp />}
                checked={data.liked}
              />
            </IconButton>
            <IconButton
              onClick={operationHandler({
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
          </Box>
          <Box>
            <IconButton onClick={toggle}>
              <Checkbox icon={<Chat />} checkedIcon={<Chat />} />
            </IconButton>
            <IconButton>
              <Checkbox
                icon={<ShareIcon />}
                checkedIcon={<ShareIcon />}
                checked={false}
              />
            </IconButton>
          </Box>
        </Stack>
      </CardActions>
      <Box pb={1}>
        {isOpen && (
          <>
            <Divider
              sx={{
                bgcolor: theme.palette.primary.light,
                mb: 2,
              }}
            />
            <Typography variant={'h6'} fontWeight={'normal'} pl={4}>
              Comments
            </Typography>
            <CommentList postId={data.id} />
            <CommentCreateForm postId={data.id} />
          </>
        )}
      </Box>
    </Card>
  );
}
