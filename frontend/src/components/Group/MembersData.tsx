import { GroupEntity } from '../../interfaces';
import API from '../../utils/api.ts';
import StatsUserInformation from '../StatsInformation';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface Props {
  groupData: GroupEntity;
}

const createStatsInfo = (
  groupData: GroupEntity,
  t: TFunction<'translation', undefined>
) => [
  {
    title: t('group.members'),
    length: groupData.members_count,
    apiFn: API.groups.fetchMembersById(groupData.id),
  },
];

export default function MembersData({ groupData }: Props) {
  const { t } = useTranslation();
  const statsInfo = createStatsInfo(groupData, t);

  return <StatsUserInformation categories={statsInfo} />;
}
