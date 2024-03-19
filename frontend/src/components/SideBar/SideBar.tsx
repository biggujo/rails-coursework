import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

;

type Props = {};

export default function SideBar({}: Props) {
  return (
    <Box sx={{
      flex: 1.5,
    }}
    >
      <Box sx={{
        position: 'fixed',
      }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
