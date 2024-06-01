import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

interface LinkInterface {
  title: string;
  to: string;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  isExact?: boolean;
}

export default LinkInterface;
