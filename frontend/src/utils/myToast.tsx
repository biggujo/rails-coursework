import toast from 'react-hot-toast';
import CustomAlert from '../components/CustomAlert';
import { OverridableStringUnion } from '@mui/types';
import {
  AlertColor,
  AlertPropsColorOverrides,
} from '@mui/material/Alert/Alert';

interface FunctionInterface {
  message: string;
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
}

function myToast({ message, severity }: FunctionInterface) {
  toast.custom(<CustomAlert message={message} severity={severity} />);
}

export default myToast;
