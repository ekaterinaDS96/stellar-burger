import { expect, test, describe } from '@jest/globals';
import { initialState, getOrders, ordersReducer } from './ordersSlice';

describe('Тесты ordersSlice', () => {
  const orders = [
    {
      _id: '6612bb4297ede0001d064aca',
      createdAt: '2024-04-07T15:26:58.017Z',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      name: 'Флюоресцентный люминесцентный бургер',
      number: 37807,
      status: 'done',
      updatedAt: '2024-04-07T15:26:58.506Z'
    },
    {
      _id: '6612bb4297ede0001d064a67',
      createdAt: '2024-04-07T15:28:58.017Z',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      name: 'Флюоресцентный люминесцентный бургер 2',
      number: 37809,
      status: 'done',
      updatedAt: '2024-04-07T15:28:58.506Z'
    }
  ];

  test('Тест успешного выполнения запроса (fulfilled)', () => {
    const fulfilledState = {
      ...initialState,
      orders: orders
    };

    const action = {
      type: getOrders.fulfilled.type,
      payload: orders
    };
    const newState = ordersReducer(initialState, action);

    expect(newState).toEqual(fulfilledState);
  });
});
