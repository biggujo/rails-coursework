import { Container, Typography } from '@mui/material';
import GroupList from '../components/GroupList';

export default function GroupsPage() {
  return (
    <Container>
      <Typography variant={'h2'}>All Groups</Typography>
      <GroupList
        items={[
          {
            id: 2,
            name: 'cool name',
            description: 'cool description',
            members_count: 0,
            user: {
              id: 1,
              email: 'a@a.a',
              last_seen_at: '2024-05-30T14:53:31.811Z',
              nickname: '51234',
              full_name: 'J S',
              created_at: '2024-05-23T15:32:08.087Z',
              profile_photo:
                'http://localhost:5401/rails/active_storage/disk/eyJfcmFpbHMiOnsiZGF0YSI6eyJrZXkiOiJ4MndkZm5lM3Fmb2d2NXoxb2lpdGsyY2gxdjd3IiwiZGlzcG9zaXRpb24iOiJhdHRhY2htZW50OyBmaWxlbmFtZT1cInR3by1kaWZmZXJlbnQtYnJlZWRzLW9mLWNhdHMtc2lkZS1ieS1zaWRlLW91dGRvb3JzLWluLXRoZS1nYXJkZW4ud2VicFwiOyBmaWxlbmFtZSo9VVRGLTgnJ3R3by1kaWZmZXJlbnQtYnJlZWRzLW9mLWNhdHMtc2lkZS1ieS1zaWRlLW91dGRvb3JzLWluLXRoZS1nYXJkZW4ud2VicCIsImNvbnRlbnRfdHlwZSI6ImltYWdlL3dlYnAiLCJzZXJ2aWNlX25hbWUiOiJsb2NhbCJ9LCJleHAiOiIyMDI0LTA1LTMwVDE1OjAxOjM0LjUxMFoiLCJwdXIiOiJibG9iX2tleSJ9fQ==--d4e47615528f026ce9285837797059a59fbcbd6e/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.webp',
            },
          },
          {
            id: 3,
            name: '31231',
            description: '123123123',
            members_count: 0,
            user: {
              id: 1,
              email: 'a@a.a',
              last_seen_at: '2024-05-30T14:53:31.811Z',
              nickname: '51234',
              full_name: 'J S',
              created_at: '2024-05-23T15:32:08.087Z',
              profile_photo:
                'http://localhost:5401/rails/active_storage/disk/eyJfcmFpbHMiOnsiZGF0YSI6eyJrZXkiOiJ4MndkZm5lM3Fmb2d2NXoxb2lpdGsyY2gxdjd3IiwiZGlzcG9zaXRpb24iOiJhdHRhY2htZW50OyBmaWxlbmFtZT1cInR3by1kaWZmZXJlbnQtYnJlZWRzLW9mLWNhdHMtc2lkZS1ieS1zaWRlLW91dGRvb3JzLWluLXRoZS1nYXJkZW4ud2VicFwiOyBmaWxlbmFtZSo9VVRGLTgnJ3R3by1kaWZmZXJlbnQtYnJlZWRzLW9mLWNhdHMtc2lkZS1ieS1zaWRlLW91dGRvb3JzLWluLXRoZS1nYXJkZW4ud2VicCIsImNvbnRlbnRfdHlwZSI6ImltYWdlL3dlYnAiLCJzZXJ2aWNlX25hbWUiOiJsb2NhbCJ9LCJleHAiOiIyMDI0LTA1LTMwVDE1OjAxOjM0LjUxOVoiLCJwdXIiOiJibG9iX2tleSJ9fQ==--c36dd09de03cc7fb899f9f8de5a2e55e458d932f/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.webp',
            },
          },
        ]}
      />
    </Container>
  );
}
