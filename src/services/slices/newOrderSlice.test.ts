import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  createNewBurgerOrder,
  newOrderReducer
} from './newOrderSlice';

describe('Тесты newOrderSlice', () => {
  const newOrder = {
    success: true,
    name: 'Флюоресцентный люминесцентный био-марсианский бургер',
    order: {
      ingredients: [
        {
          calories: 420,
          carbohydrates: 53,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          mage_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
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
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          name: 'Биокотлета из марсианской Магнолии',
          price: 424,
          proteins: 420,
          type: 'main',
          __v: 0,
          _id: '643d69a5c3f7b9001cfa0941'
        },
        {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          name: 'Филе Люминесцентного тетраодонтимформа',
          price: 988,
          proteins: 44,
          type: 'main',
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093e'
        },
        {
          calories: 14,
          carbohydrates: 11,
          fat: 22,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          name: 'Соус фирменный Space Sauce',
          price: 80,
          proteins: 50,
          type: 'sauce',
          __v: 0,
          _id: '643d69a5c3f7b9001cfa0943'
        }
      ],
      _id: '6612dfa097ede0001d064b2',
      owner: '660f086597ede0001d064537',
      status: 'done',
      createdAt: '2024-04-07T18:02:08.859Z',
      updatedAt: '2024-04-07T18:02:08.859Z',
      number: 37820,
      price: 4376
    }
  };

  const getNewState = (action: { type: string; payload?: {} }) =>
    newOrderReducer(initialState, action);

  test('Тест начала запроса (pending)', () => {
    const pendingState = {
      ...initialState,
      orderRequest: true
    };

    const action = {
      type: createNewBurgerOrder.pending.type,
      payload: newOrder
    };

    expect(getNewState(action)).toEqual(pendingState);
  });
  test('Тест ошибки запроса (rejected)', () => {
    const errorMessage = {
      message: '400 (Bad request)'
    };

    const rejectedState = {
      ...initialState,
      orderRequest: false
    };

    const action = {
      type: createNewBurgerOrder.rejected.type,
      error: errorMessage
    };

    expect(getNewState(action)).toEqual(rejectedState);
  });
  test('Тест успешного выполнения запроса (fulfilled)', () => {
    const fulfilledState = {
      ...initialState,
      orderRequest: false,
      order: newOrder.order,
      name: newOrder.name
    };

    const action = {
      type: createNewBurgerOrder.fulfilled.type,
      payload: newOrder
    };

    expect(getNewState(action)).toEqual(fulfilledState);
  });
});
