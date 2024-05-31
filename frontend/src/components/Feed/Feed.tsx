import { Box, Stack } from '@mui/material';
import PostItem from '../PostItem';

export default function Feed() {
  return (
    <Box
      sx={{
        flex: 4,
        py: 2,
      }}
    >
      <Stack spacing={2}>
        <PostItem />
        <PostItem />
        <PostItem />
      </Stack>
    </Box>
  );
}
