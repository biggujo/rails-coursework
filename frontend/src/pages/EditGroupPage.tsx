import { useParams } from 'react-router-dom';
import useFetchGroupQuery from '../hooks/query/useFetchGroupQuery.ts';
import { Box, Container, Typography } from '@mui/material';
import createSubtitle from '../utils/create-subtitle.tsx';
import MainGroupData from '../components/Group/MainGroupDate.tsx';
import GroupUpdateForm from '../components/GroupUpdateForm';
import Loader from '../components/Loader';

export default function EditGroupPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetchGroupQuery(Number(id));

  if (isLoading) {
    return (
      <Box height={'400px'}>
        <Loader />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography>An error has just occurred. Try again later.</Typography>
    );
  }

  return (
    <Container>
      {createSubtitle('Original information')}
      <MainGroupData groupData={data} />

      {createSubtitle('Updated information')}
      <Box width={'400px'}>
        <GroupUpdateForm groupId={Number(id)} />
      </Box>
    </Container>
  );
}
