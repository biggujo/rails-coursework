import { UserProfile } from '../../interfaces';
import API from '../../utils/api.ts';
import StatsUserInformation from '../StatsInformation';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface Props {
  userData: UserProfile;
}

const createFriendsInfo = (
  userData: UserProfile,
  t: TFunction<'translation', undefined>
) => [
  {
    title: t('friends.following'),
    length: userData.friends.following,
    apiFn: API.user.friends.fetchFollowing(userData.id),
  },
  {
    title: t('friends.followers'),
    length: userData.friends.followers,
    apiFn: API.user.friends.fetchFollowers(userData.id),
  },
  {
    title: t('friends.friends'),
    length: userData.friends.friends,
    apiFn: API.user.friends.fetchFriends(userData.id),
  },
];

const FriendsData = ({ userData }: Props) => {
  const { t } = useTranslation();
  const friendsInfo = createFriendsInfo(userData, t);

  return <StatsUserInformation categories={friendsInfo} />;
};

export default FriendsData;
