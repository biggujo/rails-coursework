import { Box } from '@mui/material';
import createSubtitle from '../utils/create-subtitle.tsx';
import GroupCreateForm from '../components/GroupCreateForm';

export default function CreateGroupPage() {
  return (
    <Box width={'450px'}>
      {createSubtitle('Create group')}
      <GroupCreateForm />
    </Box>
  );
}
