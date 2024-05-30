import { AppDispatch } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import PostsOperations from '../../redux/posts/operations.ts';
import myToast from '../../utils/myToast.tsx';
import usePostForm from './usePostForm.ts';
import { selectPostsItems } from '../../redux/posts/selectors.ts';

const usePostUpdateForm = (postId: number) => {
  const dispatch: AppDispatch = useDispatch();

  const posts = useSelector(selectPostsItems);

  const currentPost = posts.find(({ id }) => id === postId);

  const handleSubmit = async (values: { title: string; content: string }) => {
    try {
      await dispatch(
        PostsOperations.updateById({
          postId,
          title: values.title,
          content: values.content,
        })
      ).unwrap();

      myToast({
        message: 'The post has been updated',
        severity: 'success',
      });
    } catch (e) {
      myToast({
        message: e as string,
        severity: 'error',
      });
    }
  };

  return usePostForm(currentPost!, handleSubmit);
};

export default usePostUpdateForm;
