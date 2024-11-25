import {githubApi} from '../githubApi';

export const fetchUserRepos = async (username: string) => {
  const response = await githubApi.get(`users/${username}/repos`);
  return response.data;
};

