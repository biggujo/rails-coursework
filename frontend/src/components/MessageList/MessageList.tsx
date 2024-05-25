import { ChatMessage } from '../../interfaces';
import { Box, Grid } from '@mui/material';
import MessageItem from '../MessageItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import {
  selectChatCurrentId,
  selectChatPaginationMetadata,
} from '../../redux/chatMessages/selectors.ts';
import { AppDispatch } from '../../redux/store.ts';
import ChatMessagesOperations from '../../redux/chatMessages/operations.ts';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLayoutEffect, useRef } from 'react';

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

  const hasMorePages = page < maxPage;

  const handleFetchNextPage = () => {
    if (!isInitialised) {
      return;
    }

    return dispatch(
      ChatMessagesOperations.fetchPrevious({ page, offset, chatId })
    );
  };

  {
    /* TODO: bring back hasMorePages*/
  }
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={handleFetchNextPage}
      hasMore={false}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      inverse={true}
      style={{ display: 'flex', flexDirection: 'column-reverse' }}
      scrollableTarget="messages-container"
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
    </InfiniteScroll>
  );
}
