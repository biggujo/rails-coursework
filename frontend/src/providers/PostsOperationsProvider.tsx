import { createContext, ReactNode, useContext } from 'react';
import { PostsOperations } from '../redux/posts/operations.ts';

const PostsOperationsContext = createContext<PostsOperations>(null!);

export const usePostsOperationsContext = () =>
  useContext(PostsOperationsContext);

export const PostsOperationsProvider = ({
  apiContext,
  children,
}: {
  apiContext: PostsOperations;
  children: ReactNode | Array<ReactNode>;
}) => {
  return (
    <PostsOperationsContext.Provider value={apiContext!}>
      {children}
    </PostsOperationsContext.Provider>
  );
};
