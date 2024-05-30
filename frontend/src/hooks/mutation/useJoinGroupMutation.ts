import API from '../../utils/api.ts';
import useGroupMembership from './useGroupMembership.ts';

const useJoinGroupMutation = (id: number) => {
  return useGroupMembership({ id, apiFn: API.groups.joinById });
};

export default useJoinGroupMutation;
