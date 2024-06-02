import { useDispatch, useSelector } from 'react-redux';
import { selectPostsMetadata } from '../../redux/posts/selectors.ts';
import { usePostsOperationsContext } from '../../providers/PostsOperationsProvider.tsx';
import MyInfiniteScroll from '../MyInfiniteScroll';
import { AppDispatch } from '../../redux/store.ts';
import { Nullable, PostEntity } from '../../interfaces';
import PostList from '../PostList';
import { useTranslation } from 'react-i18next';
import { selectPostsFilters } from '../../redux/filters/selectors.ts';

interface Props {
  id: number;
  parentElId: Nullable<string>;
  items: Array<PostEntity>;
}

export default function PostListInfiniteWrapper({ id, items }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { page, maxPage, offset, isInitialised } =
    useSelector(selectPostsMetadata);
  const filters = useSelector(selectPostsFilters);
  const Operations = usePostsOperationsContext();
  const { t } = useTranslation();

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
        filterData: filters,
      })
    );
  };

  return (
    <MyInfiniteScroll
      parentElId={null}
      hasMore={hasMore}
      endMessage={t('post.thisIsTheEnd')}
      dataLength={items.length}
      next={handleFetchNextPage}
      scrollThreshold={'1000px'}
    >
      <PostList items={items} />
    </MyInfiniteScroll>
  );
}
