import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  createReview as createReviewRequest,
  deleteReview as deleteReviewRequest,
  fetchReviews as fetchReviewsRequest,
  fetchReviewsByProduct as fetchReviewsByProductRequest,
  updateReview as updateReviewRequest,
} from "../services/reviewsService"

const initialState = {
  reviews: Array(0),
  review: {},
}

export const fetchReviews = createAsyncThunk("fetchReviews", async () => {
  try {
    return await fetchReviewsRequest()
  } catch (err) {
    console.log(err)
  }
})

export const fetchReview = createAsyncThunk("fetchReview", async (id) => {
  try {
    return await fetchReviewsByProductRequest(id)
  } catch (err) {
    console.log(err)
  }
})

export const createReview = createAsyncThunk("createReview", async (review) => {
  try {
    console.log("REVIEW", review)
    return await createReviewRequest(review)
  } catch (err) {
    console.log(err)
  }
})

export const deleteReview = createAsyncThunk("deleteReview", async (id) => {
  try {
    return await deleteReviewRequest(id)
  } catch (err) {
    console.log(err)
  }
})

export const updateReview = createAsyncThunk("updateReview", async (review) => {
  try {
    return await updateReviewRequest(review)
  } catch (err) {
    console.log(err)
  }
})

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
    })
    builder.addCase(fetchReview.fulfilled, (state, action) => {
      state.review = action.payload;
    })
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.review = action.payload;
      state.reviews.push(action.payload);
    })
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.review = action.payload;
      state.reviews = state.reviews.filter(
        (review) => review.id !== action.payload.id
      );
    })
    builder.addCase(updateReview.fulfilled, (state, action) => {
      state.review = action.payload;
      const index = state.reviews.findIndex(review => review.id === action.payload.id);
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
    })
  },
})

export default reviewsSlice.reducer
