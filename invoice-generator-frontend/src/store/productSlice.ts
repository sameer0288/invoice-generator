import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { RootState } from './index';

interface Product {
  _id: string;
  name: string;
  qty: number;
  rate: number;
}

interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // const state = getState() as RootState;
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('https://invoice-generator-eta-two.vercel.app/api/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
});

export const addProduct = createAsyncThunk('products/addProduct', async (product: Product) => {
  // const state = getState() as RootState;
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post('https://invoice-generator-eta-two.vercel.app/api/products', product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add product');
  }
});

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, product }: { id: string; product: Product }) => {
    // const state = getState() as RootState;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`https://invoice-generator-eta-two.vercel.app/api/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string) => {
  // const state = getState() as RootState;
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`https://invoice-generator-eta-two.vercel.app/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch (error) {
    throw new Error('Failed to delete product');
  }
});

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
