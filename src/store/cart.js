import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"

const initialState = {
  cartItems: [],
}

export const fetchUserCart = createAsyncThunk("fetchUserCart", async () => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.get("/api/cart", {
      headers: {
        authorization: token,
      },
    })
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const fetchGuestCart = createAsyncThunk("fetchGuestCart", async () => {
  let cart = window.localStorage.getItem("cart");
  if(!cart){
    let json = JSON.stringify({ "id": uuidv4(), "userId": null, "cartItems": [] });
    window.localStorage.setItem("cart", json)
    cart = window.localStorage.getItem("cart");
  }
  return JSON.parse(cart)
}) 

export const deleteGuestCart = createAsyncThunk("deleteGuestCart", async () => {
  let json = JSON.stringify({ "id": uuidv4(), "userId": null, "cartItems": [] });
  window.localStorage.setItem("cart", json)
  let cart = window.localStorage.getItem("cart");
  return JSON.parse(cart)
})

export const addToCart = createAsyncThunk("addToCart", async (payload) => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.post("/api/cart", payload, {
      headers: {
        authorization: token
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const updateCartQuantity = createAsyncThunk("updateCartQuantity", async (payload) => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.put("/api/cart/update", payload, {
      headers: {
        authorization: token
      }
    })
    return response.data 
  } catch (error) {
    console.log(error)
  }
})

export const addToGuestCart = createAsyncThunk("addToGuestCart", async (payload) => {
  let cart = window.localStorage.getItem("cart");
  cart = JSON.parse(cart);
  const index = cart.cartItems.findIndex(item => item.product.id === payload.product.id)
  if (index >= 0){
    cart.cartItems[index].quantity += payload.quantity
  }else{
    cart.cartItems.push({
      product: payload.product,
      quantity: payload.quantity,
    })
  }
  window.localStorage.setItem("cart", JSON.stringify(cart))
  return cart;
})

export const updateGuestCartQuantity = createAsyncThunk("updateGuestCartQuantity", async (payload) => {
  try {
    let cart = window.localStorage.getItem("cart")
    cart = JSON.parse(cart)
    const index = cart.cartItems.findIndex(item => item.product.id === payload.productId)
    cart.cartItems[index].quantity = payload.quantity
    window.localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.log(error)
  }
})

export const removeFromCart = createAsyncThunk("removeFromCart", async (payload) => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.put("/api/cart", payload, {
      headers: {
        authorization: token
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const removeFromGuestCart = createAsyncThunk("removeFromGuestCart", async (payload) => {
  try {
    let cart = window.localStorage.getItem("cart");
    cart = JSON.parse(cart);
    const index = cart.cartItems.findIndex(item => item.product.id === payload.product.product.id)
    console.log(index);
    cart.cartItems.splice(index,1);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    return cart
  }catch (error){
    console.log(error)
  }
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGuestCart.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(addToCart.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(addToGuestCart.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(deleteGuestCart.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(removeFromGuestCart.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(updateGuestCartQuantity.fulfilled, (state, action) => {
       return action.payload
    })
  },
})

export default cartSlice.reducer
