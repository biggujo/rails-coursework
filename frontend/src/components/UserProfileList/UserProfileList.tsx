import { Box, Divider, ListItem, Stack } from '@mui/material';
import UserProfileCard from '../UserProfileCard/UserProfileCard.tsx';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import UserEntity from '../../interfaces/UserEntity.interface.ts';

interface Props {
  items: Array<UserEntity>;
}

export default function UserProfileList({ items }: Props) {
  const user = useSelector(selectAuthUser);
  return (
    <Stack
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {items.map((data, index) => {
        if (data.id === user.id) {
          return null;
        }

        return (
          <Box key={data.id}>
            {index !== 0 && <Divider />}
            <ListItem
              sx={{
                margin: 0,
                padding: 0,
              }}
            >
              <UserProfileCard data={data} />
            </ListItem>
          </Box>
        );
      })}
    </Stack>
  );
}
