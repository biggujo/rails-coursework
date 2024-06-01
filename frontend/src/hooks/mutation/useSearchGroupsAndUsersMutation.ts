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
    enabled: false,
  });

export default useSearchGroupsAndUsersMutation;
