import FormWrapper from '../FormWrapper/FormWrapper.tsx';
import BasicModal from '../BasicModal';
import PostUpdateForm from '../PostUpdateForm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, Button } from '@mui/material';
import API from '../../utils/api.ts';
import myToast from '../../utils/myToast.tsx';
import { useTranslation } from 'react-i18next';

interface Props {
  postId: number;
  onPurgePhotos: () => void;
}

export default function PostUpdateModal({ postId, onPurgePhotos }: Props) {
  const { t } = useTranslation();
  const toggler = (
    <Button startIcon={<EditNoteIcon />}>{t('action.edit')}</Button>
  );

  const handlePurgePostPhotos = async () => {
    try {
      await API.purgePostPhotosById(postId);
      onPurgePhotos();

      myToast({
        message: t('action.postPhotos.successPhotosDelete'),
        severity: 'info',
      });
    } catch (error) {
      myToast({
        message: t('action.postPhotos.failurePhotosDelete'),
        severity: 'error',
      });
    }
  };

  const modalContent = (
    <FormWrapper title={t('post.postUpdate')}>
      <>
        <PostUpdateForm postId={postId} />

        <Box mt={2}>
          <Button
            type={'submit'}
            onClick={() => {
              if (!confirm(t('action.postPhotos.confirmPhotosDelete'))) {
                return;
              }

              handlePurgePostPhotos();
            }}
            color={'error'}
            variant={'contained'}
          >
            {t('action.postPhotos.delete')}
          </Button>
        </Box>
      </>
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
