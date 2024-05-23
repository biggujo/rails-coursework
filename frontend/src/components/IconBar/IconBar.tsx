import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRef, useState } from 'react';

export default function IconBar() {
  const [isOpen, setIsOpen] = useState(false);
  const avatarRef = useRef(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Stack
      direction={'row'}
      spacing={0.5}
      sx={{
        alignItems: 'center',
      }}
    >
      <IconButton>
        <Badge
          badgeContent={4}
          color={'secondary'}
          sx={{
            cursor: 'pointer',
          }}
        >
          <MailIcon
            color="action"
            sx={{
              color: 'primary.contrastText',
            }}
          />
        </Badge>
      </IconButton>
      <IconButton>
        <Badge
          badgeContent={4}
          color={'secondary'}
          sx={{
            cursor: 'pointer',
          }}
        >
          <NotificationsIcon
            color="action"
            sx={{
              color: 'primary.contrastText',
            }}
          />
        </Badge>
      </IconButton>
      <IconButton>
        <Avatar
          sx={{
            cursor: 'pointer',
          }}
          src={
            'https://cdn.pixabay.com/photo/2023/11/29/21/05/animal-8420313_1280.jpg'
          }
          onClick={handleOpen}
          ref={avatarRef}
        />
      </IconButton>
      <Menu anchorEl={avatarRef.current} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Stack>
  );
}
