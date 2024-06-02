import NavBar from '../components/NavBar';
import { Box, Container, Stack, useTheme } from '@mui/material';
import SideBar from '../components/SideBar';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../redux/auth/selectors.ts';
import Footer from '../components/Footer/Footer.tsx';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollToTop from 'react-scroll-to-top';

interface Props {
  children: ReactElement;
}

export default function MainWrapper({ children }: Props) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const theme = useTheme();

  return (
    <>
      <NavBar />
      <Container>
        <Stack direction={'row'}>
          {isLoggedIn && <SideBar />}
          <Container
            maxWidth={'md'}
            sx={{
              pt: 2,
            }}
          >
            {children}
          </Container>
        </Stack>
      </Container>
      {isLoggedIn && <Footer />}
      <ScrollToTop
        smooth
        style={{
          borderRadius: '50%',
          border: `1px solid ${theme.palette.primary.main}`,
          boxShadow: 'none',
        }}
        component={
          <Box
            sx={{
              color: theme.palette.primary.main,
            }}
          >
            <KeyboardArrowUpIcon />
          </Box>
        }
      />
    </>
  );
}
