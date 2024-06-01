import { Box, Typography } from '@mui/material';
import GroupList from '../components/GroupList';
import useFetchAllGroupsQuery from '../hooks/query/useFetchAllGroupsQuery.ts';
import Loader from '../components/Loader';

export default function GroupsPage() {
  const { data, isLoading, isSuccess, isError } = useFetchAllGroupsQuery();

  return (
    <>
      <Typography variant={'h2'}>All Groups</Typography>
      {isLoading && (
        <Box height={400}>
          <Loader />
        </Box>
      )}
      {isError && <Typography>Couldn't load groups</Typography>}
      {isSuccess && <GroupList items={data} />}
    </>
  );
}
