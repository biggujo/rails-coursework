import { Typography } from '@mui/material';

const createSmallSubtitle = (text: string) => {
  return (
    <Typography variant={'h6'} component={'h4'} mt={2} mb={1}>
      {text}
    </Typography>
  );
};

export default createSmallSubtitle;
