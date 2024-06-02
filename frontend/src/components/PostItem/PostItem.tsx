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
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Chat,
  Delete,
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import MyMenu from '../MyMenu';
import { PostEntity } from '../../interfaces';
import DateFormatter from '../../utils/date-formatter.ts';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { AppDispatch } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import myToast from '../../utils/myToast.tsx';
import PostUpdateModal from '../PostUpdateModal';
import CommentList from '../CommentList';
import useToggle from '../../hooks/useToggle.ts';
import CommentCreateForm from '../CommentCreateForm';
import useHandleOperationWithNotify from '../../hooks/useHandleOperationWithNotify.ts';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import { usePostsOperationsContext } from '../../providers/PostsOperationsProvider.tsx';
import MyCarousel from '../MyCarousel/MyCarousel.tsx';
import RepostCreateModal from '../RepostCreateModal/RepostCreateModal.tsx';
import { useTranslation } from 'react-i18next';

interface Props {
  data: PostEntity;
  dontShowControls?: boolean;
}

export default function PostItem({ data, dontShowControls }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const operationHandler = useHandleOperationWithNotify();
  const currentUser = useSelector(selectAuthUser);
  const Operations = usePostsOperationsContext();
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const { isOpen, toggle } = useToggle();

  const formattedDate = DateFormatter.formatRelativeToNow(
    data.created_at,
    i18n.language
  );

  const handlePurgePhotos = () => {
    dispatch(Operations.fetchAll(data?.group?.id || data.user.id));
  };

  const shouldShowGroupInfo = data.group !== null;

  const postSubtitle = (
    <Stack direction={'row'}>
      {shouldShowGroupInfo && (
        <>
          <Typography variant={'body2'}>{t('post.postedIn')}&nbsp;</Typography>
          <Box
            onClick={() => navigate(`/group/${data.group.id}`)}
            sx={{
              cursor: 'pointer',
            }}
          >
            <MyAvatar
              alt={data.group.name}
              size={'smaller'}
              src={data.group.profile_photo}
              isGroup={true}
            />
          </Box>
          <Typography variant={'body2'}>
            &nbsp;
            {
              <Link component={RouterLink} to={`/group/${data.group.id}`}>
                {data.group.name}
              </Link>
            }{' '}
          </Typography>
        </>
      )}
      <Typography
        variant={'body2'}
        sx={{
          ml: 0.5,
        }}
      >
        {formattedDate}
      </Typography>
      <Typography
        variant={'body2'}
        sx={{
          ml: 0.5,
        }}
      >
        by{' '}
        {
          <Link component={RouterLink} to={`/profile/${data.user.id}`}>
            {data.user.nickname}
          </Link>
        }
      </Typography>
    </Stack>
  );

  return (
    <>
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
            <Box
              onClick={() => navigate(`/profile/${data.user.id}`)}
              sx={{
                cursor: 'pointer',
              }}
            >
              <MyAvatar
                alt={data.user.nickname}
                src={data.user.profile_photo}
                size={'bigger'}
              />
            </Box>
          }
          action={
            currentUser.id === data.user.id &&
            !dontShowControls && (
              <MyMenu
                actions={[
                  {
                    title: (
                      <PostUpdateModal
                        postId={data.id}
                        onPurgePhotos={handlePurgePhotos}
                      />
                    ),
                    action: null,
                  },
                  {
                    title: (
                      <Button startIcon={<Delete />}>
                        {t('action.delete')}
                      </Button>
                    ),
                    action: async () => {
                      try {
                        if (!confirm(t('action.post.confirmDelete'))) {
                          return;
                        }

                        await dispatch(Operations.deleteById(data.id)).unwrap();

                        myToast({
                          message: t('action.post.successDelete'),
                          severity: 'success',
                        });
                      } catch (e) {
                        myToast({
                          message: t('action.post.failureDelete'),
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
          subheader={postSubtitle}
          titleTypographyProps={{ variant: 'h6', component: 'h3' }}
        />
        <CardContent>
          <Box>
            <Typography color={'text.secondary'} mb={2}>
              {data.content}
            </Typography>
            {data.repost && (
              <>
                <Typography fontWeight={'bold'} mb={1}>
                  {t('post.originalPost')}:
                </Typography>
                <PostItem data={data.repost} dontShowControls={true} />
              </>
            )}
            {data.photos.length > 0 && (
              <MyCarousel>
                {data.photos.map(photoUrl => (
                  <img
                    src={photoUrl}
                    alt=""
                    height={400}
                    style={{
                      width: '100%',
                      objectFit: 'cover',
                    }}
                    loading={'eager'}
                  />
                ))}
              </MyCarousel>
            )}
          </Box>
        </CardContent>
        {!dontShowControls && (
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
                    operation: Operations.likeById(data.id),
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
                    operation: Operations.dislikeById(data.id),
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
              <Stack direction={'row'}>
                <IconButton onClick={toggle}>
                  <Checkbox icon={<Chat />} checkedIcon={<Chat />} />
                </IconButton>
                <RepostCreateModal originalPostId={data.id} />
              </Stack>
            </Stack>
          </CardActions>
        )}
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
                {t('comments.comments')}
              </Typography>
              <CommentList postId={data.id} />
              <CommentCreateForm postId={data.id} />
            </>
          )}
        </Box>
      </Card>
    </>
  );
}
