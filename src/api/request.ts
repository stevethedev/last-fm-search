import axios from 'axios';

// Not a good way to store this, but this isn't a production application.
const API_KEY = 'ac4197870e456b0d4b6fddc5c77e8b3f';

// Root URL for the API.
const API_URL = 'http://ws.audioscrobbler.com/2.0/';

const joinToString = (parameters: ApiParameters): string => Object.keys(parameters).map((name) => `${name}=${parameters[name]}`).join('&');

interface ApiParameters {
  method: string;

  [key: string]: string;
}

/**
 * Execute an anonymous search against the API
 */
export const httpGet = async (params: ApiParameters): Promise<unknown | null> => {
  const parameters: ApiParameters = {
    ...params,
    api_key: API_KEY,
    format: 'json',
    limit: `${params.limit ?? 10}`,
    page: `${params.page ?? 1}`,
  };

  const response = await axios.get(`${API_URL}?${joinToString(parameters)}`, { responseType: 'json' });

  return response?.data ?? null;
};
