import { Chip } from '@mui/material';

interface Props {
  isOnline: boolean;
}

export default function OnlineStatusChip({ isOnline }: Props) {
  const chipColor = isOnline ? 'success' : 'error';
  const chipText = isOnline ? 'Online' : 'Offline';

  return <Chip label={chipText} color={chipColor} size="small" />;
}
