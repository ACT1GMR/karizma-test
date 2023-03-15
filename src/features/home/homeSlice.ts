import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {fetchProducts, fetchUsers} from './homeAPI';
import {Product, User} from "../../app/types";

export type SelectedItem = {
    id: number,
    text: string
}

export interface HomeState {
    users: Array<User>;
    products: Array<Product>
    productsLoading: 'idle' | 'loading' | 'failed';
    usersLoading: 'idle' | 'loading' | 'failed';
    selectedItems: SelectedItem[];

}

const initialState: HomeState = {
    users: [],
    products: [],
    selectedItems: [],
    productsLoading: 'idle',
    usersLoading: 'idle'
};

export const fetchUsersThunk = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        return await fetchUsers();
    }
);
export const fetchProductsThunk = createAsyncThunk(
    'products/fetchUsers',
    async () => {
        return await fetchProducts();
    }
);

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        addItem(state, {payload: {id, text}}) {
            state.selectedItems.push({id, text});
        },
        removeItem(state, {payload}) {
            state.selectedItems.splice(state.selectedItems.findIndex(e => e.id === payload), 1);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersThunk.pending, (state) => {
                state.usersLoading = 'loading';
            })
            .addCase(fetchUsersThunk.fulfilled, (state, action) => {
                state.usersLoading = 'idle';
                state.users = action.payload;
            })
            .addCase(fetchUsersThunk.rejected, (state) => {
                state.usersLoading = 'failed';
            })
            .addCase(fetchProductsThunk.pending, (state) => {
                state.productsLoading = 'loading';
            })
            .addCase(fetchProductsThunk.fulfilled, (state, action) => {
                state.productsLoading = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchProductsThunk.rejected, (state) => {
                state.usersLoading = 'failed';
            })

    },
});

export const selectHome = (state: RootState) => state.home;
export const {addItem, removeItem} = homeSlice.actions;
export default homeSlice.reducer;