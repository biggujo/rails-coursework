import useGetAllUsersQuery from '../../hooks/query/useGetAllUsers.ts';
import { Typography } from '@mui/material';
import UserProfileCard from '../UserProfileCard/UserProfileCard.tsx';
import { AxiosError } from 'axios';

export default function UserProfileList() {
  const allUsersQuery = useGetAllUsersQuery();

  return (
    <>
      {allUsersQuery.isError && (
        <Typography>
          {(allUsersQuery.error as AxiosError).response!.statusText}
        </Typography>
      )}
      {allUsersQuery.isSuccess && (
        <ul>
          {allUsersQuery.data.data.map(data => (
            <li key={data.id}>
              <UserProfileCard data={data} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
