import { createStore, AnyAction } from 'redux';
import {
  ADD_PRODUCT,
  ADD_PRODUCT_LIST,
  CLOSE_MODAL_ADD,
  CLOSE_MODAL_EDIT,
  CLOSE_MODAL_REMOVE,
  EDIT_PRODUCT,
  OPEN_MODAL_ADD,
  OPEN_MODAL_EDIT,
  OPEN_MODAL_REMOVE,
  REMOVE_PRODUCT,
  SET_ID_REMOTE_PRODUCT,
  SET_ID_VIEW_PRODUCT,
  SET_VIEW_PRODUCT,
} from './actions';

export type RootState = {
  isModalAdd: boolean;
  isModalRemove: boolean;
  isModalEdit: boolean;
  idRemoteProduct: number;
  idForViewProduct: number;
  allProducts: Product[];
  viewProduct: Product | null;
};

export const initialState: RootState = {
  isModalAdd: false,
  isModalRemove: false,
  isModalEdit: false,
  idRemoteProduct: 0,
  idForViewProduct: 0,
  allProducts: [],
  viewProduct: null,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case EDIT_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }

          return product;
        }),
      };

    case SET_VIEW_PRODUCT:
      return { ...state, viewProduct: { ...action.payload } };

    case SET_ID_VIEW_PRODUCT:
      return { ...state, idForViewProduct: action.payload };

    case SET_ID_REMOTE_PRODUCT:
      return { ...state, idRemoteProduct: action.payload };

    case CLOSE_MODAL_ADD:
      return { ...state, isModalAdd: action.payload };

    case OPEN_MODAL_ADD:
      return { ...state, isModalAdd: action.payload };

    case CLOSE_MODAL_EDIT:
      return { ...state, isModalEdit: action.payload };

    case OPEN_MODAL_EDIT:
      return { ...state, isModalEdit: action.payload };

    case OPEN_MODAL_REMOVE:
      return { ...state, isModalRemove: action.payload };

    case CLOSE_MODAL_REMOVE:
      return { ...state, isModalRemove: action.payload };

    case ADD_PRODUCT:
      return { ...state, allProducts: [...state.allProducts, action.payload] };

    case ADD_PRODUCT_LIST:
      return { ...state, allProducts: [...state.allProducts, ...action.payload] };

    case REMOVE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter((product) => (product.id !== action.payload)),
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
);

export default store;
