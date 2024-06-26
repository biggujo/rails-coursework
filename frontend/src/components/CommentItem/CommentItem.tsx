import { CommentEntity } from '../../interfaces';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import DateFormatter from '../../utils/date-formatter.ts';
import MyMenu from '../MyMenu';
import {
  Delete,
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from '@mui/icons-material';
import myToast from '../../utils/myToast.tsx';
import CommentsOperations from '../../redux/comments/operations.ts';
import { AppDispatch } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import CommentUpdateModal from '../CommentUpdateModal';
import useHandleOperationWithNotify from '../../hooks/useHandleOperationWithNotify.ts';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import { useTranslation } from 'react-i18next';

interface Props {
  data: CommentEntity;
  postId: number;
}

export default function CommentItem({ data, postId }: Props) {
  const { t, i18n } = useTranslation();

  const dispatch: AppDispatch = useDispatch();
  const operationHandler = useHandleOperationWithNotify();
  const formattedDate = DateFormatter.formatRelativeToNow(
    data.created_at,
    i18n.language
  );
  const currentUser = useSelector(selectAuthUser);

  return (
    <Card
      sx={{
        width: '100%',
        boxShadow: 'none',
      }}
    >
      <CardHeader
        avatar={
          <MyAvatar
            alt={data.user.nickname}
            src={data.user.profile_photo}
            size={'small'}
          />
        }
        action={
          currentUser.id === data.user.id && (
            <MyMenu
              actions={[
                {
                  title: (
                    <CommentUpdateModal postId={postId} commentId={data.id} />
                  ),
                  action: null,
                },
                {
                  title: (
                    <Button startIcon={<Delete />}>{t('action.delete')}</Button>
                  ),
                  action: async () => {
                    try {
                      if (!confirm(t('action.confirmCommentDelete'))) {
                        return;
                      }

                      await dispatch(
                        CommentsOperations.deleteById({
                          postId,
                          commentId: data.id,
                        })
                      ).unwrap();

                      myToast({
                        message: t('action.successCommentDelete'),
                        severity: 'success',
                      });
                    } catch (e) {
                      myToast({
                        message: t('action.failureCommentDelete'),
                        severity: 'error',
                      });
                    }
                  },
                },
              ]}
            />
          )
        }
        title={data.user.nickname}
        subheader={formattedDate}
        titleTypographyProps={{ fontWeight: 'bold' }}
        sx={{
          pb: 1,
        }}
      />
      <CardContent
        sx={{
          py: 0,
          pl: 8.5,
          '&:last-child': {
            pb: 0,
          },
        }}
      >
        <Typography color={'text.secondary'}>{data.text}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={operationHandler({
            dispatch,
            operation: CommentsOperations.likeById(data.id),
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
            operation: CommentsOperations.dislikeById(data.id),
          })}
        >
          <Typography>{data.dislikes_count}</Typography>
          <Checkbox
            icon={<ThumbDownOutlined />}
            checkedIcon={<ThumbDown />}
            checked={data.disliked}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}
