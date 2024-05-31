import { Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ReactElement } from 'react';
import { Nullable } from '../../interfaces';

interface Props {
  parentElId: Nullable<string>;
  dataLength: number;
  next: () => void;
  hasMore: boolean;
  endMessage: string;
  children: ReactElement;

  [props: string]: unknown;
}

export default function MyInfiniteScroll({
  parentElId,
  dataLength,
  next,
  hasMore,
  endMessage,
  children,
  ...props
}: Props) {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={
        <Typography align={'center'} fontWeight={'bold'} my={4}>
          Loading...
        </Typography>
      }
      endMessage={
        <Typography align={'center'} fontWeight={'bold'} my={4}>
          {endMessage}
        </Typography>
      }
      scrollThreshold={'400px'}
      scrollableTarget={parentElId !== null ? parentElId : undefined}
      {...props}
    >
      {children}
    </InfiniteScroll>
  );
}
