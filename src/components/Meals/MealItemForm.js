import './MealItemForm.css'
import MealsContext from "../store/meals-context";
import {useContext, useState} from "react";

const MealItemForm = (props) => {
  const {amount, meals, addChosenMeal, updateAmount} = useContext(MealsContext);
  const [inputAmount, setInputAmount] = useState(1);

  const saveChosenMeals = (event) => {
    event.preventDefault();
    const foundMeal = meals.find((meal) => meal.id === props.id)

    if (foundMeal) {
      const chosenMealData = {
        name: foundMeal.name,
        price: foundMeal.price,
        amount: inputAmount, // Add inputAmount to the chosen meal data
      };

      addChosenMeal(chosenMealData);
      updateAmount(amount + inputAmount); // Update the total amount
    } else {
      console.log("Error")
    }
  };

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
          onChange={inputChangeHandler} // Update inputAmount state on input change/>
        />
      </div>
      <button className="form-button" onClick={saveChosenMeals}>+ Add</button>
    </form>
  );
}

export default MealItemForm;
