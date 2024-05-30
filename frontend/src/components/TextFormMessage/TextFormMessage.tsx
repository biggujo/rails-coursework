import { Button, Grid, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useTextMessageForm from '../../hooks/forms/useTextMessageForm.ts';
import { FormikProvider } from 'formik';

interface Props {
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export default function TextFormMessage({ onSubmit }: Props) {
  const { formik, maxLength } = useTextMessageForm(onSubmit);

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={event => {
          event.preventDefault();
          formik.submitForm();
        }}
      >
        <Grid container alignItems={'flex-end'} spacing={2}>
          <Grid item flexGrow={1}>
            <TextField
              {...formik.getFieldProps('message')}
              label={'Message'}
              autoComplete={'off'}
              variant={'standard'}
              inputProps={{
                maxLength,
              }}
              fullWidth
            />
          </Grid>
          <Grid
            item
            sx={{
              height: '100%',
              width: '80px',
            }}
          >
            <Grid container justifyContent={'center'}>
              <Grid item>
                <Typography
                  color={
                    formik.values.message.length === maxLength ? 'red' : 'black'
                  }
                  sx={{
                    mb: 0.75,
                  }}
                >
                  {formik.values.message.length}/{maxLength}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant={'contained'}
              type={'submit'}
              endIcon={<SendIcon />}
            >
              Send message
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormikProvider>
  );
}
