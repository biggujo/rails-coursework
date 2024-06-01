import { Button } from '@mui/material';
import FormWrapper from '../FormWrapper/FormWrapper.tsx';
import BasicModal from '../BasicModal';
import PostCreateForm from '../PostCreateForm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useTranslation } from 'react-i18next';

interface Props {
  additionalValues?: object;
}

export default function PostCreateModal({ additionalValues }: Props) {
  const { t } = useTranslation();

  const toggler = (
    <Button
      startIcon={<EditNoteIcon />}
      variant={'outlined'}
      sx={{
        width: '200px',
      }}
    >
      {t('action.post.create')}
    </Button>
  );

  const modalContent = (
    <FormWrapper title={t('action.post.creation')}>
      <PostCreateForm additionalValues={additionalValues} />
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
