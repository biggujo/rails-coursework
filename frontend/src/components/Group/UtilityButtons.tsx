import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import UtilityButtonInterface from '../../interfaces/UtilityButton.interface.ts';
import { GroupEntity } from '../../interfaces';
import { Button, ListItem, Stack } from '@mui/material';
import PostCreateModal from '../PostCreateModal';
import { Add, Delete, Unsubscribe } from '@mui/icons-material';
import useDeleteGroupMutation from '../../hooks/mutation/useDeleteGroupMutation.ts';
import myToast from '../../utils/myToast.tsx';
import useJoinGroupMutation from '../../hooks/mutation/useJoinGroupMutation.ts';
import useLeaveGroupMutation from '../../hooks/mutation/useLeaveGroupMutation.ts';

interface Props {
  groupData: GroupEntity;
}

export default function UtilityButtons({ groupData }: Props) {
  const navigate = useNavigate();
  const currentUser = useSelector(selectAuthUser);
  const deleteGroupMutation = useDeleteGroupMutation(groupData.id);
  const joinGroupMutation = useJoinGroupMutation(groupData.id);
  const leaveGroupMutation = useLeaveGroupMutation(groupData.id);

  const buttonList: Array<UtilityButtonInterface> = [];

  const isCurrentUserGroupCreator = groupData.user.id === currentUser.id;

  if (groupData.is_joined && !isCurrentUserGroupCreator) {
    buttonList.push({
      title: 'Unsubscribe',
      icon: Unsubscribe,
      color: 'error',
      onClick: async () => {
        try {
          await leaveGroupMutation.mutateAsync();
        } catch (e) {
          myToast({
            message: "Couldn't leave the group",
            severity: 'error',
          });
        }
      },
    });
  }

  if (!groupData.is_joined && !isCurrentUserGroupCreator) {
    buttonList.push({
      title: 'Subscribe',
      icon: Add,
      color: 'success',
      onClick: async () => {
        try {
          await joinGroupMutation.mutateAsync();
        } catch (e) {
          myToast({
            message: "Couldn't join the group",
            severity: 'error',
          });
        }
      },
    });
  }

  if (isCurrentUserGroupCreator) {
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
      {groupData.is_joined && (
        <ListItem key={-1}>
          <PostCreateModal />
        </ListItem>
      )}
    </Stack>
  );
}
