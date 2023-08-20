import React from "react";
import './CartItem.sass'

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const handleAdd = () => {
    props.onEdit({
      name: props.name,
      price: props.price,
      amount: props.amount + 1,
    }, 'add');
  };

  const handleRemove = () => {
    props.onEdit({
      name: props.name,
      price: props.price,
      amount: props.amount - 1,
    }, 'remove');
  };

  return (
    <li className={"cart-item"}>
      <div>
        <h2>{props.name}</h2>
        <div className={"summary"}>
          <span className={"price"}>{price}</span>
          <span className={"amount"}>x {props.amount}</span>
        </div>
      </div>
      <div className={"actions"}>
        <button onClick={handleRemove}>−</button>
        <button onClick={handleAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
