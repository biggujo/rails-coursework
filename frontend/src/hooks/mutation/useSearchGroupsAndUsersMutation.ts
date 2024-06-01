import { useMutation } from '@tanstack/react-query';
import API from '../../utils/api.ts';
import UserEntity from '../../interfaces/UserEntity.interface.ts';
import { GroupEntity } from '../../interfaces';

const useSearchGroupsAndUsersMutation = () =>
  useMutation({
    mutationKey: [`search`],
    mutationFn: (name: string) =>
      API.search(name) as Promise<
        Array<{
          id: number;
          type: 'user' | 'group';
          attributes: UserEntity | GroupEntity;
        }>
      >,
    // @ts-expect-error of bad typing
    cacheTime: 120,
    enabled: false,
  });

export default useSearchGroupsAndUsersMutation;
