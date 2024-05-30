import useCommentUpdateForm from '../../hooks/forms/useCommentUpdateForm.ts';
import CommentForm from '../CommentForm';

interface Props {
  postId: number;
  commentId: number;
}

export default function CommentUpdateForm({ postId, commentId }: Props) {
  const formik = useCommentUpdateForm({
    postId,
    commentId,
  });

  return <CommentForm formik={formik} />;
}
