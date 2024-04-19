import { Button, CircularProgress } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  isSubmitting: boolean;
  children: ReactNode;
}

export default function ButtonSubmit({ isSubmitting, children }: Props) {
  return (
    <Button
      type="submit"
      variant={'contained'}
      disabled={isSubmitting}
      startIcon={
        isSubmitting ? <CircularProgress size={16} color={'info'} /> : null
      }
    >
      {children}
    </Button>
  );
}
