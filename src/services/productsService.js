import apiClient, { performRequest, withAuthHeaders } from "./apiClient";

export const fetchProducts = async () =>
  performRequest("fetch products", () => apiClient.get("/products"));

export const fetchProductsByCategory = async (category) =>
  performRequest("fetch products by category", () =>
    apiClient.get(`/products`, {
      params: { category },
    })
  );

export const fetchSingleProduct = async (id) =>
  performRequest("fetch product", () => apiClient.get(`/products/${id}`));

export const createProduct = async (product) =>
  performRequest("create product", () =>
    apiClient.post(`/products`, product, withAuthHeaders())
  );

export const updateProduct = async (product) =>
  performRequest("update product", () =>
    apiClient.put(`/products/${product.id}`, product, withAuthHeaders())
  );

export const deleteProduct = async (productId) =>
  performRequest("delete product", () =>
    apiClient.delete(`/products/${productId}`, withAuthHeaders())
  );

export const fetchWishlist = async (userId) =>
  performRequest("fetch wishlist", () =>
    apiClient.get(`/wishlist/${userId}`, withAuthHeaders())
  );

export const addWishlistItem = async (data) =>
  performRequest("add wishlist item", () =>
    apiClient.post(`/wishlist`, data, withAuthHeaders())
  );

export const removeWishlistItem = async (id) =>
  performRequest("remove wishlist item", () =>
    apiClient.delete(`/wishlist/${id}`, withAuthHeaders())
  );
