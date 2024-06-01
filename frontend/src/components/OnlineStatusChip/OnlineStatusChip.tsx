import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  isOnline: boolean;
}

export default function OnlineStatusChip({ isOnline }: Props) {
  const { t } = useTranslation();

  const chipColor = isOnline ? 'success' : 'error';
  const chipText = isOnline ? t('status.online') : t('status.offline');

  return <Chip label={chipText} color={chipColor} size="small" />;
}
