import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import { NewCommentEntity } from '../../interfaces';
import myToast from '../../utils/myToast.tsx';
import CommentsOperations from '../../redux/comments/operations.ts';
import useCommentForm from './useCommentForm.ts';

const useCommentCreateForm = (postId: number) => {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (values: NewCommentEntity) => {
    try {
      await dispatch(CommentsOperations.add({ postId, data: values })).unwrap();

      myToast({
        message: 'The comment has been created',
        severity: 'success',
      });
    } catch (e) {
      myToast({
        message: e as string,
        severity: 'error',
      });
    }
  };

  return useCommentForm(null, handleSubmit);
};

export default useCommentCreateForm;
