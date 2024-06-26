import BasicModal from '../BasicModal';
import useFetchUserListQuery from '../../hooks/query/useFetchUserListQuery.ts';
import { Box, Typography } from '@mui/material';
import { ReactElement, useEffect } from 'react';
import UserEntity from '../../interfaces/UserEntity.interface.ts';
import createSubtitle from '../../utils/create-subtitle.tsx';
import Loader from '../Loader';
import UserProfileList from '../UserProfileList/UserProfileList.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  toggler: ReactElement;
  apiFn: () => Promise<Array<UserEntity>>;
}

export default function FetchUsersModal({ title, toggler, apiFn }: Props) {
  const queryClient = useQueryClient();
  const { refetch, data, isLoading, isSuccess, isError } =
    useFetchUserListQuery(apiFn, false);
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      handleClose();
    };
    // eslint-disable-next-line
  }, []);

  const modalContent = (
    <Box>
      {isError && <Typography>{t('error.tryAgainLater')}</Typography>}
      {createSubtitle(title)}
      <Box height={'400px'}>
        {isLoading && <Loader />}
        {isSuccess && data.length === 0 && (
          <Typography>{t('users.noUsersAvailable')}</Typography>
        )}
        {isSuccess && (
          <UserProfileList items={data} shouldShowCurrentUser={true} />
        )}
      </Box>
    </Box>
  );

  const handleOpen = async () => {
    await refetch();
  };

  const handleClose = () => {
    queryClient.removeQueries({
      queryKey: [apiFn.toString()],
    });
  };

  return (
    <BasicModal
      toggler={toggler}
      modalContent={modalContent}
      onOpen={handleOpen}
      onClose={handleClose}
    />
  );
}
