import { expect, test, describe } from '@jest/globals';
import { initialState, getFeeds, feedsReducer } from './feedsSlice';

describe('Тесты feedsSlice', () => {
  const feeds = {
    success: true,
    orders: [
      {
        _id: '6614ef6a97ede0001d064d9a',
        ingredients: [
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0945'
        ],
        status: 'done',
        name: 'Антарианский space метеоритный бургер',
        createdAt: '2024-04-09T07:34:02.671Z',
        updatedAt: '2024-04-09T07:34:02.671Z',
        number: 37851
      },
      {
        _id: '66146aad97ede0001d064d30',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2024-04-08T22:07:41.435Z',
        updatedAt: '2024-04-08T22:07:41.435Z',
        number: 37850
      }
    ],
    total: 37477,
    totalToday: 25
  };

  test('Тест успешного выполнения запроса (fulfilled)', () => {
    const fulfilledState = {
      ...initialState,
      orders: feeds.orders,
      total: feeds.total,
      todayTotal: feeds.totalToday
    };

    const action = {
      type: getFeeds.fulfilled.type,
      payload: feeds
    };
    const newState = feedsReducer(initialState, action);

    expect(newState).toEqual(fulfilledState);
  });
});
