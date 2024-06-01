import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material';
import IconBar from '../IconBar';
import SearchBar from '../SearchBar';
import { Groups2 } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors.ts';

export default function NavBar() {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
    <AppBar
      position={'sticky'}
      sx={{
        p: 0.5,
      }}
      elevation={0}
    >
      <Container>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack
            component={RouterLink}
            to={'/'}
            color={'#ffffff'}
            direction={'row'}
            alignItems={'flex-end'}
            gap={1}
            sx={{
              textDecoration: 'none',
            }}
          >
            <Groups2 fontSize={'large'} />
            <Typography variant="h6" textTransform={'uppercase'}>
              Social X
            </Typography>
          </Stack>
          {isLoggedIn && <SearchBar />}
          {isLoggedIn && <IconBar />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
