import axios from 'axios';
import ROUTES from '../localization/routes';

export const searchRepositories = async query => {
  const { data } = await axios.get(`${ROUTES.GITHUB_API_PATH}/search/repositories?q=${query}&per_page=5`);
  return data.items;
};
