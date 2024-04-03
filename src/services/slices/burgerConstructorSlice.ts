import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../utils/types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getBurgerConstructor: (state) => state
  },
  reducers: {
    addConstructorItem: (state, action) => {
      const type = action.payload.type;

      if (type === 'bun') {
        state.bun = action.payload;
      } else if (type === 'main' || type === 'sauce') {
        state.ingredients.push(action.payload);
      }
    },
    moveConstructorItem: (state, action) => {
      const index = action.payload.index;
      const move = action.payload.move;

      if (move === 'up') {
        [state.ingredients[index], state.ingredients[index - 1]] = [
          state.ingredients[index - 1],
          state.ingredients[index]
        ];
      } else if (move === 'down') {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },
    removeConstructorItem: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (el) => el.id !== action.payload
      );
    },
    clearConstructor: (state) => (state = initialState)
  }
});

export const constructorReducer = burgerConstructorSlice.reducer;
export const { getBurgerConstructor } = burgerConstructorSlice.selectors;
export const {
  addConstructorItem,
  removeConstructorItem,
  moveConstructorItem,
  clearConstructor
} = burgerConstructorSlice.actions;
