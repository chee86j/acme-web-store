import apiClient, { performRequest, withAuthHeaders } from "./apiClient";

export const fetchUsers = async () =>
  performRequest("fetch users", () =>
    apiClient.get("/users", withAuthHeaders())
  );

export const fetchUser = async (id) =>
  performRequest("fetch user", () =>
    apiClient.get(`/users/${id}`, withAuthHeaders())
  );

export const updateUser = async (updateData) =>
  performRequest("update user", () =>
    apiClient.put(
      `/users/${updateData.id}`,
      { data: updateData.data },
      withAuthHeaders()
    )
  );
