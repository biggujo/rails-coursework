import { Box, Container, Typography } from '@mui/material';
import useCheckSessionExpiration from '../hooks/useCheckSessionExpiration.tsx';
import { AxiosError } from 'axios';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';

export default function ProfilePage() {
  const { data, isLoading, error } = useGetProfileQuery();
  useCheckSessionExpiration(error);

  return (
    <Container>
      <Box>
        <Typography variant={'h2'}>Profile</Typography>
        {error && (
          <Typography>{(error as AxiosError).response!.statusText}</Typography>
        )}
        {data && !isLoading && (
          <ul>
            <li>
              <Typography>
                ID: <b>{data.id}</b>
              </Typography>
            </li>
            <li>
              <Typography>
                Email: <b>{data.email}</b>
              </Typography>
            </li>
            <li>
              <Typography>
                Nickname: <b>{data.nickname}</b>
              </Typography>
            </li>
          </ul>
        )}
      </Box>
    </Container>
  );
}
