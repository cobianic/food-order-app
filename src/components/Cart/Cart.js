import './Cart.sass'
import CartItem from "./CartItem";
import Card from "../UI/Card";
import CartForm from "./CartForm";
import {useContext} from "react";
import MealsContext from "../store/meals-context";
import useInput from "../../hooks/use-input";

const validateName = (name) => name.trim() !== '';
/**
 * Represents the shopping cart component that displays the selected meals and allows ordering.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onClose - Function to close the cart.
 * @returns {JSX.Element} - The JSX element representing the shopping cart.
 */
const Cart = (props) => {
  const {chosenMeals, editCartMeals} = useContext(MealsContext);

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput
  } = useInput(validateName);

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput
  } = useInput(validateName);

  // Calculate the total amount of selected meals
  const totalAmount = chosenMeals.reduce((total, meal) => {
    return (total + meal.price * meal.amount);
  }, 0).toFixed(2);

  // Handle clicking on the backdrop to close the cart
  const backdropClickHandler = () => {
    props.onClose();
  };

  // Handle ordering the selected meals
  const orderHandler = () => {
    alert('Successfully ordered!'); // Show an alert when the "Order" button is pressed
    props.onClose();
  };

  return (
    <div className="backdrop" onClick={backdropClickHandler}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        <Card className={"cart"}>
          {/* Map through chosenMeals to display individual cart items */}
          {chosenMeals.map((meal) => (
            <CartItem
              key={meal.name}
              name={meal.name}
              amount={meal.amount}
              price={meal.price}
              onEdit={editCartMeals}
            />
          ))}
          <div className={"total"}>
            <p>Total Amount</p>
            ${totalAmount}
          </div>
          <CartForm
            firstNameChangeHandler={firstNameChangeHandler}
            firstNameBlurHandler={firstNameBlurHandler}
            lastNameChangeHandler={lastNameChangeHandler}
            lastNameBlurHandler={lastNameBlurHandler}
            enteredFirstName={enteredFirstName}
            enteredLastName={enteredLastName}
            enteredFirstNameIsValid={enteredFirstNameIsValid}
            enteredLastNameIsValid={enteredLastNameIsValid}
            resetFirstNameInput={resetFirstNameInput}
            resetLastNameInput={resetLastNameInput}/>
          <div className={"actions"}>
            <button onClick={backdropClickHandler}>Close</button>
            <button
              className={"actions button"}
              onClick={orderHandler}
              disabled={!enteredFirstNameIsValid || !enteredLastNameIsValid}>Order</button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Cart;
