import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  cartId: null,
}

export const loginWithToken = createAsyncThunk(
  "loginWithToken",
  async (_, { rejectWithValue }) => {
    const token = window.localStorage.getItem("token")
    if (token) {
      const response = await axios.get("/api/auth/me", {
        headers: {
          authorization: token,
        },
      })
      return response.data
    } else {
      return rejectWithValue()
    }
  }
)

export const attemptLogin = createAsyncThunk(
  "attemptLogin",
  async (cred, { rejectWithValue }) => {
    try {
      let response = await axios.post("/api/auth", cred)
      window.localStorage.setItem("token", response.data.token)
      response = await axios.get("/api/auth/me", {
        headers: {
          authorization: response.data.token,
        },
      })
      return response.data
    } catch (ex) {
      return rejectWithValue(ex.response.data)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      window.localStorage.removeItem("token")
      Object.keys(state).forEach(key => delete state[key]);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginWithToken.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    })
    builder.addCase(attemptLogin.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    })
  },
})

const { logout } = authSlice.actions

export { logout }

export default authSlice.reducer
