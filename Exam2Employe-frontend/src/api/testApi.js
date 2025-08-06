
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/test'; // Adjust if backend runs elsewhere

/**
 * Fetch all tests for the authenticated user.
 * @param {string} token - JWT token for authentication
 * @returns {Promise<AxiosResponse>} Axios response containing the list of tests
 */
export const getAllTests = async (token) => {
  return axios.get(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
