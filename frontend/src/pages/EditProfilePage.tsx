import ProfileUpdateForm from '../components/ProfileUpdateForm';
import createSubtitle from '../utils/create-subtitle.tsx';
import { MainProfileData } from '../components/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../redux/auth/selectors.ts';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';
import { Box, Button, Container, Typography } from '@mui/material';
import Loader from '../components/Loader';
import { AppDispatch } from '../redux/store.ts';
import API from '../utils/api.ts';
import ProfileOperations from '../redux/profile/operations.ts';
import myToast from '../utils/myToast.tsx';

export default function EditProfilePage() {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector(selectAuthUser);
  const {
    data: profileData,
    isLoading,
    error,
  } = useGetProfileQuery(Number(currentUser.id));

  const handlePurgeProfilePhoto = async () => {
    try {
      await API.user.purgeProfilePhoto();
      await dispatch(
        ProfileOperations.fetchProfileDataWithoutLoading(currentUser.id)
      ).unwrap();

      myToast({
        message: 'The photo has been deleted',
        severity: 'info',
      });
    } catch (error) {
      myToast({
        message: 'An error occurred. Please, try again later',
        severity: 'error',
      });
    }
  };

  if (error) {
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

      <Box mt={2}>
        <Button
          type={'submit'}
          onClick={() => {
            if (
              !confirm('Are you sure you want to remove the profile photo?')
            ) {
              return;
            }

            handlePurgeProfilePhoto();
          }}
          color={'error'}
          variant={'contained'}
        >
          Delete photo
        </Button>
      </Box>
    </Container>
  );
}
