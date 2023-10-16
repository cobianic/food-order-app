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

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddressInput
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
  const orderHandler = async () => {
    const order = {
      meals: chosenMeals.map(meal => ({
        name: meal.name,
        amount: meal.amount,
        price: meal.price,
      })),
      firstName: enteredFirstName,
      enteredLastName: enteredLastName,
      address: enteredAddress,
      amount: totalAmount
    };

    try {
      const response =await fetch('https://react-fetch-movies-ad76e-default-rtdb.europe-west1.firebasedatabase.app/food-order-customer-data.json', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to send order to the database!');
      }

      const data = await response.json();
      console.log('Order sent successfully:', data);
      alert('Successfully ordered!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to order!');
    }

    console.log(order);
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
            addressChangeHandler={addressChangeHandler}
            addressBlurHandler={addressBlurHandler}
            enteredFirstName={enteredFirstName}
            enteredLastName={enteredLastName}
            enteredAddress={enteredAddress}
            enteredFirstNameIsValid={enteredFirstNameIsValid}
            enteredLastNameIsValid={enteredLastNameIsValid}
            enteredAddressIsValid={enteredAddressIsValid}
            resetFirstNameInput={resetFirstNameInput}
            resetLastNameInput={resetLastNameInput}
            resetAddressInput={resetAddressInput}

          />
          <div className={"actions"}>
            <button onClick={backdropClickHandler}>Close</button>
            <button
              className={"actions button"}
              onClick={orderHandler}
              disabled={!enteredFirstNameIsValid || !enteredLastNameIsValid || !enteredAddressIsValid}>Order</button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Cart;
