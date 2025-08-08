import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/test'; // Adjust if backend runs elsewhere

/**
 * Delete a test by ID (admin only).
 * @param {string|number} testId - The ID of the test to delete
 * @returns {Promise<AxiosResponse>} Axios response
 */
export const deleteTest = async (testId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No auth token');
    return axios.delete(`${API_BASE_URL}/${testId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};


// Add this function to src/api/testApi.js
export const hasUserAttemptedTest = async (testId, userId) => {
  const token = localStorage.getItem('token');
  return axios.get(`http://localhost:8080/api/test/attempted/${testId}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


/**
 * Fetch all tests for the authenticated user.
 * @param {string} token - JWT token for authentication
 * @returns {Promise<AxiosResponse>} Axios response containing the list of tests
 */
export const getAllTests = async(token) => {
    return axios.get(API_BASE_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

/**
 * Fetch all test results for the authenticated user.
 * @param {string} token - JWT token for authentication
 * @returns {Promise<AxiosResponse>} Axios response containing the list of test results
 */
// export const getAllTestResults = async (token) => {
//   return axios.get(${API_BASE_URL}//test-result/{id}, {
//     headers: {
//       Authorization: Bearer ${token},
//     },
//   });
// };

export const getAllTestResults = async(token, id) => {
    return axios.get(`${API_BASE_URL}/test-result/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};