import { GetThunkAPI } from '@reduxjs/toolkit';

const ERROR_MESSAGE = 'An error just happened. Please, try again later.';

const thunkErrorWrapper = async (
  param: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (param: any) => Promise<any>,
  thunkAPI: GetThunkAPI<typeof param>
) => {
  try {
    return await fn(param);
  } catch (e) {
    return thunkAPI.rejectWithValue(ERROR_MESSAGE);
  }
};

export default thunkErrorWrapper;
