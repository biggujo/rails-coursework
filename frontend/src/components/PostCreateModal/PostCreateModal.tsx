import { Button } from '@mui/material';
import FormWrapper from '../FormWrapper/FormWrapper.tsx';
import BasicModal from '../BasicModal';
import PostCreateForm from '../PostCreateForm';
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function PostCreateModal() {
  const toggler = (
    <Button
      startIcon={<EditNoteIcon />}
      variant={'outlined'}
      sx={{
        width: '200px',
      }}
    >
      Create post
    </Button>
  );

  const modalContent = (
    <FormWrapper title={'Post creation'}>
      <PostCreateForm />
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
