import { MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { I18N_LANG_KEY } from '../../i18n.ts';

export default function LanguageChanger() {
  const { i18n } = useTranslation();

  return (
    <>
      <Select
        onChange={event => {
          i18n.changeLanguage(event.target.value);
          localStorage.setItem(I18N_LANG_KEY, event.target.value);
        }}
        value={i18n.language}
        size={'small'}
        sx={{
          bgcolor: '#ffffff',
          width: '70px',
        }}
      >
        <MenuItem value={'en'}>EN</MenuItem>
        <MenuItem value={'ua'}>UA</MenuItem>
      </Select>
    </>
  );
}
