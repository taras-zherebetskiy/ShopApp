export const OPEN_MODAL_ADD = 'OPEN_MODAL_ADD';
export const CLOSE_MODAL_ADD = 'CLOSE_MODAL_ADD';
export const OPEN_MODAL_REMOVE = 'OPEN_MODAL_REMOVE';
export const CLOSE_MODAL_REMOVE = 'CLOSE_MODAL_REMOVE';
export const OPEN_MODAL_EDIT = 'OPEN_MODAL_EDIT';
export const CLOSE_MODAL_EDIT = 'CLOSE_MODAL_EDIT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_LIST = 'ADD_PRODUCT_LIST';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const SET_ID_REMOTE_PRODUCT = 'SET_ID_REMOTE_PRODUCT';
export const SET_ID_VIEW_PRODUCT = 'SET_ID_VIEW_PRODUCT';
export const SET_VIEW_PRODUCT = 'SET_VIEW_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';

export const setViewProductEdit = (payload: Product | null) => {
  return ({
    type: SET_VIEW_PRODUCT,
    payload,
  });
};

export const editProduct = (payload: Product) => {
  return ({
    type: EDIT_PRODUCT,
    payload,
  });
};

export const closeModalEdit = () => ({
  type: CLOSE_MODAL_EDIT,
  payload: false,
});

export const openModalEdit = () => ({
  type: OPEN_MODAL_EDIT,
  payload: true,
});

export const closeModalAdd = () => ({
  type: CLOSE_MODAL_ADD,
  payload: false,
});

export const openModalAdd = () => ({
  type: OPEN_MODAL_ADD,
  payload: true,
});

export const closeModalRemove = () => ({
  type: CLOSE_MODAL_REMOVE,
  payload: false,
});

export const openModalRemove = () => ({
  type: OPEN_MODAL_REMOVE,
  payload: true,
});

export const addOneProduct = (payload: Product) => ({
  type: ADD_PRODUCT,
  payload,
});

export const addProductList = (payload: Product[]) => ({
  type: ADD_PRODUCT_LIST,
  payload,
});

export const removeProduct = (payload: number) => ({
  type: REMOVE_PRODUCT,
  payload,
});

export const setProductId = (payload: number) => ({
  type: SET_ID_REMOTE_PRODUCT,
  payload,
});

export const setIdForViewProduct = (payload: number) => ({
  type: SET_ID_VIEW_PRODUCT,
  payload,
});
