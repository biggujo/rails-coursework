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
import SettingsIcon from '@mui/icons-material/Settings';
import { GroupPostsOperations } from '../../redux/posts/operations.ts';
import { PostsOperationsProvider } from '../../providers/PostsOperationsProvider.tsx';
import { useTranslation } from 'react-i18next';

interface Props {
  groupData: GroupEntity;
}

export default function UtilityButtons({ groupData }: Props) {
  const navigate = useNavigate();
  const currentUser = useSelector(selectAuthUser);
  const deleteGroupMutation = useDeleteGroupMutation(groupData.id);
  const joinGroupMutation = useJoinGroupMutation(groupData.id);
  const leaveGroupMutation = useLeaveGroupMutation(groupData.id);
  const { t } = useTranslation();

  const buttonList: Array<UtilityButtonInterface> = [];

  const isCurrentUserGroupCreator = groupData.user.id === currentUser.id;

  if (groupData.is_joined && !isCurrentUserGroupCreator) {
    buttonList.push({
      title: t('action.unsubscribe'),
      icon: Unsubscribe,
      color: 'error',
      onClick: async () => {
        try {
          await leaveGroupMutation.mutateAsync();
        } catch (e) {
          myToast({
            message: t('action.failureUnsubscribe'),
            severity: 'error',
          });
        }
      },
    });
  }

  if (!groupData.is_joined && !isCurrentUserGroupCreator) {
    buttonList.push({
      title: t('action.subscribe'),
      icon: Add,
      color: 'success',
      onClick: async () => {
        try {
          await joinGroupMutation.mutateAsync();
        } catch (e) {
          myToast({
            message: t('action.failureSubscribe'),
            severity: 'error',
          });
        }
      },
    });
  }

  if (isCurrentUserGroupCreator) {
    buttonList.push({
      title: t('action.groupEdit'),
      icon: SettingsIcon,
      onClick: () => navigate(`/group_edit/${groupData.id}`),
    });

    buttonList.push({
      title: t('action.group.delete'),
      icon: Delete,
      color: 'error',
      onClick: async () => {
        try {
          if (!confirm(t('action.group.confirmDelete'))) {
            return;
          }

          await deleteGroupMutation.mutateAsync();

          myToast({
            message: t('action.group.successDelete'),
            severity: 'success',
          });

          navigate('/');
        } catch (e) {
          myToast({
            message: t('action.group.failureDelete'),
            severity: 'error',
          });
        }
      },
    });
  }

  return (
    <Stack direction={'column'} alignItems={'stretch'}>
      {(groupData.is_joined || isCurrentUserGroupCreator) && (
        <ListItem key={-1}>
          <PostsOperationsProvider apiContext={GroupPostsOperations}>
            <PostCreateModal
              additionalValues={{
                group_id: groupData.id,
              }}
            />
          </PostsOperationsProvider>
        </ListItem>
      )}
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
