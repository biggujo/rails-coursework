import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { OverridableStringUnion } from '@mui/types';
import {
  AlertColor,
  AlertPropsColorOverrides,
} from '@mui/material/Alert/Alert';

interface Props {
  message: string;
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
}

// Do not use it directly. It is used in myToast.tsx
export default function CustomAlert({ message, severity }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <Alert
          severity={severity}
          sx={{
            width: '320px',
            cursor: 'pointer',
          }}
          onClick={handleClose}
        >
          {message}
        </Alert>
      )}
    </>
  );
}
