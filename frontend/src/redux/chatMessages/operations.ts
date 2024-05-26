import { createAsyncThunk } from '@reduxjs/toolkit';
import API, { FetchPreviousMessagesResponse } from '../../utils/api.ts';
import { AxiosError } from 'axios';

const fetchPreviousFunction = async (
  { chatId, page, offset }: { chatId: number; page?: number; offset?: number },
  // @ts-expect-error Because the inner typing is crazy
  { rejectWithValue }
): Promise<FetchPreviousMessagesResponse | string> => {
  try {
    return await API.messages.fetchPrevious({ chatId, page, offset });
  } catch (e) {
    return rejectWithValue(
      (e as AxiosError).response!.data
    ) as unknown as string;
  }
};

const fetchPrevious = createAsyncThunk(
  'chatMessages/fetchPrevious',
  fetchPreviousFunction
);

// A duplicate is made to add a possibility not to touch "isLoading" state in extraReducers
const fetchPreviousWithoutLoading = createAsyncThunk(
  'chatMessages/fetchPreviousWOLoading',
  fetchPreviousFunction
);

const ChatMessagesOperations = {
  fetchPrevious,
  fetchPreviousWithoutLoading,
};

export default ChatMessagesOperations;
