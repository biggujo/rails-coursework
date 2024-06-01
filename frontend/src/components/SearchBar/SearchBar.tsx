import {
  Box,
  Divider,
  InputAdornment,
  ListItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import useSearchGroupsAndUsersMutation from '../../hooks/mutation/useSearchGroupsAndUsersMutation.ts';
import createSmallSubtitle from '../../utils/create-small-subtitle.tsx';
import Loader from '../Loader';
import UserProfileCard from '../UserProfileCard/UserProfileCard.tsx';
import GroupCard from '../GroupItemCard';
import UserEntity from '../../interfaces/UserEntity.interface.ts';
import { GroupEntity } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  const { data, isPending, isSuccess, isError, mutateAsync, reset } =
    useSearchGroupsAndUsersMutation();

  const shouldShowResults = isFocused && value.trim().length > 0;

  useEffect(() => {
    if (!isFocused) {
      reset();
      return;
    }

    mutateAsync(value);
    // eslint-disable-next-line
  }, [value]);

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <TextField
        value={value}
        onChange={event => setValue(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        autoComplete={'off'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        placeholder={t('form.namePlaceholder')}
        size={'small'}
        sx={{
          bgcolor: 'primary.contrastText',
          borderRadius: 1,
          width: isFocused ? '500px' : '200px',
        }}
      />
      {shouldShowResults && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '-430px',
            px: '2rem',
            bgcolor: '#ffffff',
            color: '#000000',
            border: `1px solid ${theme.palette.primary.main}`,
            width: '100%',
            height: '400px',
            overflowY: 'scroll',
            zIndex: 3,
          }}
        >
          {createSmallSubtitle('Search results')}
          {isPending && (
            <Box height={'180px'} width={'100%'}>
              <Loader />
            </Box>
          )}
          {isError && <Typography>{t('error.tryAgainLater')}</Typography>}
          {isSuccess && data.length === 0 && (
            <Typography>{t('search.noResultsAvailable')}</Typography>
          )}
          {isSuccess && data.length > 0 && (
            <Stack>
              {data.map((item, index) => (
                <ListItem
                  key={item.id}
                  sx={{
                    m: 0,
                    p: 0,
                  }}
                  onClick={() => {
                    let createNavigatePath;

                    switch (item.type) {
                      case 'user':
                        createNavigatePath = (id: number) => `/profile/${id}`;
                        break;
                      case 'group':
                        createNavigatePath = (id: number) => `/group/${id}`;
                        break;
                      default:
                        createNavigatePath = () => ``;
                    }

                    navigate(createNavigatePath(item.id));
                  }}
                >
                  {index > 0 && (
                    <Divider
                      sx={{
                        mb: 1,
                      }}
                    />
                  )}
                  {item.type === 'user' && (
                    <UserProfileCard data={item.attributes as UserEntity} />
                  )}
                  {item.type === 'group' && (
                    <GroupCard data={item.attributes as GroupEntity} />
                  )}
                </ListItem>
              ))}
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}
