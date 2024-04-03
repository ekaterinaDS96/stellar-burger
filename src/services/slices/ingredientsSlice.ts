import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

type TIngredientsState = {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  isLoading: true
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllIngredients.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        if (action.payload) {
          state.buns = action.payload.filter((ing) => ing.type === 'bun');
          state.mains = action.payload.filter((ing) => ing.type === 'main');
          state.sauces = action.payload.filter((ing) => ing.type === 'sauce');
        }
      });
  }
});

export const getAllIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);

export const ingredientsReducer = ingredientsSlice.reducer;
export const { getIngredients } = ingredientsSlice.selectors;
