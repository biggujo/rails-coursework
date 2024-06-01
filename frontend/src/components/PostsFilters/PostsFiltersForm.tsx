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
import ButtonSubmit from '../ButtonSubmit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import DateFormatter from '../../utils/date-formatter.ts';
import { addDays } from 'date-fns';

export default function PostsFiltersForm() {
  const formik = usePostsFiltersForm();

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
              label={'Content'}
              {...formik.getFieldProps('content')}
              size={'small'}
            />
            <DatePicker
              label="Start date"
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
              label="End date"
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
                width: '150px',
              }}
            >
              <InputLabel id="sort-by-date">Post date sort</InputLabel>
              <Select
                labelId="sort-by-date"
                defaultValue={'desc'}
                value={formik.values.sort_date}
                onChange={event => {
                  formik.setFieldValue('sort_date', event.target.value);
                  formik.setFieldValue('sort_activity', '');
                }}
              >
                <MenuItem value={'desc'}>Descending</MenuItem>
                <MenuItem value={'asc'}>Ascending</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              size={'small'}
              sx={{
                width: '150px',
              }}
            >
              <InputLabel id="sort-by-popularity">Popularity sort</InputLabel>
              <Select
                labelId="sort-by-popularity"
                value={formik.values.sort_activity}
                onChange={event => {
                  formik.setFieldValue('sort_date', '');
                  formik.setFieldValue('sort_activity', event.target.value);
                }}
              >
                <MenuItem value={'desc'}>Descending</MenuItem>
                <MenuItem value={'asc'}>Ascending</MenuItem>
              </Select>
            </FormControl>

            <ButtonSubmit isSubmitting={formik.isSubmitting}>
              Submit
            </ButtonSubmit>
            <Button
              variant={'outlined'}
              onClick={() => {
                formik.resetForm({
                  values: formik.initialValues,
                });

                formik.dirty && formik.submitForm();
              }}
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      </FormikProvider>
    </LocalizationProvider>
  );
}
