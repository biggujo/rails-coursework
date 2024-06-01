import { Box, ListItem, Stack, Typography } from '@mui/material';
import createNavitationLinks from '../../utils/create-navigation-links.ts';
import { useSelector } from 'react-redux';
import {
  selectAuthIsLoggedIn,
  selectAuthUser,
} from '../../redux/auth/selectors.ts';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();
  const currentUser = useSelector(selectAuthUser);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const links = createNavitationLinks(currentUser.id, t);

  return (
    <Box
      sx={{
        pt: '175px',
      }}
    >
      <hr />
      <Stack
        spacing={4}
        sx={{
          px: '150px',
          pt: '50px',
          pb: '50px',
        }}
      >
        {isLoggedIn &&
          links.map(({ title, to }, index) => (
            <ListItem key={index} disablePadding component={RouterLink} to={to}>
              {title}
            </ListItem>
          ))}
        <Typography
          sx={{
            pt: 1,
          }}
        >
          (c) Social X, 2024
        </Typography>
      </Stack>
    </Box>
  );
}
