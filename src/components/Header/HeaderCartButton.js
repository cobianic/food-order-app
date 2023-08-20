import './HeaderCartButton.css';
import CartIcon from "./CartIcon";
import Cart from "../Cart/Cart";
import MealsContext from "../store/meals-context";
import React, {useContext, useState} from "react";

const HeaderCartButton = () => {
  const {amount, chosenMeals} = useContext(MealsContext);
  const [showCart, setShowCart] = useState(false); // New state to manage cart visibility

  const toggleCartHandler = () => {
    if (amount > 0) {
      setShowCart(prevState => !prevState); // Toggle the cart visibility state
    } else {
      setShowCart(false)
    }
  };

  const closeCartHandler = () => {
    setShowCart(false); // Close the cart
  };

  return (
    <React.Fragment>
      <button className='button' onClick={toggleCartHandler}>
        <CartIcon className='icon'/>
        <span>Your Cart</span>
        <span className='badge'>{amount}</span>

      </button>
      {chosenMeals.length > 0 && showCart && <Cart onClose={closeCartHandler}/>} {/* Pass onClose prop to Cart */}
    </React.Fragment>
  );
}

export default HeaderCartButton;
