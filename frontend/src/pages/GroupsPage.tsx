import { Box, Typography } from '@mui/material';
import GroupList from '../components/GroupList';
import useFetchAllGroupsQuery from '../hooks/query/useFetchAllGroupsQuery.ts';
import Loader from '../components/Loader';
import createSubtitle from '../utils/create-subtitle.tsx';
import { useTranslation } from 'react-i18next';

export default function GroupsPage() {
  const { data, isLoading, isSuccess, isError } = useFetchAllGroupsQuery();
  const { t } = useTranslation();

  return (
    <>
      {createSubtitle(t('group.allGroups'))}
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
