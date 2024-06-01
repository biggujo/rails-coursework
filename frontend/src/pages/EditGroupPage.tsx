import { useParams } from 'react-router-dom';
import useFetchGroupQuery from '../hooks/query/useFetchGroupQuery.ts';
import { Box, Button, Typography } from '@mui/material';
import createSubtitle from '../utils/create-subtitle.tsx';
import MainGroupData from '../components/Group/MainGroupData.tsx';
import GroupUpdateForm from '../components/GroupUpdateForm';
import Loader from '../components/Loader';
import API from '../utils/api.ts';
import myToast from '../utils/myToast.tsx';
import { useTranslation } from 'react-i18next';

export default function EditGroupPage() {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useFetchGroupQuery(Number(id));
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Box height={'400px'}>
        <Loader />
      </Box>
    );
  }

  if (isError) {
    return <Typography>{t('error.tryAgainLater')}</Typography>;
  }

  const handlePurgeProfilePhoto = async () => {
    try {
      await API.groups.purgeProfilePhoto(Number(id));
      await refetch();

      myToast({
        message: t('action.profilePhoto.successPhotoDelete'),
        severity: 'info',
      });
    } catch (error) {
      myToast({
        message: t('action.profilePhoto.failurePhotoDelete'),
        severity: 'error',
      });
    }
  };

  return (
    <>
      {createSubtitle(t('form.originalInformation'))}
      <MainGroupData groupData={data} />

      {createSubtitle(t('form.updatedInformation'))}
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
          {t('action.group.deletePhoto')}
        </Button>
      </Box>
    </>
  );
}
