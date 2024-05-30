import { UserProfile } from '../../interfaces';
import API from '../../utils/api.ts';
import StatsUserInformation from '../StatsInformation';

interface Props {
  userData: UserProfile;
}

const createFriendsInfo = (userData: UserProfile) => [
  {
    title: `Following`,
    length: userData.friends.following,
    apiFn: API.user.friends.fetchFollowing(userData.id),
  },
  {
    title: `Followers`,
    length: userData.friends.followers,
    apiFn: API.user.friends.fetchFollowers(userData.id),
  },
  {
    title: `Friends`,
    length: userData.friends.friends,
    apiFn: API.user.friends.fetchFriends(userData.id),
  },
];

const FriendsData = ({ userData }: Props) => {
  const friendsInfo = createFriendsInfo(userData);

  return <StatsUserInformation categories={friendsInfo} />;
};

export default FriendsData;
