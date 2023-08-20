import './MealItemForm.sass'
import MealsContext from "../store/meals-context";
import {useContext, useState} from "react";

/**
 * Represents the form for selecting the amount of a meal and adding it to the cart.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The ID of the meal.
 * @returns {JSX.Element} - The JSX element representing the meal item form.
 */
const MealItemForm = (props) => {
  const {amount, meals, addChosenMeal, updateAmount} = useContext(MealsContext);
  const [inputAmount, setInputAmount] = useState(1);

  // Save the chosen meal to the cart and update the total amount
  const saveChosenMeals = (event) => {
    event.preventDefault();
    const foundMeal = meals.find((meal) => meal.id === props.id);

    if (foundMeal) {
      const chosenMealData = {
        name: foundMeal.name,
        price: foundMeal.price,
        amount: inputAmount,
      };

      addChosenMeal(chosenMealData);
      updateAmount(amount + inputAmount);
    } else {
      console.log("Error");
    }
  };

  // Handle input change for the meal amount
  const inputChangeHandler = (event) => {
    setInputAmount(+event.target.value);
  };

  return (
    <form className="form">
      <div>
        <label className="form-label">Amount</label>
        <input
          className="form-input"
          type="number"
          min="1"
          step="1"
          value={inputAmount}
          onChange={inputChangeHandler}
        />
      </div>
      <button className="form-button" onClick={saveChosenMeals}>+ Add</button>
    </form>
  );
}

export default MealItemForm;
