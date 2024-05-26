import { Typography } from '@mui/material';

interface Props {
  title: string;
}

export default function ChatTitleBar({ title }: Props) {
  return (
    <div>
      <Typography variant={'h4'} component={'h3'}>
        Name: {title}
      </Typography>
    </div>
  );
}
