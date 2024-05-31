import { Box, ListItem, Stack, Typography, useTheme } from '@mui/material';
import FetchUsersModal from '../FetchUsersModal/FetchUsersModal.tsx';
import UserEntity from '../../interfaces/UserEntity.interface.ts';

interface Props {
  categories: Array<{
    title: string;
    length: number;
    apiFn: () => Promise<Array<UserEntity>>;
  }>;
}

export default function StatsUserInformation({ categories }: Props) {
  const theme = useTheme();

  return (
    <Box>
      <Stack direction={'row'} gap={0}>
        {categories.map(({ title, length, apiFn }, index) => (
          <ListItem
            key={index}
            sx={{
              p: 0,
              m: 0,
              cursor: 'pointer',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            <FetchUsersModal
              apiFn={apiFn}
              title={title}
              toggler={
                <Stack alignItems={'center'} width={'150px'}>
                  <Typography variant={'h6'} color={'primary'}>
                    {length}
                  </Typography>
                  <Typography variant={'body2'}>{title}</Typography>
                </Stack>
              }
            />
          </ListItem>
        ))}
      </Stack>
    </Box>
  );
}
