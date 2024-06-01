import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import { NewCommentEntity } from '../../interfaces';
import myToast from '../../utils/myToast.tsx';
import CommentsOperations from '../../redux/comments/operations.ts';
import useCommentForm from './useCommentForm.ts';
import { useTranslation } from 'react-i18next';

const useCommentCreateForm = (postId: number) => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = async (values: NewCommentEntity) => {
    try {
      await dispatch(CommentsOperations.add({ postId, data: values })).unwrap();

      myToast({
        message: t('action.successCommentCreate'),
        severity: 'success',
      });
    } catch (e) {
      myToast({
        message: t('action.failureCommentCreate'),
        severity: 'error',
      });
    }
  };

  return useCommentForm(null, handleSubmit);
};

export default useCommentCreateForm;
