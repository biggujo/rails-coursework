import { Checkbox, IconButton } from '@mui/material';
import FormWrapper from '../FormWrapper/FormWrapper.tsx';
import BasicModal from '../BasicModal';
import ShareIcon from '@mui/icons-material/Share';
import RepostCreateForm from '../RepostCreateForm';
import { useTranslation } from 'react-i18next';

interface Props {
  originalPostId: number;
}

export default function RepostCreateModal({ originalPostId }: Props) {
  const { t } = useTranslation();

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
    <FormWrapper title={t('repost.repostCreation')}>
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
