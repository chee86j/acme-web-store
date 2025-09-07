import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { useSelector } from "react-redux"

const initialState = {
  users: [],
  user: {},
}

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.get("/api/users", {
      headers: {
        authorization: token,
      },
    })
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const fetchUser = createAsyncThunk("fetchUser", async (id) => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.get(`/api/users/${id}`, {
      headers: {
        authorization: token,
      },
    })
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const updateUser = createAsyncThunk("updateUser", async (updateData) => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.put(`/api/users/${updateData.id}`, {data: updateData.data},{
      headers: {
        authorization: token,
      },
    })
    return response.data
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
