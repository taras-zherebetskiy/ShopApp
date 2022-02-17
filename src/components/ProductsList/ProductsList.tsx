import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductsList.scss';

import productsServer from '../../api/products.json';
import {
  addProductList,
  openModalAdd,
  openModalRemove,
  setIdForViewProduct,
  setProductId,
} from '../../store/actions';
import { getProducts } from '../../store/selectors';
import { ModalAdd } from '../ModalAdd';
import { ModalRemove } from '../ModalRemove';
import { Loader } from '../Loader';

export const ProductsList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);

  useEffect(() => {
    dispatch(addProductList(productsServer));
  }, []);

  const openModal = () => {
    dispatch(openModalAdd());
  };

  const handlerDeleteProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(openModalRemove());
    dispatch(setProductId(+event.currentTarget.value));
  };

  const handlerDetailsProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIdForViewProduct(+event.currentTarget.value));
  };

  if (products.length === 0) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <ul className="ProductsList__list">
        {
          products.map((product) => (
            <li
              key={product.id}
              className="ProductsList__item"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="ProductsList__img"
              />
              <h3>
                {product.name}
              </h3>
              <span>
                Count:
                &nbsp;
                {product.count}
              </span>
              <span>
                Size:
                &nbsp;
                {product.size.width}
                х
                {product.size.height}
              </span>
              <span>
                Weight:
                &nbsp;
                {product.weight}
              </span>
              <button
                type="button"
                value={product.id}
                onClick={handlerDetailsProduct}
              >
                Details
              </button>
              <button
                type="button"
                value={product.id}
                onClick={handlerDeleteProduct}
              >
                Delete
              </button>
            </li>
          ))
        }
        <li className="ProductsList__item">
          <button
            type="button"
            className="ProductsList__add-plus"
            onClick={openModal}
          >
            +
          </button>
        </li>
      </ul>
      <ModalRemove />
      <ModalAdd />
    </>
  );
};
