import { useQuery } from '@tanstack/react-query';
import API from '../../utils/api.ts';

const useFetchAllChatsQuery = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: API.chats.fetchAll,
  });
};

export default useFetchAllChatsQuery;
