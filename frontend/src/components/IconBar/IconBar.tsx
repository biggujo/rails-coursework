import { IconButton, Menu, MenuItem, Stack } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useRef, useState } from 'react';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthOperations from '../../redux/auth/operations.ts';
import { AppDispatch } from '../../redux/store.ts';

export default function IconBar() {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector(selectAuthUser);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
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
      <IconButton onClick={() => navigate('/my_chats')}>
        <MailIcon
          color="action"
          sx={{
            color: 'primary.contrastText',
          }}
        />
      </IconButton>
      <IconButton
        onClick={handleOpen}
        ref={avatarRef}
        sx={{
          cursor: 'pointer',
        }}
      >
        <MyAvatar
          alt={currentUser.nickname}
          size={'small'}
          src={currentUser.profile_photo}
        />
      </IconButton>
      <Menu anchorEl={avatarRef.current} open={isOpen} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            navigate(`/profile/${currentUser.id}`);
            handleClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(AuthOperations.signOut());
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
}
