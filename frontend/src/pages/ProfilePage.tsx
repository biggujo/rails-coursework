import { Box, Container, Tab, Typography } from '@mui/material';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';
import { AxiosError } from 'axios';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import ProfileUpdateForm from '../components/ProfileUpdateForm';
import { UserEntityExtended } from '../interfaces';
import DateConverters from '../utils/date-converters.ts';
import { useParams } from 'react-router-dom';
import MyAvatar from '../components/MyAvatar/MyAvatar.tsx';

export const ProfileMainData = ({
  userData,
}: {
  userData: Pick<
    UserEntityExtended,
    'email' | 'nickname' | 'profile_photo' | 'full_name' | 'city' | 'country'
  >;
}) => {
  return (
    <Box>
      <MyAvatar alt={userData.nickname} src={userData.profile_photo} />
      <ul>
        <li>
          <Typography>
            Email: <b>{userData.email}</b>
          </Typography>
        </li>
        <li>
          <Typography>
            Nickname: <b>{userData.nickname}</b>
          </Typography>
        </li>
        <li>
          <Typography>
            Full name: <b>{userData.full_name}</b>
          </Typography>
        </li>
        <li>
          <Typography>
            City: <b>{userData.city}</b>
          </Typography>
        </li>
        <li>
          <Typography>
            Country: <b>{userData.country}</b>
          </Typography>
        </li>
      </ul>
    </Box>
  );
};

export const ProfileUtilityData = ({
  userData,
}: {
  userData: Pick<UserEntityExtended, 'created_at' | 'updated_at'>;
}) => {
  return (
    <ul>
      <li>
        <Typography>
          Created at:{' '}
          <b>{String(DateConverters.extractReadable(userData.created_at))}</b>
        </Typography>
      </li>
      <li>
        <Typography>
          Updated at:{' '}
          <b>{String(DateConverters.extractReadable(userData.updated_at))}</b>
        </Typography>
      </li>
    </ul>
  );
};

const getSubtitle = (text: string) => {
  return (
    <Typography variant={'h4'} component={'h3'} marginBottom={2}>
      {text}
    </Typography>
  );
};

export default function ProfilePage() {
  const [pageValue, setPageValue] = useState<'main' | 'settings'>('main');
  const { id } = useParams();
  const { data, isLoading, error } = useGetProfileQuery(Number(id));

  const handleChange = (_: unknown, newValue: 'main' | 'settings') => {
    setPageValue(newValue);
  };

  return (
    <Container>
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
            {error && (
              <Typography>
                {(error as AxiosError).response!.statusText}
              </Typography>
            )}
            {!isLoading && data && (
              <>
                {getSubtitle('Main data')}
                <ProfileMainData userData={data} />
                {getSubtitle('Utility data')}
                <ProfileUtilityData userData={data} />
              </>
            )}
          </TabPanel>
          <TabPanel value="settings">
            {getSubtitle('Update profile')}
            <ProfileUpdateForm />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
