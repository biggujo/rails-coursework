import { useAuth } from '../providers';
import { Box, Button, Container, Tab, Typography } from '@mui/material';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';
import { Outlet, useNavigate } from 'react-router-dom';
import useCheckSessionExpiration from '../hooks/useCheckSessionExpiration.tsx';
import { AxiosError } from 'axios';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { SyntheticEvent, useState } from 'react';
import ProfileUpdateForm from '../components/ProfileUpdateForm';

const ProfileMainData = () => {
  const profileQuery = useGetProfileQuery();

  return <>{profileQuery.isError && <Typography>{(profileQuery.error as AxiosError).response!.statusText}</Typography>}
    {profileQuery.isSuccess && <ul>
      <li>
        <Typography>Email: <b>{profileQuery.data.data.email}</b></Typography>
      </li>
      <li>
        <Typography>Nickname: <b>{profileQuery.data.data.nickname}</b></Typography>
      </li>
    </ul>}</>;
};

export default function ProfilePage() {
  const profileQuery = useGetProfileQuery({ enabled: false });
  useCheckSessionExpiration(profileQuery.error);
  const [pageValue, setPageValue] = useState<'main' | 'settings'>('main');

  const handleChange = (_, newValue: string) => {
    setPageValue(newValue);
  };

  return (<Container>
    <Box>
      <Typography variant={'h2'}>Profile</Typography>
      <TabContext value={pageValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Main information" value="main" />
            <Tab label="Change profile" value="settings" />
          </TabList>
        </Box>
        <TabPanel value="main">
          <ProfileMainData />
        </TabPanel>
        <TabPanel value="settings">
          <Typography variant={'h4'}
                      component={'h3'}
                      marginBottom={2}>
            Update profile
          </Typography>
          <ProfileUpdateForm />
        </TabPanel>
      </TabContext>
    </Box>
  </Container>);
}
