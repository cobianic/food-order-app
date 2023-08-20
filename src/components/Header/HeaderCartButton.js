import './HeaderCartButton.css';
import CartIcon from "./CartIcon";
import Cart from "../Cart/Cart";
import MealsContext from "../store/meals-context";
import React, {useContext, useState} from "react";

/**
 * Represents the cart button in the header, displaying the cart icon and item count.
 *
 * @returns {JSX.Element} - The JSX element representing the cart button.
 */
const HeaderCartButton = () => {
  const {amount, chosenMeals} = useContext(MealsContext);
  const [showCart, setShowCart] = useState(false); // State to manage cart visibility

  // Toggle the visibility of the cart
  const toggleCartHandler = () => {
    if (amount > 0) {
      setShowCart(prevState => !prevState); // Toggle the cart visibility state
    } else {
      setShowCart(false);
    }
  };

  // Close the cart
  const closeCartHandler = () => {
    setShowCart(false);
  };

  return (
    <React.Fragment>
      <button className='button' onClick={toggleCartHandler}>
        <CartIcon className='icon'/>
        <span>Your Cart</span>
        <span className='badge'>{amount}</span>
      </button>
      {/* Render the Cart component if there are chosen meals and showCart is true */}
      {chosenMeals.length > 0 && showCart && <Cart onClose={closeCartHandler}/>}
    </React.Fragment>
  );
}

export default HeaderCartButton;
