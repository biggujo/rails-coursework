import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import usePostsFiltersForm from '../../hooks/forms/usePostsFiltersForm.ts';
import { FormikProvider } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import DateFormatter from '../../utils/date-formatter.ts';
import { addDays } from 'date-fns';
import { useTranslation } from 'react-i18next';

export default function PostsFiltersForm() {
  const formik = usePostsFiltersForm();
  const { t } = useTranslation();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormikProvider value={formik}>
        <Stack
          component={'form'}
          onSubmit={event => {
            event.preventDefault();

            formik.submitForm();
          }}
          gap={2}
        >
          <Stack direction={'row'} alignItems={'center'} gap={1.5}>
            <TextField
              label={t('form.content')}
              {...formik.getFieldProps('content')}
              size={'small'}
            />
            <DatePicker
              label={t('form.startDate')}
              slotProps={{
                textField: {
                  size: 'small',
                },
              }}
              onChange={value =>
                formik.setFieldValue(
                  'start_date',
                  DateFormatter.formatForSend(value!)
                )
              }
            />

            <DatePicker
              label={t('form.endDate')}
              slotProps={{
                textField: {
                  size: 'small',
                },
              }}
              onChange={value =>
                formik.setFieldValue(
                  'end_date',
                  DateFormatter.formatForSend(addDays(value!, 1))
                )
              }
            />
          </Stack>

          <Stack direction={'row'} alignItems={'center'} gap={1.5}>
            <FormControl
              size={'small'}
              sx={{
                width: '195px',
              }}
            >
              <InputLabel id="sort-by-date">{t('form.dateSort')}</InputLabel>
              <Select
                labelId="sort-by-date"
                defaultValue={'desc'}
                value={formik.values.sort_date}
                onChange={event => {
                  formik.setFieldValue('sort_date', event.target.value);
                  formik.setFieldValue('sort_activity', '');
                }}
              >
                <MenuItem value={'desc'}>{t('form.descending')}</MenuItem>
                <MenuItem value={'asc'}>{t('form.ascending')}</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              size={'small'}
              sx={{
                width: '230px',
              }}
            >
              <InputLabel id="sort-by-popularity">
                {t('form.popularitySort')}
              </InputLabel>
              <Select
                labelId="sort-by-popularity"
                value={formik.values.sort_activity}
                onChange={event => {
                  formik.setFieldValue('sort_date', '');
                  formik.setFieldValue('sort_activity', event.target.value);
                }}
              >
                <MenuItem value={'desc'}>{t('form.descending')}</MenuItem>
                <MenuItem value={'asc'}>{t('form.ascending')}</MenuItem>
              </Select>
            </FormControl>

            <Button
              type={'submit'}
              variant={'contained'}
              isSubmitting={formik.isSubmitting}
              sx={{
                width: '120px',
              }}
            >
              {t('form.submit')}
            </Button>
            <Button
              variant={'outlined'}
              onClick={() => {
                formik.resetForm({
                  values: formik.initialValues,
                });

                formik.dirty && formik.submitForm();
              }}
              sx={{
                width: '100px',
              }}
            >
              {t('form.clear')}
            </Button>
          </Stack>
        </Stack>
      </FormikProvider>
    </LocalizationProvider>
  );
}
