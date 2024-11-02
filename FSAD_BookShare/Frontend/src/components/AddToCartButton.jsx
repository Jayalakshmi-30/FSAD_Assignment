import React from 'react';

const AddToCartButton = ({ onClick }) => {
  return (
    <button className="btn btn-add-to-cart" onClick={onClick}>
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
