import { Button } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FormWrapper from '../FormWrapper/FormWrapper.tsx';
import BasicModal from '../BasicModal';
import CommentUpdateForm from '../CommentUpdateForm';
import { useTranslation } from 'react-i18next';

interface Props {
  postId: number;
  commentId: number;
}

export default function CommentUpdateModal({ postId, commentId }: Props) {
  const { t } = useTranslation();

  const toggler = (
    <Button startIcon={<EditNoteIcon />}>{t('action.edit')}</Button>
  );

  const modalContent = (
    <FormWrapper title={t('action.commentEdit')}>
      <CommentUpdateForm postId={postId} commentId={commentId} />
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
