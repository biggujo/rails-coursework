import { NewPostEntity } from '../../interfaces';
import API from '../../utils/api.ts';
import myToast from '../../utils/myToast.tsx';
import usePostForm from './usePostForm.ts';
import { useTranslation } from 'react-i18next';

const useCreateRepostForm = (originalPostId: number) => {
  const { t } = useTranslation();

  const handleSubmit = async (values: NewPostEntity) => {
    try {
      await API.reposts.add({
        data: values,
        originalPostId,
      });

      myToast({
        message: t('action.post.successPostCreate'),
        severity: 'success',
      });
    } catch (e) {
      myToast({
        message: t('action.post.failurePostCreate'),
        severity: 'error',
      });
    }
  };

  return usePostForm(null, handleSubmit);
};

export default useCreateRepostForm;
