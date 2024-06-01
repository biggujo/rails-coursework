import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LoadingChip() {
  const { t } = useTranslation();

  return (
    <Chip
      label={t('status.loading')}
      size="small"
      sx={{
        bgcolor: '#80808099',
        color: '#ffffff',
      }}
    />
  );
}
