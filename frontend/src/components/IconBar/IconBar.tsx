import { Box, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useRef, useState } from 'react';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthOperations from '../../redux/auth/operations.ts';
import { AppDispatch } from '../../redux/store.ts';
import LanguageChanger from '../LanguageChanger';
import { useTranslation } from 'react-i18next';

export default function IconBar() {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector(selectAuthUser);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const avatarRef = useRef(null);
  const { t } = useTranslation();

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
      <Box
        sx={{
          pr: 1,
        }}
      >
        <LanguageChanger />
      </Box>
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
          {t('menu.profile')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(AuthOperations.signOut());
            handleClose();
          }}
        >
          {t('menu.logout')}
        </MenuItem>
      </Menu>
    </Stack>
  );
}
