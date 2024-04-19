import { Box, InputBase } from '@mui/material';

export default function SearchBar() {
  return (
    <Box>
      <InputBase
        sx={{
          px: 2,
          py: 0.5,
          bgcolor: 'primary.contrastText',
          borderRadius: 1,
        }}
        placeholder={'John vacation photos'}
      />
    </Box>
  );
}
