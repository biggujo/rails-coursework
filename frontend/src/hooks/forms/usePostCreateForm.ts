import PostsOperations from '../../redux/posts/operations.ts';
import myToast from '../../utils/myToast.tsx';
import { NewPostEntity } from '../../interfaces';
import usePostForm from './usePostForm.ts';
import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';

const usePostCreateForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (values: NewPostEntity) => {
    try {
      await dispatch(PostsOperations.add(values)).unwrap();

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

export default usePostCreateForm;
