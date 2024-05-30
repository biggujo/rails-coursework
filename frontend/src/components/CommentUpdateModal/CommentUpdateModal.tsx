import { Button } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FormWrapper from '../FormWrapper/FormWrapper.tsx';
import BasicModal from '../BasicModal';
import CommentUpdateForm from '../CommentUpdateForm';

interface Props {
  postId: number;
  commentId: number;
}

export default function CommentUpdateModal({ postId, commentId }: Props) {
  const toggler = <Button startIcon={<EditNoteIcon />}>Edit</Button>;

  const modalContent = (
    <FormWrapper title={'Comment update'}>
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
