import React from 'react';
import './App.scss';
import { ProductsList } from './components/ProductsList';
import { ViewProduct } from './components/ViewProduct';

export const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="App__title">Shop</h1>
      <ProductsList />
      <ViewProduct />
    </div>
  );
};
