import { Box, Stack } from '@mui/material';
import PostCard from '../PostCard';

export default function Feed() {
  return (
    <Box sx={{
      flex: 4,
      py: 2,
    }}
    >
      <Stack spacing={2}>
        <PostCard />
        <PostCard />
        <PostCard />
      </Stack>
    </Box>
  );
}
