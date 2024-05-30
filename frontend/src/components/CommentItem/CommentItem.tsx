import { CommentEntity } from '../../interfaces';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import DateFormatter from '../../utils/date-formatter.ts';
import MyMenu from '../MyMenu';
import { Delete } from '@mui/icons-material';
import myToast from '../../utils/myToast.tsx';
import CommentsOperations from '../../redux/comments/operations.ts';
import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';

interface Props {
  data: CommentEntity;
  postId: number;
}

export default function CommentItem({ data, postId }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const formattedDate = DateFormatter.formatRelativeToNow(data.created_at);

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
          <MyMenu
            actions={[
              {
                title: <Button startIcon={<Delete />}>Delete</Button>,
                action: async () => {
                  try {
                    if (
                      !confirm('Are you sure you want to delete the comment?')
                    ) {
                      return;
                    }

                    await dispatch(
                      CommentsOperations.deleteById({
                        postId,
                        commentId: data.id,
                      })
                    ).unwrap();

                    myToast({
                      message: 'The comment has been deleted',
                      severity: 'success',
                    });
                  } catch (e) {
                    myToast({
                      message:
                        e instanceof Error
                          ? e.message
                          : (e as unknown as string),
                      severity: 'error',
                    });
                  }
                },
              },
            ]}
          />
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
    </Card>
  );
}
