import apiClient, { performRequest, withAuthHeaders } from "./apiClient";

export const fetchOrders = async () =>
  performRequest("fetch orders", () =>
    apiClient.get("/orders/all", withAuthHeaders())
  );

export const fetchOrder = async (id) =>
  performRequest("fetch order", () =>
    apiClient.get(`/orders/${id}`, withAuthHeaders())
  );
