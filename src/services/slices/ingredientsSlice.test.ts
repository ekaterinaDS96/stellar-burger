import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  ingredientsReducer,
  getAllIngredients
} from './ingredientsSlice';

describe('Тесты ingredientsSlice', () => {
  const mockIngredients = [
    {
      calories: 420,
      carbohydrates: 53,
      fat: 24,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      name: 'Краторная булка N-200i',
      price: 1255,
      proteins: 80,
      type: 'bun',
      __v: 0,
      _id: '643d69a5c3f7b9001cfa093c'
    },
    {
      calories: 4242,
      carbohydrates: 242,
      fat: 142,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      name: 'Биокотлета из марсианской Магнолии',
      price: 424,
      proteins: 420,
      type: 'main',
      __v: 0,
      _id: '643d69a5c3f7b9001cfa0941'
    }
  ];

  test('Тест начала запроса (pending)', () => {
    const pendingState = {
      ...initialState,
      isLoading: true
    };

    const action = {
      type: getAllIngredients.pending.type,
      payload: mockIngredients
    };
    const newState = ingredientsReducer(initialState, action);

    expect(newState).toEqual(pendingState);
  });

  test('Тест ошибки запроса (rejected)', () => {
    const rejectedState = {
      ...initialState,
      isLoading: false
    };

    const action = {
      type: getAllIngredients.rejected.type
    };
    const newState = ingredientsReducer(initialState, action);

    expect(newState).toEqual(rejectedState);
  });

  test('Тест успешного выполнения запроса (fulfilled)', () => {
    const fulfilledState = {
      ...initialState,
      ingredients: mockIngredients,
      buns: [mockIngredients[0]],
      mains: [mockIngredients[1]],
      isLoading: false
    };

    const action = {
      type: getAllIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const newState = ingredientsReducer(initialState, action);

    expect(newState).toEqual(fulfilledState);
  });
});
