import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModalEdit, setIdForViewProduct, setViewProductEdit } from '../../store/actions';

import {
  getIdForViewProduct,
  getProducts,
  getViewProduct,
  hasModalEdit,
} from '../../store/selectors';
import { CommentsList } from '../CommentsList';
import { ModalEdit } from '../ModalEdit';
import './ViewProduct.scss';

export const ViewProduct: React.FC = () => {
  const dispatch = useDispatch();
  const productId = useSelector(getIdForViewProduct);
  const allProduct = useSelector(getProducts);
  const viewProduct = useSelector(getViewProduct);
  const isModalEdit = useSelector(hasModalEdit);

  useEffect(() => {
    if (productId !== 0) {
      const product = allProduct.find((item) => (item.id === productId)) || null;

      if (product) {
        dispatch(setViewProductEdit(product));
      } else {
        dispatch(setViewProductEdit(null));
      }
    }
  }, [productId, isModalEdit]);

  const handlerClose = () => {
    dispatch(setIdForViewProduct(0));
  };

  const handlerEdit = () => {
    dispatch(openModalEdit());
  };

  if (!viewProduct || productId === 0) {
    return (
      <div className="ViewProduct">
        <span>Select product</span>
      </div>
    );
  }

  return (
    <div className="ViewProduct">
      <img
        className="ViewProduct__img"
        src={viewProduct.imageUrl}
        alt={viewProduct.name}
      />
      <h2 className="ViewProduct__title">
        {viewProduct.name}
      </h2>
      <span>
        Count:
        &nbsp;
        {viewProduct.count}
      </span>
      <span>
        Size:
        &nbsp;
        {viewProduct.size.width}
        х
        {viewProduct.size.height}
      </span>
      <span>
        Weight:
        &nbsp;
        {viewProduct.weight}
      </span>
      <ul>
        <CommentsList />
      </ul>
      <button
        type="button"
        onClick={handlerClose}
      >
        Close
      </button>
      <button
        type="button"
        onClick={handlerEdit}
      >
        Edit
      </button>
      <ModalEdit />
    </div>
  );
};
