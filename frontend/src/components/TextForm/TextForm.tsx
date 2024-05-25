import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Props {
  buttonText: string;
  placeholder?: string;
  onSubmit: (value: string) => void;
}

export default function TextForm({ buttonText, placeholder, onSubmit }: Props) {
  const [value, setValue] = useState('');

  const handleMessageValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  const handleSendMessageClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(value);

    setValue('');
  };

  return (
    <form onSubmit={handleSendMessageClick}>
      <Grid container alignItems={'flex-end'} spacing={2}>
        <Grid item flexGrow={1}>
          <TextField
            value={value}
            onChange={handleMessageValueChange}
            label={'Message'}
            autoComplete={'off'}
            variant={'standard'}
            placeholder={placeholder}
            fullWidth
            required
          />
        </Grid>
        <Grid item>
          <Button variant={'contained'} type={'submit'} endIcon={<SendIcon />}>
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
