import { GroupEntity } from '../../interfaces';
import API from '../../utils/api.ts';
import StatsUserInformation from '../StatsInformation';

interface Props {
  groupData: GroupEntity;
}

const createStatsInfo = (groupData: GroupEntity) => [
  {
    title: `Members`,
    length: groupData.members_count,
    apiFn: API.groups.fetchMembersById(groupData.id),
  },
];

export default function MembersData({ groupData }: Props) {
  const statsInfo = createStatsInfo(groupData);

  return <StatsUserInformation categories={statsInfo} />;
}
