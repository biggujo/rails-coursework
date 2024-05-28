import { Container, Typography } from '@mui/material';
import UserProfileList from '../components/UserProfileList/UserProfileList.tsx';

export default function UsersPage() {
  return (
    <Container>
      <Typography variant={'h2'}>User list</Typography>
      <UserProfileList />
    </Container>
  );
}
