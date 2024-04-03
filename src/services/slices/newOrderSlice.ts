import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '../../utils/burger-api';

type TNewOrderState = {
  order: TOrder | null;
  name: string;
  orderRequest: boolean;
};

export const initialState: TNewOrderState = {
  order: null,
  name: '',
  orderRequest: false
};

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  selectors: {
    getNewOrderState: (state) => state
  },
  reducers: {
    clearOrder: (state) => (state = initialState)
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewBurgerOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createNewBurgerOrder.rejected, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(createNewBurgerOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
        state.name = action.payload.name;
      });
  }
});

export const createNewBurgerOrder = createAsyncThunk(
  'newOrder/create',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

export const newOrderReducer = newOrderSlice.reducer;
export const { clearOrder } = newOrderSlice.actions;
export const { getNewOrderState } = newOrderSlice.selectors;
