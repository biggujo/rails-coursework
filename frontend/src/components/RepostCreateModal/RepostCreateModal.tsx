import { Checkbox, IconButton } from '@mui/material';
import FormWrapper from '../FormWrapper/FormWrapper.tsx';
import BasicModal from '../BasicModal';
import ShareIcon from '@mui/icons-material/Share';
import RepostCreateForm from '../RepostCreateForm';

interface Props {
  originalPostId: number;
}

export default function RepostCreateModal({ originalPostId }: Props) {
  const toggler = (
    <IconButton>
      <Checkbox
        icon={<ShareIcon />}
        checkedIcon={<ShareIcon />}
        checked={false}
      />
    </IconButton>
  );

  const modalContent = (
    <FormWrapper title={'Repost creation'}>
      <RepostCreateForm originalPostId={originalPostId} />
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
