import GroupProfile from '../components/Group';
import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useFetchGroupQuery from '../hooks/query/useFetchGroupQuery.ts';
import Loader from '../components/Loader';
import { AxiosError } from 'axios';

export default function GroupPage() {
  const { id } = useParams();
  const { data, isSuccess, isLoading, isError, error } = useFetchGroupQuery(
    Number(id)
  );

  return (
    <Container>
      {isLoading && (
        <Box height={400}>
          <Loader />
        </Box>
      )}
      {isError && (
        <Typography>{(error as AxiosError).response!.statusText}</Typography>
      )}
      {isSuccess && <GroupProfile groupData={data} />}
    </Container>
  );
}
