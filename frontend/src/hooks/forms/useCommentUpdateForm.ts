import { AppDispatch } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { selectCommentById } from '../../redux/comments/selectors.ts';
import myToast from '../../utils/myToast.tsx';
import useCommentForm, { CommentFormValues } from './useCommentForm.ts';
import CommentsOperations from '../../redux/comments/operations.ts';

interface FunctionInterface {
  postId: number;
  commentId: number;
}

const useCommentUpdateForm = ({ postId, commentId }: FunctionInterface) => {
  const dispatch: AppDispatch = useDispatch();

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
        message: 'The comment has been updated',
        severity: 'success',
      });
    } catch (e) {
      myToast({
        message: e as string,
        severity: 'error',
      });
    }
  };

  return useCommentForm(currentComment, handleSubmit);
};

export default useCommentUpdateForm;
