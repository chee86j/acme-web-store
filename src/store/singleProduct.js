import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {}

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    // rejectWithValue added to handle rejected case and return err val
    try {
      // this way the fetchSingleProduct.fulfilled case can handle both successful & rejected responses
      const response = await axios.get(`/api/products/${id}`)
      return response.data
    } catch (error) {
      // Return the error using rejectWithValue
      return rejectWithValue(error)
    }
  }
)

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    })
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      // handle the rejected case and set the state
      state.error = "Error occured while fetching the product";
    })
  },
})

export default singleProductSlice.reducer
