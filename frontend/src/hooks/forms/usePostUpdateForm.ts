import { AppDispatch } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import myToast from '../../utils/myToast.tsx';
import usePostForm from './usePostForm.ts';
import { selectPostsItems } from '../../redux/posts/selectors.ts';
import { usePostsOperationsContext } from '../../providers/PostsOperationsProvider.tsx';

const usePostUpdateForm = (postId: number) => {
  const dispatch: AppDispatch = useDispatch();
  const Operations = usePostsOperationsContext();

  const posts = useSelector(selectPostsItems);

  const currentPost = posts.find(({ id }) => id === postId);

  const handleSubmit = async (values: { title: string; content: string }) => {
    try {
      await dispatch(
        Operations.updateById({
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
