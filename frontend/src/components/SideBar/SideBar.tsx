import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import { useSelector } from 'react-redux';
import { Chat, Diversity3, Person } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface LinkInterface {
  title: string;
  to: string;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  isExact?: boolean;
}

const createLinks: (
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

const MyListItem = ({
  isCurrent,
  title,
  to,
  icon: Icon,
}: LinkInterface & { isCurrent: boolean }) => {
  return (
    <ListItem
      disablePadding
      component={RouterLink}
      to={to}
      sx={{
        color: isCurrent ? 'primary.main' : 'text.secondary',
      }}
    >
      <ListItemButton>
        <ListItemIcon>
          <Icon
            sx={{
              color: isCurrent ? 'primary.main' : 'text.secondary',
            }}
          />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

export default function SideBar() {
  const { id } = useSelector(selectAuthUser);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        flex: 0.7,
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          width: '220px',
        }}
      >
        <List>
          {createLinks(id, t).map(({ title, to, icon, isExact }) => (
            <MyListItem
              title={title}
              to={to}
              icon={icon}
              isCurrent={isExact ? pathname === to : pathname.includes(to)}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
}
