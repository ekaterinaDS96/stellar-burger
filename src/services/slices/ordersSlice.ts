import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '../../utils/burger-api';

type TOrders = {
  orders: TOrder[];
};

export const initialState: TOrders = {
  orders: []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getAllOrders: (state) => state
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const getOrders = createAsyncThunk('orders/get', async () => {
  const res = await getOrdersApi();
  return res;
});

export const ordersReducer = ordersSlice.reducer;
export const { getAllOrders } = ordersSlice.selectors;
