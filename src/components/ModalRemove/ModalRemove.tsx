import React from 'react';
import './ModalRemove.scss';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getIdRemoteProduct, hasModalRemove } from '../../store/selectors';
import { closeModalRemove, removeProduct } from '../../store/actions';

export const ModalRemove: React.FC = () => {
  Modal.setAppElement('#root');
  const isOpen = useSelector(hasModalRemove);
  const productId = useSelector(getIdRemoteProduct);
  const dispatch = useDispatch();

  const handlerDelete = async () => {
    await dispatch(removeProduct(productId));
    dispatch(closeModalRemove());
  };

  const handlerCloseModal = () => {
    dispatch(closeModalRemove());
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={handlerCloseModal}
        className="Modal__add"
      >
        <h2>Delete product?</h2>

        <button
          type="button"
          onClick={handlerDelete}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={handlerCloseModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};
