import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { products } from '../data';
import { revenueTrendData } from '../data';

interface Product {
    id: number | string;
    name: string;
    category: string;
    price: number;
    stock: number;
    revenue: number;
    added: string;
    sales: number[];
}

interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
}

const initialState: ProductState = {
    products,
    selectedProduct: products[0],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        selectProduct(state, action: PayloadAction<string | number>) {
            const product = state.products.find(p => p.id === action.payload);
            if (product) state.selectedProduct = product;
        },
        deleteProduct(state, action: PayloadAction<string | number>) {
            state.products = state.products.filter(
                p => p.id !== action.payload
            );
            if (state.selectedProduct?.id === action.payload) {
                state.selectedProduct = state.products[0] || null;
            }
        },

        // ✅ reducer to auto-generate sales array
        addProduct(state, action: PayloadAction<Omit<Product, 'sales'>>) {
            const newProduct = {
                ...action.payload,
                sales: revenueTrendData.map(() =>
                    Math.floor(Math.random() * 400)
                ),
            };
            state.products.push(newProduct);
            state.selectedProduct = newProduct;
        },
    },
});

export const { selectProduct, deleteProduct, addProduct } =
    productSlice.actions;
export default productSlice.reducer;
