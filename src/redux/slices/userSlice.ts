import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchUser, searchUsers} from '../../service/repository/userRepository';
import {UserState} from '../types/userTypes';

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (query: string) => {
    const users = await searchUsers(query);
    return users;
  },
);

export const fetchSingleUser = createAsyncThunk(
  'user/fetchSingleUser',
  async (username: string, {rejectWithValue}) => {
    try {
      const user = await fetchUser(username);
      return user;
     
    } catch (err: any) {
      return rejectWithValue(err.message || 'Unknown error occurred');
    }
  },
);

const initialState: UserState = {
  users: [],
  selectedUser: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUsers: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.error = '';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(fetchSingleUser.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedUser = action.payload;
        state.error = '';
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {resetUsers} = userSlice.actions;

export default userSlice.reducer;
