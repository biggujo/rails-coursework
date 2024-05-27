import { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  children: ReactElement;
}

export default function FormWrapper({ title, children }: Props) {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Typography
        variant={'h5'}
        component={'h2'}
        align={'center'}
        sx={{ mb: 4 }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}
