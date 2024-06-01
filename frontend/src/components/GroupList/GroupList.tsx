import { Box, Divider, ListItem, Stack } from '@mui/material';
import { GroupEntity } from '../../interfaces';
import GroupCard from '../GroupItemCard';

interface Props {
  items: Array<GroupEntity>;
}

export default function GroupList({ items }: Props) {
  return (
    <Stack
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {items.map((data, index) => (
        <Box key={data.id}>
          {index !== 0 && <Divider />}
          <ListItem
            sx={{
              margin: 0,
              padding: 0,
            }}
          >
            <GroupCard data={data} />
          </ListItem>
        </Box>
      ))}
    </Stack>
  );
}
