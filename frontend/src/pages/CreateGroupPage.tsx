import { Container } from '@mui/material';
import createSubtitle from '../utils/create-subtitle.tsx';
import GroupCreateForm from '../components/GroupCreateForm';

export default function CreateGroupPage() {
  return (
    <Container>
      {createSubtitle('Create group')}
      <GroupCreateForm />
    </Container>
  );
}
