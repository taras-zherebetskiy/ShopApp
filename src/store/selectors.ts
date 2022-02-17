import { RootState } from '.';

export const hasModalAdd = (state: RootState) => state.isModalAdd;
export const hasModalRemove = (state: RootState) => state.isModalRemove;
export const hasModalEdit = (state: RootState) => state.isModalEdit;
export const getProducts = (state: RootState) => state.allProducts;
export const getIdRemoteProduct = (state: RootState) => state.idRemoteProduct;
export const getIdForViewProduct = (state: RootState) => state.idForViewProduct;
export const getViewProduct = (state: RootState) => state.viewProduct;
