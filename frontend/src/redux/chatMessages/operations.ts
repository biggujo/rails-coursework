import { createAsyncThunk } from '@reduxjs/toolkit';
import API, { FetchPreviousMessagesResponse } from '../../utils/api.ts';
import { AxiosError } from 'axios';

const fetchPrevious = createAsyncThunk(
  'chatMessages/fetchPrevious',
  async (
    {
      chatId,
      page,
      offset,
    }: { chatId: number; page?: number; offset?: number },
    { rejectWithValue }
  ): Promise<FetchPreviousMessagesResponse | string> => {
    try {
      return await API.messages.fetchPrevious({ chatId, page, offset });
    } catch (e) {
      return rejectWithValue(
        (e as AxiosError).response!.data
      ) as unknown as string;
    }
  }
);

const test = createAsyncThunk('werwer', async () => {
  console.log('Thunk');
});

const ChatMessagesOperations = {
  fetchPrevious,
  test,
};

export default ChatMessagesOperations;
