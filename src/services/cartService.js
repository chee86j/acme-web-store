import apiClient, { performRequest, withAuthHeaders } from "./apiClient";

export const fetchUserCart = async () =>
  performRequest("fetch user cart", () =>
    apiClient.get("/cart", withAuthHeaders())
  );

export const addToCart = async (payload) =>
  performRequest("add to cart", () =>
    apiClient.post("/cart", payload, withAuthHeaders())
  );

export const updateCartQuantity = async (payload) =>
  performRequest("update cart quantity", () =>
    apiClient.put("/cart/update", payload, withAuthHeaders())
  );

export const removeFromCart = async (payload) =>
  performRequest("remove from cart", () =>
    apiClient.put("/cart", payload, withAuthHeaders())
  );
