import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

interface UtilityButtonInterface {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  color?: string;
  onClick?: () => void;
}

export default UtilityButtonInterface;
