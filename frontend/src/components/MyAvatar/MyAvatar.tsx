import { Avatar, useTheme } from '@mui/material';
import { SyntheticEvent } from 'react';

interface Props {
  alt: string;
  src?: string;
  onLoad?: (event: SyntheticEvent<unknown>) => void;
}

export default function MyAvatar({ alt, src, onLoad }: Props) {
  const theme = useTheme();

  return (
    <Avatar
      alt={alt}
      src={src}
      sx={{
        width: 140,
        height: 140,
        border: `3px solid ${theme.palette.primary.main}`,
      }}
      onLoad={onLoad}
    />
  );
}
