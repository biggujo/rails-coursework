import { GroupEntity } from '../../interfaces';
import { Stack } from '@mui/material';
import createSubtitle from '../../utils/create-subtitle.tsx';
import MainGroupData from './MainGroupDate.tsx';
import UserProfileCard from '../UserProfileCard/UserProfileCard.tsx';
import MembersData from './MembersData.tsx';
import UtilityButtons from './UtilityButtons.tsx';

interface Props {
  groupData: GroupEntity;
}

export default function GroupProfile({ groupData }: Props) {
  return (
    <Stack
      alignItems={'start'}
      direction={'row'}
      justifyContent={'space-between'}
    >
      <Stack direction={'column'}>
        {createSubtitle('Main information')}
        <MainGroupData groupData={groupData} />
        {createSubtitle('Group creator')}
        <UserProfileCard data={groupData.user} />
        {createSubtitle('Stats')}
        <MembersData groupData={groupData} />
      </Stack>
      <UtilityButtons groupData={groupData} />
    </Stack>
  );
}
