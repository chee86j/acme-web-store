import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchOrder as fetchOrderRequest, fetchOrders as fetchOrdersRequest } from "../services/ordersService"

const initialState = {
    order: {},
    orders: Array(0),
}

export const fetchOrders = createAsyncThunk("fetchOrders", async () => {
    try {
        return await fetchOrdersRequest()
    } catch (err) {
        console.log(err)
    }
})

export const fetchOrder = createAsyncThunk("fetchOrder", async (id) => {
    try {
        return await fetchOrderRequest(id)
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
