import NavBar from '../components/NavBar';
import { Container, Stack } from '@mui/material';
import SideBar from '../components/SideBar';
import Rightbar from '../components/Rightbar';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../redux/auth/selectors.ts';

interface Props {
  children: ReactElement;
}

export default function MainWrapper({ children }: Props) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
    <>
      <NavBar />
      <Container maxWidth={'xl'}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          {isLoggedIn && <SideBar />}
          <Container
            maxWidth={'md'}
            sx={{
              pt: 2,
            }}
          >
            {children}
          </Container>
          {isLoggedIn && <Rightbar />}
        </Stack>
      </Container>
    </>
  );
}
