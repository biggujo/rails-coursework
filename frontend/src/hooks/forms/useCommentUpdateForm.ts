import { AppDispatch } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { selectCommentById } from '../../redux/comments/selectors.ts';
import myToast from '../../utils/myToast.tsx';
import useCommentForm, { CommentFormValues } from './useCommentForm.ts';
import CommentsOperations from '../../redux/comments/operations.ts';
import { useTranslation } from 'react-i18next';

interface FunctionInterface {
  postId: number;
  commentId: number;
}

const useCommentUpdateForm = ({ postId, commentId }: FunctionInterface) => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const currentComment = useSelector(
    selectCommentById({
      postId,
      commentId,
    })
  );

  const handleSubmit = async (values: CommentFormValues) => {
    try {
      await dispatch(
        CommentsOperations.updateById({
          postId,
          commentId,
          data: {
            text: values.text,
          },
        })
      ).unwrap();

      myToast({
        message: t('action.successCommentUpdate'),
        severity: 'success',
      });
    } catch (e) {
      myToast({
        message: t('action.failureCommentUpdate'),
        severity: 'error',
      });
    }
  };

  return useCommentForm(currentComment, handleSubmit);
};

export default useCommentUpdateForm;
