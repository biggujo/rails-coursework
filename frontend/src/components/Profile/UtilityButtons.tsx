import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Button, ListItem, Stack, SvgIconTypeMap } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import { UserEntityExtended } from '../../interfaces';

interface Props {
  userData: UserEntityExtended;
}

const UtilityButtons = ({ userData }: Props) => {
  const currentUser = useSelector(selectAuthUser);

  const buttonList: Array<{
    title: string;
    icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
    onClick?: () => void;
  }> = [];

  if (userData.id !== currentUser.id) {
    buttonList.push({
      title: 'Send message',
      icon: CreateIcon,
    });
  }

  if (userData.id === currentUser.id) {
    buttonList.push({
      title: 'Edit Profile',
      icon: SettingsIcon,
    });
  }

  return (
    <Stack direction={'column'} alignItems={'stretch'}>
      {buttonList.map(({ title, icon: Icon, onClick }, index) => (
        <ListItem key={index}>
          <Button
            startIcon={<Icon />}
            variant={'outlined'}
            sx={{
              width: '200px',
            }}
            onClick={onClick}
          >
            {title}
          </Button>
        </ListItem>
      ))}
    </Stack>
  );
};

export default UtilityButtons;
