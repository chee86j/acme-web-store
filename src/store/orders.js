import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    order: {},
    orders: Array(0),
}

export const fetchOrders = createAsyncThunk("fetchOrders", async () => {
    try {
        const token = window.localStorage.getItem("token")
        const response = await axios.get("/api/orders/all", {
            headers: {
                authorization: token,
            },
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const fetchOrder = createAsyncThunk("fetchOrder", async (id) => {
    try {
        const token = window.localStorage.getItem("token")
        const response = await axios.get(`/api/orders/${id}`, {
            headers: {
                authorization: token,
            },
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
})

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        })
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.order = action.payload;
        })
    }
})

export default ordersSlice.reducer
