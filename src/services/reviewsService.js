import apiClient, { performRequest, withAuthHeaders } from "./apiClient";

export const fetchReviews = async () =>
  performRequest("fetch reviews", () => apiClient.get("/reviews"));

export const fetchReviewsByProduct = async (id) =>
  performRequest("fetch reviews by product", () => apiClient.get(`/reviews/${id}`));

export const createReview = async (review) =>
  performRequest("create review", () =>
    apiClient.post("/reviews", review, withAuthHeaders())
  );

export const deleteReview = async (id) =>
  performRequest("delete review", () =>
    apiClient.delete(`/reviews/${id}`, withAuthHeaders())
  );

export const updateReview = async (review) =>
  performRequest("update review", () =>
    apiClient.put(`/reviews/${review.id}`, review, withAuthHeaders())
  );
