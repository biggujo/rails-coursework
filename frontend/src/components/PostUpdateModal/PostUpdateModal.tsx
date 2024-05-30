import FormWrapper from '../FormWrapper/FormWrapper.tsx';
import BasicModal from '../BasicModal';
import PostUpdateForm from '../PostUpdateForm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Button } from '@mui/material';

interface Props {
  postId: number;
}

export default function PostUpdateModal({ postId }: Props) {
  const toggler = <Button startIcon={<EditNoteIcon />}>Edit</Button>;

  const modalContent = (
    <FormWrapper title={'Post update'}>
      <PostUpdateForm postId={postId} />
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
