import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.ts';
import { Button, ListItem, Stack } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import { UserProfile } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { PersonAdd, PersonRemove } from '@mui/icons-material';
import API from '../../utils/api.ts';
import { AppDispatch } from '../../redux/store.ts';
import ProfileOperations from '../../redux/profile/operations.ts';
import myToast from '../../utils/myToast.tsx';
import PostCreateModal from '../PostCreateModal';
import UtilityButtonInterface from '../../interfaces/UtilityButton.interface.ts';
import { useTranslation } from 'react-i18next';

interface Props {
  userData: UserProfile;
}

const followFunction =
  (
    apiFn: () => unknown,
    errorMessage: string,
    dispatch: AppDispatch,
    userId: number
  ) =>
  async () => {
    try {
      await apiFn();
      await dispatch(ProfileOperations.fetchProfileDataWithoutLoading(userId));
    } catch (e) {
      myToast({
        message: errorMessage,
        severity: 'error',
      });
    }
  };

const UtilityButtons = ({ userData }: Props) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectAuthUser);
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const buttonList: Array<UtilityButtonInterface> = [];

  if (userData.id !== currentUser.id) {
    buttonList.push({
      title: t('profile.sendMessage'),
      icon: CreateIcon,
      onClick: () => navigate(`/chat/${userData.id}`),
    });

    if (userData.is_following) {
      buttonList.push({
        title: t('friends.unfollow'),
        icon: PersonRemove,
        onClick: followFunction(
          () =>
            API.user.friends.removeFriend({
              currentUserId: currentUser.id,
              otherPersonId: userData.id,
            }),
          t('error.tryAgainLater'),
          dispatch,
          userData.id
        ),
        color: 'error',
      });
    } else {
      buttonList.push({
        title: t('friends.follow'),
        icon: PersonAdd,
        onClick: followFunction(
          () =>
            API.user.friends.addFriend({
              currentUserId: currentUser.id,
              otherPersonId: userData.id,
            }),
          t('error.tryAgainLater'),
          dispatch,
          userData.id
        ),
        color: 'success',
      });
    }
  }

  if (userData.id === currentUser.id) {
    buttonList.push({
      title: t('action.profileEdit'),
      icon: SettingsIcon,
      onClick: () => navigate(`/profile_edit`),
    });
  }

  return (
    <Stack direction={'column'} alignItems={'stretch'}>
      {userData.id === currentUser.id && (
        <ListItem key={-1}>
          <PostCreateModal />
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
};

export default UtilityButtons;
