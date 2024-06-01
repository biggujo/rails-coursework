import { useParams } from 'react-router-dom';
import useFetchGroupQuery from '../hooks/query/useFetchGroupQuery.ts';
import { Box, Button, Typography } from '@mui/material';
import createSubtitle from '../utils/create-subtitle.tsx';
import MainGroupData from '../components/Group/MainGroupData.tsx';
import GroupUpdateForm from '../components/GroupUpdateForm';
import Loader from '../components/Loader';
import API from '../utils/api.ts';
import myToast from '../utils/myToast.tsx';

export default function EditGroupPage() {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useFetchGroupQuery(Number(id));

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

  const handlePurgeProfilePhoto = async () => {
    try {
      await API.groups.purgeProfilePhoto(Number(id));
      await refetch();

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

  return (
    <>
      {createSubtitle('Original information')}
      <MainGroupData groupData={data} />

      {createSubtitle('Updated information')}
      <Box width={'450px'}>
        <GroupUpdateForm groupId={Number(id)} />
      </Box>

      <Box mt={2}>
        <Button
          type={'submit'}
          onClick={() => {
            if (!confirm('Are you sure you want to remove the group photo?')) {
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
    </>
  );
}
