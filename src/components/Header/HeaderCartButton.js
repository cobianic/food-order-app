import './HeaderCartButton.css';
import CartIcon from "./CartIcon";
import MealsContext from "../store/meals-context";
import React, {useContext} from "react";

const HeaderCartButton = () => {
  const mealsData = useContext(MealsContext);
  return (
    <button className='button'>
      <CartIcon className='icon' />
      <span>Your Cart</span>
      {/*<span className='badge'>{props.numberOfCartItems}</span>*/}
      <span className='badge'>{mealsData.amount}</span>
    </button>
  );
}

export default HeaderCartButton;
