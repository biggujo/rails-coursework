import { NewPostEntity } from '../../interfaces';
import API from '../../utils/api.ts';
import myToast from '../../utils/myToast.tsx';
import usePostForm from './usePostForm.ts';

const useCreateRepostForm = (originalPostId: number) => {
  const handleSubmit = async (values: NewPostEntity) => {
    try {
      await API.reposts.add({
        data: values,
        originalPostId,
      });

      myToast({
        message: 'The post has been created',
        severity: 'success',
      });
    } catch (e) {
      myToast({
        message: e as string,
        severity: 'error',
      });
    }
  };

  return usePostForm(null, handleSubmit);
};

export default useCreateRepostForm;
