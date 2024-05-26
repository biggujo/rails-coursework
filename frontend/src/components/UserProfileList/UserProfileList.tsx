import useGetAllUsersQuery from '../../hooks/query/useGetAllUsers.ts';
import { Typography } from '@mui/material';
import UserProfileCard from '../UserProfileCard/UserProfileCard.tsx';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';

export default function UserProfileList() {
  const allUsersQuery = useGetAllUsersQuery();
  const user = useSelector(selectAuthUser);

  return (
    <>
      {allUsersQuery.isError && (
        <Typography>
          {(allUsersQuery.error as AxiosError).response!.statusText}
        </Typography>
      )}
      {allUsersQuery.isSuccess && (
        <ul>
          {allUsersQuery.data.data.map(data => {
            if (data.id === user.id) {
              return null;
            }

            return (
              <li key={data.id}>
                <UserProfileCard data={data} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
