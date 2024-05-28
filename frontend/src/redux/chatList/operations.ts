import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.ts';
import { AxiosError } from 'axios';

const fetchAll = createAsyncThunk(
  'chatList/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await API.chats.fetchAll();
    } catch (e) {
      return rejectWithValue(
        (e as AxiosError).response!.data
      ) as unknown as string;
    }
  }
);

const ChatOperations = {
  fetchAll,
};

export default ChatOperations;
