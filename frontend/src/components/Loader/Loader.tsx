import { Grid, useTheme } from '@mui/material';
import { FadeLoader } from 'react-spinners';

interface Props {}

export default function Loader({}: Props) {
  const theme = useTheme();

  return (
    <Grid
      container
      height={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Grid item>
        <FadeLoader color={theme.palette.primary.main} />
      </Grid>
    </Grid>
  );
}
