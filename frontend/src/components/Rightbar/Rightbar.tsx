import { Avatar, AvatarGroup, Box, Typography } from '@mui/material';

export default function Rightbar() {
  return (
    <Box
      sx={{
        flex: 2,
      }}
    >
      <Box
        sx={{
          position: 'fixed',
        }}
      >
        <Typography variant={'h5'} component={'h2'}>
          Friends Online
        </Typography>
        <AvatarGroup
          max={3}
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <Avatar alt="Remy Sharp">R</Avatar>
          <Avatar alt="Travis Howard">T</Avatar>
          <Avatar alt="Cindy Baker">K</Avatar>
          <Avatar alt="Agnes Walker">L</Avatar>
          <Avatar alt="Trevor Henderson">B</Avatar>
        </AvatarGroup>
      </Box>
    </Box>
  );
}
