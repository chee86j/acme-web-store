import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import {
  addToCart as addToCartRequest,
  fetchUserCart as fetchUserCartRequest,
  removeFromCart as removeFromCartRequest,
  updateCartQuantity as updateCartQuantityRequest,
} from "../services/cartService"

const initialState = {
  cartItems: [],
  loading: false,
  error: null
}

const getGuestCartFromStorage = () => {
  let cart = window.localStorage.getItem("cart");
  if (!cart) {
    const newCart = { id: uuidv4(), userId: null, cartItems: [] };
    window.localStorage.setItem("cart", JSON.stringify(newCart));
    cart = JSON.stringify(newCart);
  }
  return JSON.parse(cart);
}

const saveGuestCartToStorage = (cart) => {
  window.localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

export const fetchUserCart = createAsyncThunk("fetchUserCart", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchUserCartRequest();
    return response;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to fetch user cart');
  }
});

export const fetchGuestCart = createAsyncThunk("fetchGuestCart", async () => {
  return getGuestCartFromStorage();
});

export const deleteGuestCart = createAsyncThunk("deleteGuestCart", async () => {
  const newCart = { id: uuidv4(), userId: null, cartItems: [] };
  return saveGuestCartToStorage(newCart);
});

export const addToCart = createAsyncThunk("addToCart", async (payload, { rejectWithValue }) => {
  try {
    const response = await addToCartRequest(payload);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to add item to cart');
  }
});

export const updateCartQuantity = createAsyncThunk("updateCartQuantity", async (payload, { rejectWithValue }) => {
  try {
    const response = await updateCartQuantityRequest(payload);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to update cart quantity');
  }
});

export const addToGuestCart = createAsyncThunk("addToGuestCart", async (payload) => {
  const cart = getGuestCartFromStorage();
  const index = cart.cartItems.findIndex(item => item.product.id === payload.product.id);
  
  if (index >= 0) {
    cart.cartItems[index].quantity += payload.quantity;
  } else {
    cart.cartItems.push({
      product: payload.product,
      quantity: payload.quantity
    });
  }
  
  return saveGuestCartToStorage(cart);
});

export const updateGuestCartQuantity = createAsyncThunk("updateGuestCartQuantity", async (payload, { rejectWithValue }) => {
  try {
    const cart = getGuestCartFromStorage();
    const index = cart.cartItems.findIndex(item => item.product.id === payload.productId);
    
    if (index === -1) {
      return rejectWithValue('Item not found in cart');
    }
    
    cart.cartItems[index].quantity = payload.quantity;
    return saveGuestCartToStorage(cart);
  } catch (error) {
    return rejectWithValue('Failed to update cart quantity');
  }
});

export const removeFromCart = createAsyncThunk("removeFromCart", async (payload, { rejectWithValue }) => {
  try {
    const response = await removeFromCartRequest(payload);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to remove item from cart');
  }
});

export const removeFromGuestCart = createAsyncThunk("removeFromGuestCart", async (payload, { rejectWithValue }) => {
  try {
    const cart = getGuestCartFromStorage();
    const index = cart.cartItems.findIndex(item => item.product.id === payload.product.product.id);
    
    if (index === -1) {
      return rejectWithValue('Item not found in cart');
    }
    
    cart.cartItems.splice(index, 1);
    return saveGuestCartToStorage(cart);
  } catch (error) {
    return rejectWithValue('Failed to remove item from cart');
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Handle pending states
    [fetchUserCart, addToCart, updateCartQuantity, removeFromCart].forEach(thunk => {
      builder.addCase(thunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    });
    
    // Handle rejected states
    [fetchUserCart, addToCart, updateCartQuantity, removeFromCart, 
     updateGuestCartQuantity, removeFromGuestCart].forEach(thunk => {
      builder.addCase(thunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
    });
    
    // Handle fulfilled states - all have the same behavior
    [fetchGuestCart, fetchUserCart, addToCart, removeFromCart, addToGuestCart, 
     deleteGuestCart, removeFromGuestCart, updateCartQuantity, updateGuestCartQuantity].forEach(thunk => {
      builder.addCase(thunk.fulfilled, (state, action) => {
        // Mutate the draft state directly instead of returning a new object
        Object.assign(state, action.payload);
        state.loading = false;
        state.error = null;
      });
    });
  },
});

export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;
