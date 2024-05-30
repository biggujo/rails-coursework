import PostForm from '../PostForm/PostForm.tsx';
import usePostCreateForm from '../../hooks/forms/usePostCreateForm.ts';

export default function PostCreateForm() {
  const formik = usePostCreateForm();

  return <PostForm formik={formik} />;
}
