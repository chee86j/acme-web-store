import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  products: Array(0),
  selectedProduct: {},
  selectedCategory: "",
  wishlist: Array(0),
};

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  try {
    const response = await axios.get(`/api/products`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const fetchProductsByCategory = createAsyncThunk(
  "fetchProductsByCategory",
  async (category) => {
    try {
      const response = await axios.get(`/api/products?category=${category}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (product) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put(`/api/products/${product.id}`, product, {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (productId) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.delete(`/api/products/${productId}`, {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProduct",
  async (product) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post(`/api/products`, product, {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getWishlist = createAsyncThunk("getWishlist", async (id) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await axios.get(`/api/wishlist/${id}`, {
      headers: {
        authorization: token,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const addWishlist = createAsyncThunk("addWishlist", async (data) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await axios.post(`/api/wishlist`, data, {
      headers: {
        authorization: token,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const removeWishlist = createAsyncThunk("removeWishlist", async (id) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await axios.delete(`/api/wishlist/${id}`, {
      headers: {
        authorization: token,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // for setting the selected category
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      return { ...state, wishlist: action.payload };
    }),
      builder.addCase(addWishlist.fulfilled, (state, action) => {
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      }),
      builder.addCase(removeWishlist.fulfilled, (state, action) => {
        console.log(action.payload)
        return {
          ...state,
          wishlist: state.wishlist.filter(
            (item) => item.productId !== action.payload.productId
          ),
        };
      }),
      builder.addCase(createProduct.fulfilled, (state, action) => {
        return {
          ...state,
          products: [action.payload, ...state.products],
        };
      }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload,
        };
      }),
      builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload,
        };
      }),
      builder.addCase(updateProduct.fulfilled, (state, action) => {
        return {
          ...state,
          selectedProduct: action.payload,
          products: state.products.map((product) => {
            if (product.id === action.payload.id) {
              return action.payload;
            } else {
              return product;
            }
          }),
        };
      }),
      builder.addCase(deleteProduct.fulfilled, (state, action) => {
        return {
          ...state,
          selectedProduct: {},
          products: state.products.filter(
            (product) => product.id !== action.payload.id
          ),
        };
      });
  },
});

export const { setSelectedCategory, setSelectedProduct } = productsSlice.actions
export default productsSlice.reducer
