import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import createNavigationLinks from '../../utils/create-navigation-links.ts';
import LinkInterface from '../../interfaces/LinkInterface.interface.ts';

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
        minHeight: '600px',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          width: '220px',
        }}
      >
        <List>
          {createNavigationLinks(id, t).map(({ title, to, icon, isExact }) => (
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
