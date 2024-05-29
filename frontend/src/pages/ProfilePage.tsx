import { Box, Container, Typography } from '@mui/material';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { UserProfile } from '../components/Profile';

export default function ProfilePage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProfileQuery(Number(id));

  return (
    <Container>
      {isLoading && (
        <Box height={400}>
          <Loader />
        </Box>
      )}
      {error && (
        <Typography>{(error as AxiosError).response!.statusText}</Typography>
      )}
      {!isLoading && data && (
        <>
          <UserProfile userData={data} />
        </>
      )}
    </Container>
  );
}
