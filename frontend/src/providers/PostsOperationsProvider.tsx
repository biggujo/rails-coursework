import { createContext, ReactElement, useContext } from 'react';
import { PostsOperations } from '../redux/posts/operations.ts';

const PostsOperationsContext = createContext<PostsOperations>(null!);

export const usePostsOperationsContext = () =>
  useContext(PostsOperationsContext);

export const PostsOperationsProvider = ({
  apiContext,
  children,
}: {
  apiContext: PostsOperations;
  children: ReactElement | Array<ReactElement>;
}) => {
  return (
    <PostsOperationsContext.Provider value={apiContext!}>
      {children}
    </PostsOperationsContext.Provider>
  );
};
