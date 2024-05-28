import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';

const useFetchAllChatsQuery = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: API.chats.fetchAll,
    // @ts-ignore
    cacheTime: 120,
  });
};

export default useFetchAllChatsQuery;
