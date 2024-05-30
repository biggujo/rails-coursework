import ProfileUpdateForm from '../components/ProfileUpdateForm';
import createSubtitle from '../utils/create-subtitle.tsx';
import { MainProfileData } from '../components/Profile';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../redux/auth/selectors.ts';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';
import { Box, Container, Typography } from '@mui/material';
import Loader from '../components/Loader';

export default function EditProfilePage() {
  const currentUser = useSelector(selectAuthUser);
  const {
    data: profileData,
    isLoading,
    isError,
  } = useGetProfileQuery(Number(currentUser.id));

  if (isError) {
    return (
      <Typography>An error has happened. Please, try again later.</Typography>
    );
  }

  if (isLoading) {
    return (
      <Box height={'400px'}>
        <Loader />
      </Box>
    );
  }

  return (
    <Container>
      {createSubtitle('Original information')}
      <MainProfileData userData={profileData} />
      {createSubtitle('Updated information')}
      <ProfileUpdateForm />
    </Container>
  );
}
