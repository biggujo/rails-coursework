import usePostUpdateForm from '../../hooks/forms/usePostUpdateForm.ts';
import PostForm from '../PostForm/PostForm.tsx';

interface Props {
  postId: number;
}

export default function PostUpdateForm({ postId }: Props) {
  const formik = usePostUpdateForm(postId);

  return <PostForm formik={formik} />;
}
