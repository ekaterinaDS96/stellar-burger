import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

type TFeeds = {
  orders: TOrder[];
  total: number;
  todayTotal: number;
};

export const initialState: TFeeds = {
  orders: [],
  total: 0,
  todayTotal: 0
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsState: (state) => state
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.todayTotal = action.payload.totalToday;
    });
  }
});

export const getFeeds = createAsyncThunk('feeds/getAll', async () => {
  const res = await getFeedsApi();
  return res;
});

export const feedsReducer = feedsSlice.reducer;
export const { getFeedsState } = feedsSlice.selectors;
