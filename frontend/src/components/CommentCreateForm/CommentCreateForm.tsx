import useCommentCreateForm from '../../hooks/forms/useCommentCreateForm.ts';
import CommentForm from '../CommentForm';

interface Props {
  postId: number;
}

export default function CommentCreateForm({ postId }: Props) {
  const formik = useCommentCreateForm(postId);

  return <CommentForm formik={formik} />;
}
