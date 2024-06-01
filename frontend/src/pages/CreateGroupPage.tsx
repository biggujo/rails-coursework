import { Box } from '@mui/material';
import createSubtitle from '../utils/create-subtitle.tsx';
import GroupCreateForm from '../components/GroupCreateForm';
import { useTranslation } from 'react-i18next';

export default function CreateGroupPage() {
  const { t } = useTranslation();

  return (
    <Box width={'450px'}>
      {createSubtitle(t('group.createGroup'))}
      <GroupCreateForm />
    </Box>
  );
}
