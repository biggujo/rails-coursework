import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import UtilityButtonInterface from '../../interfaces/UtilityButton.interface.ts';
import { GroupEntity } from '../../interfaces';
import { Button, ListItem, Stack } from '@mui/material';
import PostCreateModal from '../PostCreateModal';
import { Delete } from '@mui/icons-material';
import useDeleteGroupMutation from '../../hooks/mutation/useDeleteGroupMutation.ts';
import myToast from '../../utils/myToast.tsx';

interface Props {
  groupData: GroupEntity;
}

export default function UtilityButtons({ groupData }: Props) {
  const navigate = useNavigate();
  const currentUser = useSelector(selectAuthUser);
  const deleteGroupMutation = useDeleteGroupMutation(groupData.id);

  const buttonList: Array<UtilityButtonInterface> = [];

  if (groupData.user.id === currentUser.id) {
    buttonList.push({
      title: 'Delete group',
      icon: Delete,
      color: 'error',
      onClick: async () => {
        try {
          if (!confirm('Are you sure you want to delete the group?')) {
            return;
          }

          await deleteGroupMutation.mutateAsync();

          myToast({
            message: 'The group has been deleted',
            severity: 'success',
          });

          navigate('/');
        } catch (e) {
          myToast({
            message: "Couldn't delete the group",
            severity: 'error',
          });
        }
      },
    });
  }

  return (
    <Stack direction={'column'} alignItems={'stretch'}>
      <ListItem key={-1}>
        <PostCreateModal />
      </ListItem>
      {buttonList.map(({ title, icon: Icon, onClick, color }, index) => (
        <ListItem key={index}>
          <Button
            startIcon={<Icon />}
            variant={'outlined'}
            sx={{
              width: '200px',
            }}
            onClick={onClick}
            color={color}
          >
            {title}
          </Button>
        </ListItem>
      ))}
    </Stack>
  );
}
