import {githubApi} from '../githubApi';

export const fetchUser = async (username: string) => {
  const response = await githubApi.get(`/users/${username}`);
  return response.data;
};

export const searchUsers = async (query: string) => {
  const response = await githubApi.get(`/search/users?q=${query}`);
  return response.data.items;
};
