import { Chip } from '@mui/material';

export default function LoadingChip() {
  return (
    <Chip
      label={'Loading'}
      size="small"
      sx={{
        bgcolor: '#80808099',
        color: '#ffffff',
      }}
    />
  );
}
