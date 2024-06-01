import { AppDispatch } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { selectCommentsByPostId } from '../../redux/comments/selectors.ts';
import { useEffect } from 'react';
import CommentsOperations from '../../redux/comments/operations.ts';

const useFetchCommentsByPostId = (postId: number) => {
  const dispatch: AppDispatch = useDispatch();
  const { items, isLoading, error } = useSelector(
    selectCommentsByPostId(postId)
  );

  useEffect(() => {
    dispatch(CommentsOperations.fetchByPostId(postId));
  }, [dispatch, postId]);

  return { items, isLoading, error };
};

export default useFetchCommentsByPostId;
