import { Box, Container, Tab, Typography } from '@mui/material';
import useGetProfileQuery from '../hooks/query/useGetProfileQuery.ts';
import { AxiosError } from 'axios';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import ProfileUpdateForm from '../components/ProfileUpdateForm';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile';

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
                <UserProfile userData={data} />
              </>
            )}
          </TabPanel>
          <TabPanel value="settings">
            <ProfileUpdateForm />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
