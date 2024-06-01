import useGroupMembership from './useGroupMembership.ts';
import API from '../../utils/api.ts';

const useLeaveGroupMutation = (id: number) => {
  return useGroupMembership({ id, apiFn: API.groups.leaveById });
};

export default useLeaveGroupMutation;
