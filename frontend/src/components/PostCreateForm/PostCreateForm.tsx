import PostForm from '../PostForm/PostForm.tsx';
import usePostCreateForm from '../../hooks/forms/usePostCreateForm.ts';

interface Props {
  additionalValues?: object;
}

export default function PostCreateForm({ additionalValues }: Props) {
  const formik = usePostCreateForm(additionalValues);

  return <PostForm formik={formik} />;
}
