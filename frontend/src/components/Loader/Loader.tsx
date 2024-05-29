import { useTheme } from '@mui/material';
import { FadeLoader } from 'react-spinners';
import FullHeightCenter from '../FullHeightCenter';

export default function Loader() {
  const theme = useTheme();

  return (
    <FullHeightCenter>
      <FadeLoader color={theme.palette.primary.main} />
    </FullHeightCenter>
  );
}
