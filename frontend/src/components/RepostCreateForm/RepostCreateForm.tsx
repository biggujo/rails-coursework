import PostForm from '../PostForm/PostForm.tsx';
import useCreateRepostForm from '../../hooks/forms/useCreateRepostForm.ts';

interface Props {
  originalPostId: number;
}

export default function RepostCreateForm({ originalPostId }: Props) {
  const formik = useCreateRepostForm(originalPostId);

  return <PostForm formik={formik} />;
}
