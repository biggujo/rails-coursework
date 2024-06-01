import { TFunction } from 'i18next';
import HomeIcon from '@mui/icons-material/Home';
import { Chat, Diversity3, Person } from '@mui/icons-material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LinkInterface from '../interfaces/LinkInterface.interface.ts';

const createNavitationLinks: (
  currentUserId: number,
  t: TFunction<'translation', undefined>
) => Array<LinkInterface> = (currentUserId: number, t) => [
  {
    title: t('navigation.homePage'),
    to: '/',
    isExact: true,
    icon: HomeIcon,
  },
  {
    title: t('navigation.myProfile'),
    to: `/profile/${currentUserId}`,
    isExact: true,
    icon: Person,
  },
  {
    title: t('navigation.myChats'),
    to: '/my_chats',
    icon: Chat,
  },
  {
    title: t('navigation.myFriends'),
    to: '/my_friends',
    icon: PeopleAltIcon,
  },
  {
    title: t('navigation.myGroups'),
    to: '/my_groups',
    icon: Diversity3,
  },
];

export default createNavitationLinks;
