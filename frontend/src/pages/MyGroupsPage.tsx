import { Box, Button, Stack, Typography } from '@mui/material';
import Loader from '../components/Loader';
import GroupList from '../components/GroupList';
import useFetchMyGroups from '../hooks/query/useFetchMyGroups.ts';
import createSubtitle from '../utils/create-subtitle.tsx';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function MyGroupsPage() {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError } = useFetchMyGroups();

  const createGroupButton = (
    <Button
      startIcon={<Add />}
      variant={'outlined'}
      sx={{
        width: '200px',
      }}
      onClick={() => navigate('/group_create')}
      color={'success'}
    >
      Create group
    </Button>
  );

  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {createSubtitle('My Groups')}
        {createGroupButton}
      </Stack>
      {isLoading && (
        <Box height={400}>
          <Loader />
        </Box>
      )}
      {isError && <Typography>Couldn't load groups</Typography>}
      {isSuccess && data.length === 0 && (
        <Typography>No groups available.</Typography>
      )}
      {isSuccess && <GroupList items={data} />}
    </>
  );
}
