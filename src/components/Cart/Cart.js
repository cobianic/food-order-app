import './Cart.sass'
import CartItem from "./CartItem";
import Card from "../UI/Card";
import {useContext} from "react";
import MealsContext from "../store/meals-context";

const Cart = (props) => {
  const {chosenMeals, editCartMeals} = useContext(MealsContext);

  const totalAmount = chosenMeals.reduce((total, meal) => {
    return (total + meal.price * meal.amount);
  }, 0).toFixed(2);

  const backdropClickHandler = () => {
    props.onClose();
  };

  const orderHandler = () => {
    alert('Successfully ordered!'); // Show an alert when the "Order" button is pressed
    props.onClose();
  };

  return (
    <div className="backdrop" onClick={backdropClickHandler}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        <Card className={"cart"}>
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
            ${totalAmount}</div>
          <div className={"actions"}>
            <button onClick={backdropClickHandler}>Close</button>
            <button className={"actions button"} onClick={orderHandler}>Order</button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Cart;
