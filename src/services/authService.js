import apiClient, { performRequest, withAuthHeaders } from "./apiClient";

export const fetchSession = async () =>
  performRequest("fetch session", () =>
    apiClient.get("/auth/me", withAuthHeaders())
  );

export const authenticate = async (cred) => {
  try {
    const authData = await performRequest("authenticate", () =>
      apiClient.post("/auth", cred)
    );
    const token = authData.token;
    window.localStorage.setItem("token", token);

    return await performRequest("fetch session", () =>
      apiClient.get("/auth/me", { headers: { authorization: token } })
    );
  } catch (error) {
    window.localStorage.removeItem("token");
    throw error;
  }
};
