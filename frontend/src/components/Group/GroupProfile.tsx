import { GroupEntity } from '../../interfaces';
import { Stack } from '@mui/material';
import createSubtitle from '../../utils/create-subtitle.tsx';
import MainGroupData from './MainGroupData.tsx';
import UserProfileCard from '../UserProfileCard/UserProfileCard.tsx';
import MembersData from './MembersData.tsx';
import UtilityButtons from './UtilityButtons.tsx';
import { useTranslation } from 'react-i18next';

interface Props {
  groupData: GroupEntity;
}

export default function GroupProfile({ groupData }: Props) {
  const { t } = useTranslation();

  return (
    <Stack
      alignItems={'start'}
      direction={'row'}
      justifyContent={'space-between'}
    >
      <Stack direction={'column'}>
        {createSubtitle(t('group.mainInformation'))}
        <MainGroupData groupData={groupData} />
        {createSubtitle(t('group.groupCreator'))}
        <UserProfileCard data={groupData.user} />
        {createSubtitle(t('group.stats'))}
        <MembersData groupData={groupData} />
      </Stack>
      <UtilityButtons groupData={groupData} />
    </Stack>
  );
}
