import { ChatMessage } from '../../interfaces';
import { Grid } from '@mui/material';
import MessageItem from '../MessageItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import {
  selectChatCurrentId,
  selectChatPaginationMetadata,
} from '../../redux/chatMessages/selectors.ts';
import { AppDispatch } from '../../redux/store.ts';
import ChatMessagesOperations from '../../redux/chatMessages/operations.ts';
import MyInfiniteScroll from '../MyInfiniteScroll';
import { useTranslation } from 'react-i18next';

interface Props {
  items: Array<ChatMessage>;
  parentElId: string;
}

export default function MessageList({ items, parentElId }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { isInitialised, page, maxPage, offset } = useSelector(
    selectChatPaginationMetadata
  );
  const chatId = useSelector(selectChatCurrentId);
  const user = useSelector(selectAuthUser);
  const { t } = useTranslation();

  const hasMorePages = page <= maxPage;

  const handleFetchNextPage = () => {
    if (!isInitialised) {
      return;
    }

    return dispatch(
      ChatMessagesOperations.fetchPreviousWithoutLoading({
        page,
        offset,
        chatId,
      })
    );
  };

  return (
    <MyInfiniteScroll
      parentElId={parentElId}
      dataLength={items.length}
      next={handleFetchNextPage}
      hasMore={hasMorePages}
      endMessage={t('chat.thisIsTheStart')}
      inverse={true}
      style={{ display: 'flex', flexDirection: 'column-reverse' }}
    >
      <Grid container direction={'column'} spacing={2}>
        {items.map(({ id, message, author_id, created_at }) => {
          const variant =
            author_id === user.id ? 'messageRight' : 'messageLeft';

          return (
            <Grid item key={id}>
              <MessageItem body={message} date={created_at} variant={variant} />
            </Grid>
          );
        })}
      </Grid>
    </MyInfiniteScroll>
  );
}
