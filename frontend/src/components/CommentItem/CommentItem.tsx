import { CommentEntity } from '../../interfaces';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import DateFormatter from '../../utils/date-formatter.ts';
import MyMenu from '../MyMenu';

interface Props {
  data: CommentEntity;
}

export default function CommentItem({ data }: Props) {
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
        action={<MyMenu actions={[]} />}
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
