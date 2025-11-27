import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  fetchUser as fetchUserRequest,
  fetchUsers as fetchUsersRequest,
  updateUser as updateUserRequest,
} from "../services/usersService"

const initialState = {
  users: [],
  user: {},
}

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  try {
    return await fetchUsersRequest()
  } catch (err) {
    console.log(err)
  }
})

export const fetchUser = createAsyncThunk("fetchUser", async (id) => {
  try {
    return await fetchUserRequest(id)
  } catch (err) {
    console.log(err)
  }
})

export const updateUser = createAsyncThunk("updateUser", async (updateData) => {
  try {
    return await updateUserRequest(updateData)
  } catch (error) {
    if (error.response.status === 403) {
      window.alert(error.response.data)
    } else {
      console.log(error)
    }
  }
})

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    builder.addCase(updateUser.fulfilled, (state,action) =>{
      state.user = action.payload;
    })
  },
})

export default usersSlice.reducer
