import { useTheme } from '@mui/material';
import { FadeLoader } from 'react-spinners';
import FullHeightCenter from '../FullHeightCenter';

interface Props {}

export default function Loader({}: Props) {
  const theme = useTheme();

  return (
    <FullHeightCenter>
      <FadeLoader color={theme.palette.primary.main} />
    </FullHeightCenter>
  );
}
