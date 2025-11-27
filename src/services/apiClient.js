import axios from "axios";

export const getAuthToken = () => window.localStorage.getItem("token");

export const withAuthHeaders = () => {
  const token = getAuthToken();
  return token
    ? {
        headers: {
          authorization: token,
        },
      }
    : {};
};

export const performRequest = async (description, requestFn) => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to ${description}: ${message}`, { cause: error });
  }
};

const apiClient = axios.create({
  baseURL: "/api",
});

export default apiClient;
