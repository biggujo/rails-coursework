import { Box, ListItem, Stack, Typography, useTheme } from '@mui/material';
import createNavitationLinks from '../../utils/create-navigation-links.ts';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  const theme = useTheme();
  const currentUser = useSelector(selectAuthUser);
  const { t } = useTranslation();
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
        {links.map(({ title, to }, index) => (
          <ListItem
            key={index}
            disablePadding
            component={RouterLink}
            to={to}
            sx={{
              color: theme.palette.primary.main,
            }}
          >
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
