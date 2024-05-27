import { Box } from '@mui/material';
import { ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

export default function FullHeightCenter({ children }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {children}
    </Box>
  );
}
