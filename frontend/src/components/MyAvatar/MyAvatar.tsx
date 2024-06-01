import { Avatar, useTheme } from '@mui/material';
import { SyntheticEvent } from 'react';
import GroupIcon from '@mui/icons-material/Group';

interface Props {
  alt: string;
  src?: string;
  size: 'smaller' | 'small' | 'bigger' | 'medium' | 'large';
  isGroup?: boolean;
  onLoad?: (event: SyntheticEvent<unknown>) => void;
}

export default function MyAvatar({ alt, src, onLoad, size, isGroup }: Props) {
  const theme = useTheme();

  let sizeValue: number;

  switch (size) {
    case 'smaller':
      sizeValue = 16;
      break;
    case 'small':
      sizeValue = 36;
      break;
    case 'bigger':
      sizeValue = 48;
      break;
    case 'medium':
      sizeValue = 64;
      break;
    case 'large':
      sizeValue = 140;
      break;
  }

  let borderValue: number;

  switch (size) {
    case 'smaller':
      borderValue = 1;
      break;
    case 'small':
    case 'bigger':
    case 'medium':
      borderValue = 2;
      break;
    case 'large':
      borderValue = 3;
      break;
  }

  return (
    <Avatar
      alt={alt}
      src={src}
      sx={{
        width: sizeValue,
        height: sizeValue,
        border: `${borderValue}px solid ${theme.palette.primary.main}`,
      }}
      onLoad={onLoad}
    >
      {isGroup && <GroupIcon />}
    </Avatar>
  );
}
