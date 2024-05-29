import { Typography } from '@mui/material';

const createSubtitle = (text: string) => {
  return (
    <Typography variant={'h4'} component={'h3'} mt={2} marginBottom={1}>
      {text}
    </Typography>
  );
};

export default createSubtitle;
