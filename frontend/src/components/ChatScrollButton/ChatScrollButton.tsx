import { Button } from '@mui/material';

interface Props {
  text: string;
  onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ChatScrollButton({ text, onClick }: Props) {
  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={onClick}
      sx={{
        bgcolor: '#ffffff',
        borderColor: '#808080',
        borderRadius: '0',
        '&:hover': {
          bgcolor: '#ffffff',
        },
      }}
    >
      {text}
    </Button>
  );
}
