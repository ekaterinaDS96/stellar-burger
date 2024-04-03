import { getCookie } from '../../utils/cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  getUserApi
} from '../../utils/burger-api';
import { TUser } from '@utils-types';

type TUserState = {
  isAuthChecked: boolean;
  user: TUser;
  error: string | null;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: null
};

const UserSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  selectors: {
    getUserState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.user = action.payload.user;
      });
    builder
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.user = action.payload.user;
      });
    builder.addCase(logout.fulfilled, (state) => (state = initialState));
    builder
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.user = action.payload.user;
      });
    builder
      .addCase(update.pending, (state) => {
        state.error = null;
      })
      .addCase(update.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.user = action.payload.user;
      });
  }
});

export const getUser = createAsyncThunk('user/get', getUserApi);
export const register = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk('user/login', loginUserApi);
export const update = createAsyncThunk('user/update', updateUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
  }
);

export const userReducer = UserSlice.reducer;
export const { getUserState } = UserSlice.selectors;
