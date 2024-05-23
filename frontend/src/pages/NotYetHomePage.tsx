import NavBar from '../components/NavBar';
import { Container, Stack } from '@mui/material';
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';

export default function NotYetHomePage() {
  return (<>
    <NavBar />
    <Container>
      <Stack direction={'row'}
             spacing={2}
             justifyContent={'space-between'}
      >
        <SideBar />
        <Feed />
        <Rightbar />
      </Stack>
    </Container>
  </>);
}
