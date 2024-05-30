import FormWrapper from '../FormWrapper/FormWrapper.tsx';
import BasicModal from '../BasicModal';
import { Button } from '@mui/material';
import PostUpdateForm from '../PostUpdateForm';

interface Props {
  postId: number;
}

export default function PostUpdateModal({ postId }: Props) {
  const toggler = <Button>Toggle</Button>;

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
