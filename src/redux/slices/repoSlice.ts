import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchUserRepos} from '../../service/repository/repoRepository';
import { RepoState } from '../types/repoTypes';


export const fetchRepos = createAsyncThunk(
  'repo/fetchRepos',
  async (username: string) => {
    const users = await fetchUserRepos(username);
    return users;
  },
);

const initialState: RepoState = {
  repos: [],
  selectedRepo: null,
  status: 'idle',
  error: null,
};

const repoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRepos.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.repos = action.payload;
        state.error = '';
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default repoSlice.reducer;
