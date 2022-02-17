import React, { useEffect, useState } from 'react';
import './ModalEdit.scss';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getViewProduct, hasModalEdit } from '../../store/selectors';
import { editProduct, closeModalEdit } from '../../store/actions';

export const ModalEdit: React.FC = () => {
  const isOpen = useSelector(hasModalEdit);
  const selectedProduct = useSelector(getViewProduct);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const [productName, setName] = useState('');
  const [count, setCount] = useState<number>(0);
  const [sideWidth, setSideWidth] = useState<number>(0);
  const [sideHeight, setSideHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handlerCloseModal = () => {
    dispatch(closeModalEdit());
  };

  const getInfo = () => {
    if (selectedProduct) {
      setImageUrl(selectedProduct.imageUrl);
      setName(selectedProduct.name);
      setCount(selectedProduct.count);
      setSideWidth(selectedProduct.size.width);
      setSideHeight(selectedProduct.size.height);
      setWeight(+selectedProduct.weight.replaceAll(/[^0-9]/gi, ''));
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handlerInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'imageUrl':
        setImageUrl(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'count':
        setCount(+value.replaceAll(/[^0-9]/gi, ''));

        break;
      case 'sideWidth':
        setSideWidth(+value.replaceAll(/[^0-9]/gi, ''));

        break;
      case 'sideHeight':
        setSideHeight(+value.replaceAll(/[^0-9]/gi, ''));

        break;
      case 'weight':
        setWeight(+value.replaceAll(/[^0-9]/gi, ''));

        break;
      default:
    }
  };

  const hasValid = (product: Product) => {
    if (product.count <= 0) {
      setErrorMessage('Enter correct count');

      return false;
    }

    if (product.size.height <= 0) {
      setErrorMessage('Enter correct height');

      return false;
    }

    if (product.size.width <= 0) {
      setErrorMessage('Enter correct width');

      return false;
    }

    return true;
  };

  const saveNewProduct = () => {
    if (!selectedProduct) {
      return;
    }

    const newProduct: Product = {
      id: selectedProduct.id,
      imageUrl,
      name: productName,
      count: count || 0,
      size: {
        width: sideWidth || 0,
        height: sideHeight || 0,
      },
      weight: `${weight || 0}g`,
      comments: [],
    };

    if (hasValid(newProduct)) {
      dispatch(editProduct(newProduct));
      dispatch(closeModalEdit());
    }
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    saveNewProduct();
  };

  Modal.setAppElement('#root');

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={handlerCloseModal}
        className="Modal__edit"
      >
        <h2>Edit product</h2>

        <form
          onSubmit={handlerSubmit}
          className="Modal__edit__form"
        >
          <label
            htmlFor="name"
            className="Modal__edit__input"
          >
            <span>
              Product name
              &nbsp;
            </span>
            <input
              type="text"
              id="name"
              required
              placeholder="Product name"
              value={productName}
              name="name"
              onChange={handlerInputs}
            />
          </label>
          <label
            htmlFor="imageUrl"
            className="Modal__edit__input"
          >
            <span>
              ImageUrl
              &nbsp;
            </span>
            <input
              type="text"
              id="imageUrl"
              required
              placeholder="ImageUrl"
              value={imageUrl}
              name="imageUrl"
              onChange={handlerInputs}
            />
          </label>
          <label
            htmlFor="count"
            className="Modal__edit__input"
          >
            <span>
              Count
              &nbsp;
            </span>
            <input
              type="text"
              id="count"
              required
              placeholder="Count"
              value={count}
              name="count"
              onChange={handlerInputs}
            />
          </label>
          <label
            htmlFor="sideWidth"
            className="Modal__edit__input"
          >
            <span>
              Width
              &nbsp;
            </span>
            <input
              type="text"
              id="sideWidth"
              required
              placeholder="Width"
              value={sideWidth}
              name="sideWidth"
              onChange={handlerInputs}
            />
          </label>
          <label
            htmlFor="sideHeight"
            className="Modal__edit__input"
          >
            <span>
              Height
              &nbsp;
            </span>
            <input
              type="text"
              id="sideHeight"
              required
              placeholder="Height"
              value={sideHeight}
              name="sideHeight"
              onChange={handlerInputs}
            />
          </label>
          <label
            htmlFor="weight"
            className="Modal__edit__input"
          >
            <span>
              Weight (g)
              &nbsp;
            </span>
            <input
              type="text"
              id="weight"
              required
              placeholder="Weight"
              value={weight}
              name="weight"
              onChange={handlerInputs}
            />
          </label>
          {
            errorMessage
            && (
              <span className="Modal__error">
                {errorMessage}
              </span>
            )
          }
          <button
            type="submit"
          >
            Save
          </button>

          <button
            type="button"
            onClick={handlerCloseModal}
          >
            close
          </button>
        </form>
      </Modal>
    </div>
  );
};
