import FormWrapper from '../FormWrapper/FormWrapper.tsx';
import BasicModal from '../BasicModal';
import PostUpdateForm from '../PostUpdateForm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, Button } from '@mui/material';
import API from '../../utils/api.ts';
import myToast from '../../utils/myToast.tsx';

interface Props {
  postId: number;
  onPurgePhotos: () => void;
}

export default function PostUpdateModal({ postId, onPurgePhotos }: Props) {
  const toggler = <Button startIcon={<EditNoteIcon />}>Edit</Button>;

  const handlePurgePostPhotos = async () => {
    try {
      await API.purgePostPhotosById(postId);
      onPurgePhotos();

      myToast({
        message: 'The photos has been deleted',
        severity: 'info',
      });
    } catch (error) {
      myToast({
        message: 'An error occurred. Please, try again later',
        severity: 'error',
      });
    }
  };

  const modalContent = (
    <FormWrapper title={'Post update'}>
      <PostUpdateForm postId={postId} />

      <Box mt={2}>
        <Button
          type={'submit'}
          onClick={() => {
            if (!confirm('Are you sure you want to remove the post photos?')) {
              return;
            }

            handlePurgePostPhotos();
          }}
          color={'error'}
          variant={'contained'}
        >
          Delete photos
        </Button>
      </Box>
    </FormWrapper>
  );

  return (
    <BasicModal
      toggler={toggler}
      modalContent={modalContent}
      onOpen={null}
      onClose={null}
    />
  );
}
