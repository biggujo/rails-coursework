import { useDispatch, useSelector } from 'react-redux';
import { selectPostsMetadata } from '../../redux/posts/selectors.ts';
import { usePostsOperationsContext } from '../../providers/PostsOperationsProvider.tsx';
import MyInfiniteScroll from '../MyInfiniteScroll';
import { AppDispatch } from '../../redux/store.ts';
import { Nullable, PostEntity } from '../../interfaces';
import PostList from '../PostList';

interface Props {
  id: number;
  parentElId: Nullable<string>;
  items: Array<PostEntity>;
}

export default function PostListInfiniteWrapper({ id, items }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { page, maxPage, offset, isInitialised } =
    useSelector(selectPostsMetadata);
  const Operations = usePostsOperationsContext();

  const hasMore = page <= maxPage;

  const handleFetchNextPage = () => {
    if (!isInitialised) {
      return;
    }

    return dispatch(
      Operations.fetchAll({
        id,
        page,
        offset,
      })
    );
  };

  return (
    <MyInfiniteScroll
      parentElId={null}
      hasMore={hasMore}
      endMessage={'This is the end of posts'}
      dataLength={items.length}
      next={handleFetchNextPage}
      scrollThreshold={'1000px'}
    >
      <PostList items={items} />
    </MyInfiniteScroll>
  );
}