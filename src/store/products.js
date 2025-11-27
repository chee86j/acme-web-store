import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  addWishlistItem,
  createProduct as createProductRequest,
  deleteProduct as deleteProductRequest,
  fetchProducts as fetchProductsRequest,
  fetchProductsByCategory as fetchProductsByCategoryRequest,
  fetchWishlist as fetchWishlistRequest,
  removeWishlistItem,
  updateProduct as updateProductRequest,
} from "../services/productsService"

const initialState = {
  products: Array(0),
  selectedProduct: {},
  selectedCategory: "",
  wishlist: Array(0),
};

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  try {
    return await fetchProductsRequest();
  } catch (err) {
    console.log(err);
  }
});

export const fetchProductsByCategory = createAsyncThunk(
  "fetchProductsByCategory",
  async (category) => {
    try {
      return await fetchProductsByCategoryRequest(category);
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (product) => {
    try {
      return await updateProductRequest(product);
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (productId) => {
    try {
      return await deleteProductRequest(productId);
    } catch (err) {
      console.log(err);
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProduct",
  async (product) => {
    try {
      return await createProductRequest(product);
    } catch (err) {
      console.log(err);
    }
  }
);

export const getWishlist = createAsyncThunk("getWishlist", async (id) => {
  try {
    return await fetchWishlistRequest(id);
  } catch (err) {
    console.log(err);
  }
});

export const addWishlist = createAsyncThunk("addWishlist", async (data) => {
  try {
    return await addWishlistItem(data);
  } catch (err) {
    console.log(err);
  }
});

export const removeWishlist = createAsyncThunk("removeWishlist", async (id) => {
  try {
    return await removeWishlistItem(id);
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
      state.wishlist = action.payload;
    }),
      builder.addCase(addWishlist.fulfilled, (state, action) => {
        state.wishlist.push(action.payload);
      }),
      builder.addCase(removeWishlist.fulfilled, (state, action) => {
        console.log(action.payload)
        state.wishlist = state.wishlist.filter(
          (item) => item.productId !== action.payload.productId
        );
      }),
      builder.addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      }),
      builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
      }),
      builder.addCase(updateProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      }),
      builder.addCase(deleteProduct.fulfilled, (state, action) => {
        state.selectedProduct = {};
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      });
  },
});

export const { setSelectedCategory, setSelectedProduct } = productsSlice.actions
export default productsSlice.reducer
