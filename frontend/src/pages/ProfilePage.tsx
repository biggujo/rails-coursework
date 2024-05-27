import { Box, Container, Tab, Typography } from '@mui/material';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';
import useCheckSessionExpiration from '../hooks/useCheckSessionExpiration.tsx';
import { AxiosError } from 'axios';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ReactElement, ReactNode, useState } from 'react';
import ProfileUpdateForm from '../components/ProfileUpdateForm';
import { User } from '../interfaces';
import DateConverters from '../utils/date-converters.ts';

const ProfileMainData = ({ userData }: { userData: Partial<User, 'email' | 'nickname'> }) => {
  return <ul>
    <li>
      <Typography>Email: <b>{userData.email}</b></Typography>
    </li>
    <li>
      <Typography>Nickname: <b>{userData.nickname}</b></Typography>
    </li>
  </ul>;
};

const ProfileUtilityData = ({ userData }: { userData: Partial<User, 'created_at' | 'updated_at'> }) => {
  return <ul>
    <li>
      <Typography>Created at: <b>{String(DateConverters.extractReadable(userData.created_at))}</b></Typography>
    </li>
    <li>
      <Typography>Updated at: <b>{String(DateConverters.extractReadable(userData.updated_at))}</b></Typography>
    </li>
  </ul>;
};

const getSubtitle = (text: string) => {
  return <Typography variant={'h4'}
                     component={'h3'}
                     marginBottom={2}>
    {text}
  </Typography>;
};

export default function ProfilePage() {
  const [pageValue, setPageValue] = useState<'main' | 'settings'>('main');
  const { data, isLoading, error } = useGetProfileQuery();
  useCheckSessionExpiration(profileQuery.error);

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
            <Tab label="Change data" value="settings" />
          </TabList>
        </Box>
        <TabPanel value="main">
          {isLoading && <Typography>Loading...</Typography>}
          {error && <Typography>{(profileQuery.error as AxiosError).response!.statusText}</Typography>}
          {!isLoading && data && <>
            {getSubtitle('Main data')}
            <ProfileMainData userData={profileQuery.data.data} />
            {getSubtitle('Utility data')}
            <ProfileUtilityData userData={profileQuery.data.data} />
          </>}

        </TabPanel>
        <TabPanel value="settings">
          {getSubtitle('Update profile')}
          <ProfileUpdateForm />
        </TabPanel>
      </TabContext>
    </Box>
  </Container>);
}
