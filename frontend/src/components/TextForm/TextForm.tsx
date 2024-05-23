import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';

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
      <TextField
        label={'Message'}
        onChange={handleMessageValueChange}
        placeholder={placeholder}
        required
        value={value}
      />
      <Button variant={'contained'} type={'submit'}>
        {buttonText}
      </Button>
    </form>
  );
}
