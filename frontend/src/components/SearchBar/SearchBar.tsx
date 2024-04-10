import { Box, InputBase } from '@mui/material';

type Props = {};

export default function SearchBar({}: Props) {
  return (
    <Box>
      <InputBase sx={{
        px: 2,
        py: 0.5,
        bgcolor: 'primary.contrastText',
        borderRadius: 1,
      }} placeholder={'John vacation photos'} />
    </Box>
  );
}
