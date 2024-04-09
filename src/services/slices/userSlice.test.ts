import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  userReducer,
  register,
  login,
  logout,
  update,
  getUser
} from './userSlice';

describe('Тесты userSlice', () => {
  const responseData = {
    success: true,
    user: {
      email: 'iLoveYou3000@avengers.com',
      name: 'Tony Stark'
    }
  };

  const updateData = {
    success: true,
    user: {
      email: 'vamos@tennis.es',
      name: 'Rafa Nadal'
    }
  };

  const fulfilledState = {
    ...initialState,
    isAuthChecked: true,
    error: null,
    user: {
      email: 'iLoveYou3000@avengers.com',
      name: 'Tony Stark'
    }
  };

  const errorMessage = {
    message: '400 (Bad request)'
  };

  const getNewState = (action: { type: string; payload?: {} }) =>
    userReducer(initialState, action);

  describe('Тесты регистрации пользователя', () => {
    test('Тест начала запроса (pending)', () => {
      const pendingState = {
        ...initialState,
        error: null
      };

      const action = {
        type: register.pending.type,
        payload: responseData
      };

      expect(getNewState(action)).toEqual(pendingState);
    });

    test('Тест ошибки запроса (rejected)', () => {
      const rejectedState = {
        ...initialState,
        error: '400 (Bad request)'
      };
      const action = {
        type: register.rejected.type,
        error: errorMessage
      };

      expect(getNewState(action)).toEqual(rejectedState);
    });

    test('Тест успешного выполнения запроса (fulfilled)', () => {
      const fulfilledState = {
        ...initialState,
        isAuthChecked: true,
        error: null,
        user: {
          email: 'iLoveYou3000@avengers.com',
          name: 'Tony Stark'
        }
      };

      const action = {
        type: register.fulfilled.type,
        payload: responseData
      };

      expect(getNewState(action)).toEqual(fulfilledState);
    });
  });

  describe('Тесты входа пользователя', () => {
    test('Тест начала запроса (pending)', () => {
      const pendingState = {
        ...initialState,
        isAuthChecked: false,
        error: null
      };

      const action = {
        type: login.pending.type,
        payload: responseData
      };

      expect(getNewState(action)).toEqual(pendingState);
    });

    test('Тест ошибки запроса (rejected)', () => {
      const rejectedState = {
        ...initialState,
        isAuthChecked: false,
        error: '400 (Bad request)'
      };
      const action = {
        type: login.rejected.type,
        error: errorMessage
      };

      expect(getNewState(action)).toEqual(rejectedState);
    });

    test('Тест успешного выполнения запроса (fulfilled)', () => {
      const action = {
        type: login.fulfilled.type,
        payload: responseData
      };

      expect(getNewState(action)).toEqual(fulfilledState);
    });
  });

  describe('Тесты выхода пользователя', () => {
    test('Тест успешного выполнения запроса (fulfilled)', () => {
      const action = {
        type: logout.fulfilled.type,
        payload: undefined
      };

      expect(getNewState(action)).toEqual(initialState);
    });
  });

  describe('Тест обновления данных пользователя', () => {
    test('Тест начала запроса (pending)', () => {
      const pendingState = {
        ...initialState,
        error: null
      };

      const action = {
        type: update.pending.type,
        payload: updateData
      };

      expect(getNewState(action)).toEqual(pendingState);
    });

    test('Тест ошибки запроса (rejected)', () => {
      const rejectedState = {
        ...initialState,
        isAuthChecked: false,
        error: '400 (Bad request)'
      };
      const action = {
        type: update.rejected.type,
        error: errorMessage
      };

      expect(getNewState(action)).toEqual(rejectedState);
    });

    test('Тест успешного выполнения запроса (fulfilled)', () => {
      const fulfilledState = {
        ...initialState,
        isAuthChecked: true,
        error: null,
        user: {
          email: 'vamos@tennis.es',
          name: 'Rafa Nadal'
        }
      };

      const action = {
        type: update.fulfilled.type,
        payload: updateData
      };

      expect(getNewState(action)).toEqual(fulfilledState);
    });
  });

  describe('Тесты получения пользователя', () => {
    test('Тест начала запроса (pending)', () => {
      const pendingState = {
        ...initialState,
        error: null
      };

      const action = {
        type: getUser.pending.type,
        payload: responseData
      };

      expect(getNewState(action)).toEqual(pendingState);
    });

    test('Тест ошибки запроса (rejected)', () => {
      const rejectedState = {
        ...initialState,
        isAuthChecked: false,
        error: '400 (Bad request)'
      };
      const action = {
        type: getUser.rejected.type,
        error: errorMessage
      };

      expect(getNewState(action)).toEqual(rejectedState);
    });

    test('Тест успешного выполнения запроса (fulfilled)', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: responseData
      };

      expect(getNewState(action)).toEqual(fulfilledState);
    });
  });
});
