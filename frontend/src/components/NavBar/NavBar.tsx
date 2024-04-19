import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import IconBar from '../IconBar';
import SearchBar from '../SearchBar';

export default function NavBar() {
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
          <Typography variant="h6">SocialX</Typography>
          <SearchBar />
          <IconBar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
