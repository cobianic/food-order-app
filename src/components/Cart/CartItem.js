import React from "react";
import './CartItem.sass'

/**
 * Represents an individual item in the shopping cart.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.name - The name of the item.
 * @param {number} props.price - The price of the item.
 * @param {number} props.amount - The quantity of the item.
 * @param {Function} props.onEdit - Function to edit the cart items.
 * @returns {JSX.Element} - The JSX element representing an item in the shopping cart.
 */
const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  // Handle adding an item to the cart
  const handleAdd = () => {
    props.onEdit({
      name: props.name,
      price: props.price,
      amount: props.amount + 1,
    }, 'add');
  };

  // Handle removing an item from the cart
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
        <button onClick={handleRemove}>−</button> {/* Button to decrease item quantity */}
        <button onClick={handleAdd}>+</button> {/* Button to increase item quantity */}
      </div>
    </li>
  );
};

export default CartItem;
