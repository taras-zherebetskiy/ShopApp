import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductsList.scss';

import productsServer from '../../api/products.json';
import {
  addProductList,
  openModalAdd,
  openModalRemove,
  setIdForViewProduct,
  setLastId,
  setProductId,
} from '../../store/actions';
import { getProducts } from '../../store/selectors';
import { ModalAdd } from '../ModalAdd';
import { ModalRemove } from '../ModalRemove';
import { Loader } from '../Loader';

export const ProductsList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const [sortBy, setSortBy] = useState('Sort_by');
  const [viewProduct, setViewProduct] = useState<Product[]>([]);

  const sortProducts = (sort: string) => {
    switch (sort) {
      case 'SortCount':
        setViewProduct([...products.sort((a, b) => (a.count - b.count))]);
        break;
      case 'SortWeight':
        setViewProduct([...products.sort((a, b) => (+a.weight.replaceAll(/[^0-9]/gi, '') - +b.weight.replaceAll(/[^0-9]/gi, '')))]);
        break;
      default:
        setViewProduct([...products.sort((a, b) => {
          return a.name.localeCompare(b.name);
        })]);
    }
  };

  const updateLastId = () => {
    let maxId = 0;

    products.forEach((product) => {
      if (product.id > maxId) {
        maxId = product.id;
      }
    });

    sortProducts('default');
    setSortBy('default');
    dispatch(setLastId(maxId));
  };

  useEffect(() => {
    updateLastId();
  }, [products]);

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

  const handlerSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    setSortBy(value);
    sortProducts(value);
  };

  if (viewProduct.length === 0) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <label htmlFor="sort">
        Sort by
        &nbsp;
        <select
          name="sort"
          id="sort"
          value={sortBy}
          onChange={handlerSort}
        >
          <option value="Sort_by">Alphabet</option>
          <option value="SortCount">Count</option>
          <option value="SortWeight">Weight</option>
        </select>
      </label>

      <ul className="ProductsList__list">
        {
          viewProduct.map((product) => (
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
