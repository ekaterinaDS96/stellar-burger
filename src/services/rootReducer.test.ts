import { expect, test, describe } from '@jest/globals';
import { rootReducer } from './rootReducer';
import { initialState as constructorState } from './slices/burgerConstructorSlice';
import { initialState as ingredientsState } from './slices/ingredientsSlice';
import { initialState as userState } from './slices/userSlice';
import { initialState as newOrderState } from './slices/newOrderSlice';
import { initialState as ordersState } from './slices/ordersSlice';
import { initialState as feedsState } from './slices/feedsSlice';

const initialState = {
  burgerConstructor: constructorState,
  feeds: feedsState,
  ingredients: ingredientsState,
  newOrder: newOrderState,
  orders: ordersState,
  user: userState
};

describe('Тест работы rootReducer', () => {
  test('Тест обработки неизвестного события', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);

    expect(newState).toEqual(initialState);
  });
});
