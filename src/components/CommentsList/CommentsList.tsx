import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import commentsServer from '../../api/comments.json';
import { getIdForViewProduct } from '../../store/selectors';

export const CommentsList: React.FC = () => {
  const productId = useSelector(getIdForViewProduct);
  const [productComments, setProductComments] = useState<ProductCommets[]>([]);

  const getComments = (id: number) => {
    setProductComments(commentsServer.filter((comment) => comment.productId === id));
  };

  useEffect(() => {
    getComments(productId);
  }, [productId]);

  const deleteComment = (id: number) => {
    setProductComments((prevProductComments) => (
      prevProductComments.filter((comment) => (comment.id !== id))
    ));
  };

  const handlerDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    deleteComment(+value);
  };

  return (
    <>
      {
        productComments.map((comment) => (
          <li key={comment.id}>
            <span>
              {comment.description}
            </span>
            <button
              type="button"
              value={comment.id}
              onClick={handlerDelete}
            >
              X
            </button>
          </li>
        ))
      }
    </>
  );
};
