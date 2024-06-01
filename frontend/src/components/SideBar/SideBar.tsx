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

interface LinkInterface {
  title: string;
  to: string;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  isExact?: boolean;
}

const createLinks: (currentUserId: number) => Array<LinkInterface> = (
  currentUserId: number
) => [
  {
    title: 'Home Page',
    to: '/',
    isExact: true,
    icon: HomeIcon,
  },
  {
    title: 'My Profile',
    to: `/profile/${currentUserId}`,
    isExact: true,
    icon: Person,
  },
  {
    title: 'My Chats',
    to: '/my_chats',
    icon: Chat,
  },
  {
    title: 'My Friends',
    to: '/my_friends',
    icon: PeopleAltIcon,
  },
  {
    title: 'My Groups',
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

  return (
    <Box
      sx={{
        flex: 1,
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          width: '220px',
        }}
      >
        <List>
          {createLinks(id).map(({ title, to, icon, isExact }) => (
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
